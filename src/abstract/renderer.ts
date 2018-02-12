export interface IRenderer {
    animationFrameReference: number;
    render(ms: number): void;
}

export abstract class BaseRenderer implements IRenderer {
    public progress: number;
    animationFrameReference: number;

    constructor(private root: HTMLElement, private audioRef: HTMLAudioElement) { }

    abstract render(ms: number): void;
}