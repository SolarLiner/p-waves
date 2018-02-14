import { IRenderer } from "./abstract/renderer";

export class AudioPlayer {
    private player: HTMLAudioElement;
    private renderer?: IRenderer;

    get paused() {
        return this.player.paused;
    }

    constructor(file: string, renderer?: IRenderer) {
        this.player = new Audio(file);

        this.setRenderer(renderer);
    }

    public getPlayer() {
        return this.player;
    }

    public getRenderer() {
        return this.renderer;
    }

    public setRenderer(renderer: IRenderer) {
        if(renderer == this.renderer)
            return;
        if(!this.renderer) {
            this.renderer = renderer;
            this.player.ontimeupdate = this.renderer.timechange;
            return;
        }
        this.renderer.dispose();
        this.renderer = renderer;
        this.player.ontimeupdate = this.renderer.timechange;
    }

    public play() {
        this.player.play();
        let animation = (ms) => {
            if(!this.renderer)
                return;
            this.renderer.render(ms);
            this.renderer.animationFrameReference = requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    public pause() {
        this.player.pause();
        cancelAnimationFrame(this.renderer.animationFrameReference);
    }
}