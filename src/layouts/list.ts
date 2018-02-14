import { BaseRenderer } from "../abstract/renderer";

export class BootstrapGridRendererGroup extends BaseRenderer {
    private renderers: BaseRenderer[]

    constructor(root: HTMLElement, audio: HTMLAudioElement, renderers: BaseRenderer[]) {
        super(root, audio);
        root.classList.add('row');
        this.renderers = renderers.map(renderer => {
            let subroot = root.appendChild(document.createElement('div'))
            subroot.className = 'col';
            renderer.setRoot(subroot);
            return renderer;
        });
        console.log(this.renderers.map(value => value.getRoot()));
    }

    render(ms: number): void {
        this.renderers.forEach(value => value.render(ms));
    }
    dispose(): void {
        Promise.all(this.renderers.map(value => value.dispose()))
            .then(() => { delete this.renderers });
    }
}