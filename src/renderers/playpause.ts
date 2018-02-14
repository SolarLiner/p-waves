import { BaseRenderer } from "../abstract/renderer";

export class PlayPauseButtonRenderer extends BaseRenderer {
    buttonElement: HTMLAnchorElement;

    constructor(root: HTMLElement, audioRef: HTMLAudioElement) {
        super(root, audioRef);

        this.setRoot(root);
    }

    public setRoot(root: HTMLElement) {
        this.buttonElement = root.appendChild(document.createElement('a'));
        this.buttonElement.innerText = 'Play';
        this.buttonElement.onclick = (ev) => {
            if (this.audioRef.paused) {
                this.buttonElement.innerText = 'Pause';
                this.audioRef.play();
            }
            else {
                this.buttonElement.innerText = 'Play';
                this.audioRef.pause();
            }
        };
    }

    render(ms: number): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }
}