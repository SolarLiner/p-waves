import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";

export class PlayPauseButtonRenderer extends BaseRenderer {
    buttonElement: HTMLAnchorElement;

    constructor(root: HTMLElement, playerRef: AudioPlayer) {
        super(root, playerRef);

        this.setRoot(root);
    }

    public setRoot(root: HTMLElement) {
        if(this.buttonElement) {
            root.appendChild(this.buttonElement);
            return;
        }

        this.buttonElement = root.appendChild(document.createElement('a'));
        this.buttonElement.classList.add('btn', 'btn-primary');
        this.buttonElement.innerText = 'Play';
        this.buttonElement.onclick = (ev) => {
            if (this.playerRef.paused) {
                this.buttonElement.innerText = 'Pause';
                this.playerRef.play();
            }
            else {
                this.buttonElement.innerText = 'Play';
                this.playerRef.pause();
            }
        };
    }

    render(ms: number): void { }
    dispose(): void {
        this.buttonElement.remove();
    }
}