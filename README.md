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
"renderer groups" 
