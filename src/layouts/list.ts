import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";
/**
 * An example "Renderer group" using Boostrap grids.
 * 
 * A renderer group is a "meta-renderer" that relays events to several renderers. This is useful
 * for breaking-up components in a complex renderer.
 * 
 * @export
 * @class BootstrapGridRendererGroup
 * @extends {BaseRenderer}
 */
export class BootstrapGridRendererGroup extends BaseRenderer {
/**
 * Creates an instance of BootstrapGridRendererGroup.
 * @param {HTMLElement} root Root element.
 * @param {AudioPlayer} playerRef Reference of the `AudioPlayer` that renders it.
 * @param {BaseRenderer[]} renderers List of renderers to be managed by this renderer group.
 * @memberof BootstrapGridRendererGroup
 */
constructor(root: HTMLElement, playerRef: AudioPlayer, private renderers: BaseRenderer[]) {
        super(root, playerRef);

        this.setRoot(root);
    }

    public setRoot(root: HTMLElement) {
        root.classList.add('row');
        this.renderers.forEach(renderer => {
            let subroot = root.appendChild(document.createElement('div'));
            subroot.className = 'col';
            renderer.setRoot(subroot);
        });
    }

    timechange(ev: Event) {
        if(this.renderers)
            this.renderers.forEach(value => {
                value.timechange(ev);
            });
    }

    render(ms: number): void {
        this.renderers.forEach(value => {
            value.animationFrameReference = this.animationFrameReference;
            value.render(ms);
        });
    }
    dispose(): void {
        Promise.all(this.renderers.map(value => value.dispose()))
            .then(() => { delete this.renderers });
    }
}