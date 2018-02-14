import { BaseRenderer } from "../abstract/renderer";

export class BootstrapGridRendererGroup extends BaseRenderer {

    constructor(root: HTMLElement, audio: HTMLAudioElement, private renderers: BaseRenderer[]) {
        super(root, audio);

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

    render(ms: number): void {
        this.renderers.forEach(value => value.render(ms));
    }
    dispose(): void {
        Promise.all(this.renderers.map(value => value.dispose()))
            .then(() => { delete this.renderers });
    }
}