import { AudioPlayer } from "../audioplayer";
/**
 * Base interface on which all renderers built upon.
 * 
 * A renderer hooks to the audio player by having sent "time change" and "render" events,
 * which are respectively hooked from `HTMLAudioElement.ontimechange` and `requestAnimationFrame`.
 * Progress is already reported through the *progress* member.
 * 
 * The concept of this Audio player is to let developpers design their own "renderers" that fit
 * their websites. Example renderers are provided as well as a "Bootstrap Grid" renderer group
 * that bundles several renderers into one.
 * 
 * Typically implementing this interface directly isn't the way to go - check out the `BaseRenderer`
 * abstract class.
 * 
 * @export
 * @interface IRenderer
 */
export interface IRenderer {
    /**
     * Animation frame reference that the current `render` pass was called from.
     * 
     * @type {number}
     * @memberof IRenderer
     */
    animationFrameReference: number;
    /**
     * Audio progress is reported from the Audio player here, as a float
     * from 0 to 1.
     * 
     * @type {number}
     * @memberof IRenderer
     */
    progress: number;
    /**
     * Event called when the audio player's time change, according to `HTMLAudioElement.ontimechange`
     * 
     * @param {Event} ev Event passed on from the `HTMLAudioElement.ontimechange` event.
     * @memberof IRenderer
     */
    timechange(ev: Event): void;
    /**
     * Render function that updates visuals. Gets called from an `requestAnimationFrame` where the ID
     * is stored in animationFrameReference
     * 
     * @param {number} ms Render start timestamp.
     * @memberof IRenderer
     */
    render(ms: number): void;
    /**
     * Dispose function that gets called when unplugging the renderer or swapping it out. Use it to
     * remove added DOM or free memory
     * 
     * @memberof IRenderer
     */
    dispose();
}
/**
 * Base class on which to implement renderers.
 * 
 * `BaseRenderer` implements `IRenderer` directly and adds abstract utility functions on top to aid with
 * implementing a renderer
 * 
 * @export
 * @abstract
 * @class BaseRenderer
 * @implements {IRenderer}
 */
export abstract class BaseRenderer implements IRenderer {
    public progress: number;
    animationFrameReference: number;

    constructor(protected root: HTMLElement, protected playerRef: AudioPlayer) { }

    public getRoot() {
        return this.root;
    }

    abstract timechange(ev: Event): void;
    abstract setRoot(newRoot: HTMLElement): void;
    abstract render(ms: number): void;
    abstract dispose(): void;
}