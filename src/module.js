let AudioPlayer = require('./audioplayer');
let Renderers = require('./renderers/index');
let Layouts = require('./layouts/index');

window.AudioPlayer = {
    Player: AudioPlayer.AudioPlayer,
    Renderers: Renderers,
    Layouts: Layouts
};