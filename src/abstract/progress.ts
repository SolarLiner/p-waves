import { IRenderer } from "./renderer";

export abstract class BaseProgress implements IRenderer {
    animationFrameReference: number;
    
    render(ms: number): void {
        throw new Error("Method not implemented.");
    }
}