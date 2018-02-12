import { BaseRenderer } from "../abstract/renderer";

export class TimestampRenderer extends BaseRenderer {

    render(ms: number): void {
        this.root.innerText = `${this.audioRef.currentTime} / ${this.audioRef.duration} s`;
    }
    dispose(): void {
        this.root.innerText = "";
    }
}