var AudioPlayer = require('./audioplayer');
var Renderers = require('./renderers/index');
var Layouts = require('./layouts/index');

window.AudioPlayer = {
    Player: AudioPlayer.AudioPlayer,
    Renderers: Renderers,
    Layouts: Layouts
};