import { IRenderer } from "./renderer";

export abstract class BaseProgress implements IRenderer {
    public progress: number;
    animationFrameReference: number;

    abstract render(ms: number): void;
}