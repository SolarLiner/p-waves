import { h, RenderableProps } from "preact";
import { useContext, useState } from "preact/hooks";

import { getContext, useAudioPlayer } from "./context";
import { AudioPlayer } from "../audioplayer";

export function Provider({ children }: RenderableProps<{}>) {
  const ctx = getContext();
  const player = useAudioPlayer();

  return <ctx.Provider value={player}>{children}</ctx.Provider>;
}

export { getContext, useAudioPlayer } from "./context";
