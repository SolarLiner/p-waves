import { AudioPlayer } from "../audioplayer";

export interface IRenderer {
    animationFrameReference: number;
    progress: number;
    timechange(ev: Event): void;
    render(ms: number): void;
    dispose();
}

export abstract class BaseRenderer implements IRenderer {
    public progress: number;
    animationFrameReference: number;

    constructor(protected root: HTMLElement, protected playerRef: AudioPlayer) { }

    public getRoot() {
        return this.root;
    }

    abstract timechange(ev: Event): void;
    abstract setRoot(newRoot: HTMLElement): void;
    abstract render(ms: number): void;
    abstract dispose(): void;
}