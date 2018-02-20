import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";
/**
 * Example implementation of a Play/Pause button.
 * 
 * In the future, `IRendeer` may include a `playing` and `pausing` events, but for now the text 
 * can be changed by handling the onclick at the same time as the play/pause logic.
 * 
 * For now, you can skip rendering by providing an empty function, but function calls are wasted. 
 * In future versions, control flags can be added to prevent rendering.
 * 
 * @export
 * @class PlayPauseButtonRenderer
 * @extends {BaseRenderer}
 */
export class PlayPauseButtonRenderer extends BaseRenderer {
    /**
     * Button which controls the player
     * 
     * @type {HTMLAnchorElement}
     * @memberof PlayPauseButtonRenderer
     */
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

    timechange(ev: Event) { }
    render(ms: number): void { }
    dispose(): void {
        this.buttonElement.remove();
    }
}