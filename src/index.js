let AudioPlayer = require('./audioplayer');
let Renderers = require('./renderers/index');
window.AudioPlayer = AudioPlayer.AudioPlayer;

let player = new AudioPlayer.AudioPlayer('player', 'file.mp3');
let render = new Renderers.TimestampRenderer(player.element, player.player);
player.setRenderer(render);

let button = document.getElementById('play-button');
button.onclick = function(ev) {
    button.innerText = player.paused? 'Pause' : 'Play';
    if(player.paused)
        player.play();
    else player.pause();
}