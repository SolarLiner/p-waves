export interface IRenderer {
    animationFrameReference: number;
    progress: number;
    render(ms: number): void;
    dispose();
}

export abstract class BaseRenderer implements IRenderer {
    public progress: number;
    animationFrameReference: number;

    constructor(protected root: HTMLElement, protected audioRef: HTMLAudioElement) { }

    public setRoot(newRoot: HTMLElement) {
        newRoot.innerHTML = this.root.innerHTML;
        this.root = newRoot;
    }

    abstract render(ms: number): void;
    abstract dispose(): void;
}