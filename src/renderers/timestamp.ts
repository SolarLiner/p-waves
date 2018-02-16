import { BaseRenderer } from "../abstract/renderer";
import { AudioPlayer } from "../audioplayer";

export class TimestampRenderer extends BaseRenderer {
    span: HTMLSpanElement;

    constructor(root: HTMLElement, playerRef: AudioPlayer) {
        super(root, playerRef);

        this.setRoot(root);
        this.timechange(new Event('none'));
    }

    public setRoot(newRoot: HTMLElement) {
        if(this.span)
            newRoot.appendChild(this.span);
        else
            this.span = newRoot.appendChild(document.createElement('span'));
    }

    timechange(ev: Event) {
        let player = this.playerRef.getPlayer();
        let timestamp = this.secondsToTimestamp(player.currentTime);
        let duration = this.secondsToTimestamp(player.duration);
        this.span.innerHTML = `<b>${timestamp.minutes}:${timestamp.seconds}</b> ${duration.minutes}:${duration.seconds}`;
    }

    render(ms: number): void { }
    dispose(): void {
        this.root.innerText = "";
    }

    private secondsToTimestamp(seconds: number) {
        let minutes = Math.floor(seconds / 60);
        let fracMinute = seconds / 60 - minutes;

        return {
            minutes: `${this.leftPad(minutes.toString(), 2)}`,
            seconds: `${this.leftPad(Math.floor(fracMinute * 60).toString(), 2)}`
        }
    }

    private leftPad(str: string, len: number, padChar?: string): string {
        let padAmt = len - str.length + 1;
        if (padAmt <= 0)
            return str;
        let padStr = new Array(padAmt).join(padChar || '0');

        return padStr + str;
    }
}