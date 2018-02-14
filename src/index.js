require('./module');

let player = new AudioPlayer.Player('file.mp3');
let root = document.getElementById('player');

let renderers = [
    new Renderers.PlayPauseButtonRenderer(root, player.player),
    new Renderers.ProgressbarRenderer(root, player.player),
    new Renderers.TimestampRenderer(root, player.player)
];

let render = new Layouts.BootstrapGridRendererGroup(root, player.player, renderers);
player.setRenderer(render);