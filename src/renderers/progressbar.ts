import { BaseRenderer } from "../abstract/renderer";

export class ProgressbarRenderer extends BaseRenderer {
    private progElement: HTMLProgressElement;
    constructor(root: HTMLElement, audioRef: HTMLAudioElement) {
        super(root, audioRef);
        this.progElement = root.appendChild(document.createElement('progress'));
        this.progElement.max = 1000;
        
        this.audioRef.ontimeupdate = ev => {
            this.progress = this.audioRef.currentTime / this.audioRef.duration;
        }
    }
    render(ms: number): void {
        if(Number.isFinite(this.progress))
            this.progElement.value = this.progress * 1000;
    }

    dispose(): void {
        this.progElement.remove();
    }
}