export interface IRenderer {
    animationFrameReference: number;
    render(ms: number): void;
}