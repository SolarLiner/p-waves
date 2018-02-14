import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";

export class BootstrapGridRendererGroup extends BaseRenderer {

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
        if(!this.renderers)
            console.log('No renderers');
        else
            this.renderers.forEach(value => {
                value.timechange(ev);
            });
    }

    render(ms: number): void {
        this.renderers.forEach(value => value.render(ms));
    }
    dispose(): void {
        Promise.all(this.renderers.map(value => value.dispose()))
            .then(() => { delete this.renderers });
    }
}