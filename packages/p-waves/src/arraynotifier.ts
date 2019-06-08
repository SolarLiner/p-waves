import { Event, EventEmitter } from "./event";
interface ArrayNotifierEventMap<T> {
  set: ArrayEvent<T>;
  remove: ArrayEvent<T>;
}
export class ArrayNotifier<T> extends EventEmitter<keyof ArrayNotifierEventMap<T>, ArrayNotifierEventMap<T>> {
  proxy: T[];
  constructor(array: T[]) {
    super();
    this.proxy = new Proxy(array, {
      deleteProperty: (target, property) => {
        console.log("Delete property", property);
        if (typeof property === "number") {
          this.emit(new ArrayEvent("remove", property, target[property]));
        }
        delete target[property];
        return true;
      },
      get: (target, property, receiver) => {
        console.log("Property get", property, receiver);
        return target[property];
      },
      set: (target, property, value, receiver) => {
        console.log("Property set", property);
        if (typeof property === "number") this.emit(new ArrayEvent("set", property, value));
        target[property] = value;
        return true;
      }
    });
  }
}
interface ArrayEventObject<T> {
  index: number;
  value: T;
}
class ArrayEvent<T> extends Event<ArrayEventObject<T>> {
  constructor(id: string, index: number, value: T) {
    super(id, { index, value });
  }
}
