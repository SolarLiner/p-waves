export class Event<T = any> {
  constructor(readonly type: string, readonly value: T) {}
}

type Dict<T> = { [x: string]: T };
type EventTarget<E extends Event<any>> = E extends Event<infer T> ? T : any;
type Only<D extends Dict<any>, T> = { [P in D]: P extends T ? P : never };

export type ListenerCallback<E extends Event = Event> = (e: E) => void;
export class EventEmitter<M extends string = string, EM extends Dict<any> = Dict<any>> {
  private listeners: Map<string, Array<ListenerCallback<EM[M]>>>;
  private _listenersAll?: ListenerCallback<EM[M]>[];

  constructor() {
    this.listeners = new Map();
  }

  public addEventListener<T extends M>(type: T, callback: ListenerCallback<EM[T]>) {
    if (!this.listeners.has(type)) this.listeners.set(type, [callback]);
    else this.listeners.get(type).push(callback);
  }

  public subscribeAll(callback: ListenerCallback<EM[M]>) {
    if (this._listenersAll === undefined) this._listenersAll = [callback];
    else this._listenersAll.push(callback);
  }

  public unsubscribeAll(callback: ListenerCallback<EM[M]>) {
    if (!this._listenersAll) return;
    const idx = this._listenersAll.indexOf(callback);
    if (idx !== -1) this._listenersAll.splice(idx, 1);
  }

  public removeEventListener<T extends M>(type: T, callback: ListenerCallback<EM[T]>) {
    if (!this.listeners.has(type)) return false;
    this.listeners.get(type).splice(this.listeners.get(type).indexOf(callback), 1);
    return true;
  }

  protected emit<T extends keyof EM>(event: EM[T]) {
    const type = event.type;
    if (this._listenersAll !== undefined) this._listenersAll.forEach(cb => cb(event));
    if (!this.listeners.has(type)) return false;
    this.listeners.get(type).forEach(cb => cb(event));
  }
}

export function observe<M extends string, EM extends Record<M, Event>>(emitter: EventEmitter<M, EM>) {
  function subscribe(handler: (ev: EM[M]) => void) {
    emitter.subscribeAll(handler);

    function unsubscribe() {
      emitter.unsubscribeAll(handler);
    }

    return { unsubscribe };
  }

  return { subscribe };
}
