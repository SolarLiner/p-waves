import { Event, EventEmitter } from "./event";
import { ArrayNotifier } from "./arraynotifier";

export interface Track {
  src: string;
  title: string;
  artist?: string;
  album?: string;
  albumUrl?: string;
}
export interface TrackProgress {
  position: number;
  duration: number;
}

interface AudioPlayerEventMap {
  playlistAdd: PlaylistEvent;
  playlistRemove: PlaylistEvent;
  loaded: PlayerEvent;
  play: PlayerEvent;
  pause: PlayerEvent;
  prev: PlayerEvent;
  next: PlayerEvent;
  stop: PlayerEvent;
  progress: PlayerEvent;
  ended: PlayerEvent;
}

export class AudioPlayer extends EventEmitter<keyof AudioPlayerEventMap, AudioPlayerEventMap> {
  private _player: HTMLAudioElement;
  private _playlist: Track[];
  private _trackId: number;
  private _playlistMode: "sequential" | "shuffle";
  private _repeat: "all" | "one" | null;
  private _overridePlay: boolean;

  get player() {
    return this._player;
  }

  get playlist() {
    const notifier = new ArrayNotifier(this._playlist);
    notifier.addEventListener("set", e =>
      this.emit(new PlaylistEvent("playlistAdd", this, e.value.index, e.value.value))
    );
    notifier.addEventListener("remove", e =>
      this.emit(new PlaylistEvent("playlistRemove", this, e.value.index, e.value.value))
    );
    return this._playlist;
  }

  get playMode() {
    return this._playlistMode;
  }
  set playMode(mode: AudioPlayer["_playlistMode"]) {
    this._playlistMode = mode;
  }

  get repeatMode() {
    return this._repeat;
  }
  set repeatMode(mode: AudioPlayer["_repeat"]) {
    this._repeat = mode;
  }

  get trackId() {
    return this._trackId;
  }

  get currentTrack(): Track & TrackProgress {
    return Object.assign({}, this._playlist[this._trackId], {
      position: this._player.currentTime,
      duration: this._player.duration
    });
  }

  get paused() {
    if (this._overridePlay) return false;
    return this._player.paused;
  }

  constructor(...tracks: Track[]) {
    super();
    this._player = new Audio();
    this._playlist = tracks;
    this._playlistMode = "sequential";
    this._repeat = null;
    this._trackId = -1;
    this._overridePlay = false;

    this._player.addEventListener("timeupdate", () => {
      this.emit(new PlayerEvent("progress", this));
      if (this._player.ended) {
        this._overridePlay = true;
        this.emit(new PlayerEvent("ended", this));
        if (this.nextAvailable()) this.next();
        else this.stop();
        this._overridePlay = false;
      }
    });
  }

  public load(track: Track | number) {
    if (typeof track === "number") {
      if (track < 0) track = this._playlist.length - track;
      if (Math.abs(track) >= this._playlist.length) throw new Error("Playlist does not have track id " + track);
      this._trackId = track;
      this._player.src = this._playlist[track].src;
      this._player.load();
      this.emit(new PlayerEvent("loaded", this));
    } else {
      const tr = track; // Workaround TypeScript type inference
      const id = this._playlist.findIndex(t => t.src === tr.src);
      if (id === -1) {
        this._trackId = this._playlist.push(track) - 1;
        this._player.src = track.src;
        this._player.load();
      } else {
        this.load(id);
      }
    }
  }

  public play(track?: Track | number) {
    if (track === undefined) {
      if (this._trackId === -1) this.load(0);
      this._player.play();
    } else {
      this.load(track);
      this.play();
    }
    this.emit(new PlayerEvent("play", this));
  }

  public pause() {
    this._player.pause();
    this.emit(new PlayerEvent("pause", this));
  }

  public stop() {
    this._player.pause();
    this._player.currentTime = 0;
    this.emit(new PlayerEvent("stop", this));
  }

  public seek(time: number) {
    if (time > this.currentTrack.duration) this.next();
    if (time < 0) this.prev();
    this._player.currentTime = time;
  }

  public prevAvailable() {
    if (this._repeat !== null) return true;
    return this._trackId === 0;
  }

  public nextAvailable() {
    if (this._repeat !== null) return true;
    return this._trackId !== this._playlist.length - 1;
  }

  public prev(force = false) {
    if (!force && this._player.currentTime < 1) {
      this.prev(true);
    } else if (this.prevAvailable()) {
      const idx = (this._trackId - 1) % this._playlist.length;
      const playing = !this.paused;
      this.load(idx);
      if (playing) this.play();
      this.emit(new PlayerEvent("previous", this));
    } else {
      this.load(0);
    }
  }

  public next(force = false) {
    const playing = !this.paused;
    if (!force && this._repeat === "one") {
      this.load(this._trackId);
      if (playing) this.play();
    } else if (this.nextAvailable()) {
      let idx = (this._trackId + 1) % this._playlist.length;
      this.load(idx);
      if (playing) this.play();
      this.emit(new PlayerEvent("next", this));
    } else {
      this.stop();
    }
  }

  public pushTrack(track: Track) {
    this.emit(new PlaylistEvent("playlistAdd", this, this._playlist.length, track));
    return this._playlist.push(track);
  }

  public addNext(track: Track) {
    this._playlist.splice(this._trackId, 0, track);
    this.emit(new PlaylistEvent("playlistAdd", this, this._trackId + 1, track));
    return this._playlist.length;
  }

  public remove(id: number) {
    if (id === this._trackId) {
      if (this.nextAvailable()) {
        this.next();
      } else {
        this.load(0);
      }
    }
    const [removed] = this._playlist.splice(id, 1);
    this.emit(new PlaylistEvent("playlistRemove", this, id, removed));
  }
}

export interface PlayerEventObject {
  readonly player: AudioPlayer;
}
export class PlayerEvent extends Event<PlayerEventObject> {
  constructor(id: string, player: AudioPlayer) {
    super(id, { player });
  }
}

export interface PlaylistEventObject extends PlayerEventObject {
  index: number;
  value: Track;
}
export class PlaylistEvent extends Event<PlaylistEventObject> {
  constructor(type: string, player: AudioPlayer, index: number, value: Track) {
    super(type, { player, index, value });
  }
}
