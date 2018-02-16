import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";

export class ProgressbarRenderer extends BaseRenderer {
    private progElement: HTMLProgressElement;
    constructor(root: HTMLElement, playerRef: AudioPlayer) {
        super(root, playerRef);
        this.setRoot(root);
    }

    public setRoot(root: HTMLElement) {
        if(this.progElement) {
            root.appendChild(this.progElement);
            return;
        }

        this.progElement = root.appendChild(document.createElement('progress'));
        this.progElement.max = 1000;
    }

    timechange(ev: Event) {
        let player = this.playerRef.getPlayer()
        this.progress = player.currentTime / player.duration;
        this.progElement.value = this.progress * 1000;
    }

    render(ms: number): void { }

    dispose(): void {
        this.progElement.remove();
    }
}