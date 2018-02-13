let AudioPlayer = require('./audioplayer');
let Renderers = require('./renderers/index');
let Layouts = require('./layouts/index');
window.AudioPlayer = AudioPlayer.AudioPlayer;

let player = new AudioPlayer.AudioPlayer('file.mp3');
let root = document.getElementById('player');

let renderers = [
    new Renderers.ProgressbarRenderer(root, player.player),
    new Renderers.TimestampRenderer(root, player.player)
];

let render = new Layouts.BootstrapGridRendererGroup(root, player.player, renderers);
player.setRenderer(render);

let button = document.getElementById('play-button');
button.onclick = function(ev) {
    button.innerText = player.paused? 'Pause' : 'Play';
    if(player.paused)
        player.play();
    else player.pause();
}