# P Waves

Ground-breaking component-based audio player for the web

## What is P Waves?

**P Waves** is a component-based audio player that aims to simplify the creation
of visuals around audio players. 'Visualizers' can manipulate DOM elements or
render to canvas elements.

Examples of visualizers can be found in the 'renderers' source folder.

### Using the player

The Audio Player interfaces with the Audio element and redirects the
`ontimechange` event from the internal HTMLAudioElement. The player also takes
care of calling for animation frames and pass down references to the renderer.

A renderer is a JavaScript class extending the `BaseRenderer`. Although only one
renderer can be attached to the AudioPlayer at a time, it is easy to make
"renderer groups" - in fact there is an example renderer group that wraps
children renderers in Bootstrap 4 'col' CSS classes.

### Anatomy of a renderer

A renderer is a extension of the base class `BaseRenderer`. It hooks to
the audio player by having sent "time change" and "render" events, which are
respectively hooked from `HTMLAudioElement.ontimechange` and
`requestAnimationFrame`. Progress is already reported through the *progress*
member.  
`BaseRenderer` implements `IRenderer` directly and adds abstract utility
functions on top to aid with implementing a renderer.

While the main aim of a renderer is to *show* something to the end-user,
renderers can also simply act on the player - for example, the
`PlayPauseButtonRenderer` does create a Play/Pause button that triggers the
relevant events on the player.
