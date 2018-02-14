import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";

export class ProgressbarRenderer extends BaseRenderer {
    private progElement: HTMLProgressElement;
    constructor(root: HTMLElement, playerRef: AudioPlayer) {
        super(root, playerRef);
        this.setRoot(root);
        
        let player = playerRef.getPlayer();
        player.ontimeupdate = ev => {
            this.progress = player.currentTime / player.duration;
        }
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
        console.log(ev);
    }

    render(ms: number): void {
        if(Number.isFinite(this.progress))
            this.progElement.value = this.progress * 1000;
    }

    dispose(): void {
        this.progElement.remove();
    }
}