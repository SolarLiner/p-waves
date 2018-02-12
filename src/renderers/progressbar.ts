import { BaseRenderer } from "../abstract/renderer";

export class ProgressbarRenderer extends BaseRenderer {
    private progElement: HTMLProgressElement;
    constructor(root: HTMLElement, audioRef: HTMLAudioElement) {
        super(root, audioRef);
        console.log(root.dir);
        this.progElement = root.appendChild(document.createElement('progress'));
        this.progElement.max = 1000;
    }
    render(ms: number): void {
        this.progElement.value = this.progress * 1000;
    }

    dispose(): void {
        this.progElement.remove();
    }
}