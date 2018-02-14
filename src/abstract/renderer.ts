import { AudioPlayer } from "../audioplayer";

export interface IRenderer {
    animationFrameReference: number;
    progress: number;
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

    abstract setRoot(newRoot: HTMLElement);
    abstract render(ms: number): void;
    abstract dispose(): void;
}