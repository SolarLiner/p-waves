export interface IRenderer {
    animationFrameReference: number;
    render(ms: number): void;
}

export abstract class BaseProgress implements IRenderer {
    public progress: number;
    animationFrameReference: number;

    abstract render(ms: number): void;
}