import { BaseRenderer } from "../abstract/renderer";

export class TimestampRenderer extends BaseRenderer {
    span: HTMLSpanElement;

    constructor(root: HTMLElement, audioRef: HTMLAudioElement) {
        super(root, audioRef);

        this.setRoot(root);
    }

    render(ms: number): void {
        let timestamp = this.secondsToTimestamp(this.audioRef.currentTime);
        let duration = this.secondsToTimestamp(this.audioRef.duration);

        this.root.innerHTML = `<b>${timestamp.minutes}:${timestamp.seconds}</b> ${duration.minutes}:${duration.seconds}`;
    }
    dispose(): void {
        this.root.innerText = "";
    }

    public setRoot(newRoot: HTMLElement) {
        if(this.span)
            newRoot.appendChild(this.span);
        else
            this.span = newRoot.appendChild(document.createElement('span'));
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