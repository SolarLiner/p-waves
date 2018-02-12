export default class AudioPlayer {
    private player: HTMLAudioElement;
    private element: HTMLElement;

    get paused() {
        return this.player.paused;
    }

    constructor(id: string, file: string) {
        this.element = document.getElementById(id);
        this.element.innerText = "Audio player.";
        this.player = new Audio(file);
    }

    public play() {
        this.player.play();
    }

    public pause() {
        this.player.pause();
    }
}