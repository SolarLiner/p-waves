import { h, RenderableProps } from "preact";

import { getContext, useAudioPlayer } from "./context";

export function Provider({ children }: RenderableProps<{}>) {
  const ctx = getContext();
  const player = useAudioPlayer();

  return <ctx.Provider value={player}>{children}</ctx.Provider>;
}

export { getContext, useAudioPlayer } from "./context";
