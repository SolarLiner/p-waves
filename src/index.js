require('./module');

let player = new AudioPlayer.Player('file.mp3');
let root = document.getElementById('player');

let renderers = [
    new AudioPlayer.Renderers.PlayPauseButtonRenderer(root, player),
    new AudioPlayer.Renderers.ProgressbarRenderer(root, player),
    new AudioPlayer.Renderers.TimestampRenderer(root, player)
];

let render = new AudioPlayer.Layouts.BootstrapGridRendererGroup(root, player, renderers);
player.setRenderer(render);