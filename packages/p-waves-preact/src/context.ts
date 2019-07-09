import { useContext, useState } from "preact/hooks";

import { AudioPlayer } from "p-waves";
import { Context, createContext } from "preact";
import { Event } from "p-waves";

let _context: Context<AudioPlayer>;
export function getContext() {
  if (!_context) {
    return (_context = createContext(new AudioPlayer()));
  }
  return _context;
}

export function useAudioPlayer() {
  const [{ player, revision }, setState] = useState({ player: new AudioPlayer(), revision: 0 });
  console.log(`[preact/context] state revision`, revision);
  if (revision === 0)
    Event.observe(player).subscribe(ev => {
      console.log(`[AudioPlayer] ${ev.type}:`, ev.value);
      setState({ player, revision: revision + 1 });
    });
  return player;
}
