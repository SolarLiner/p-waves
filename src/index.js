require('./module');

let player = new AudioPlayer.Player('file.mp3');
let root = document.getElementById('player');

let renderers = [
    new AudioPlayer.Renderers.PlayPauseButtonRenderer(root, player.player),
    new AudioPlayer.Renderers.ProgressbarRenderer(root, player.player),
    new AudioPlayer.Renderers.TimestampRenderer(root, player.player)
];

let render = new AudioPlayer.Layouts.BootstrapGridRendererGroup(root, player.player, renderers);
player.setRenderer(render);