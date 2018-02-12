let AudioPlayer = require('./module').AudioPlayer;

let player = new AudioPlayer('player', 'file.mp3');

let button = document.getElementById('play-button');
button.onclick = function(ev) {
    button.innerText = player.paused? 'Play' : 'Pause';
    if(player.paused)
        player.play();
    else player.pause();
}