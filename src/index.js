let AudioPlayer = require('./audioplayer');
window.AudioPlayer = AudioPlayer.AudioPlayer;

// let player = AudioPlayer('player', 'file.mp3');
let player = new AudioPlayer.AudioPlayer('player', 'file.mp3');

let button = document.getElementById('play-button');
button.onclick = function(ev) {
    button.innerText = player.paused? 'Pause' : 'Play';
    if(player.paused)
        player.play();
    else player.pause();
}