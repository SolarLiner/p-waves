var e,r=require("preact/hooks"),o=require("p-waves/src/audioplayer"),t=require("preact"),i=require("p-waves/src/event");function n(){return e||(e=t.createContext(new o.AudioPlayer))}function a(){var e=r.useState({player:new o.AudioPlayer,revision:0}),t=e[0],n=t.player,a=t.revision,u=e[1];return console.log("[preact/context] state revision",a),0===a&&i.observe(n).subscribe(function(e){console.log("[AudioPlayer] "+e.type+":",e.value),u({player:n,revision:a+1})}),n}exports.Provider=function(e){var r=e.children,o=n(),i=a();return t.h(o.Provider,{value:i},r)},exports.getContext=n,exports.useAudioPlayer=a;
//# sourceMappingURL=pwaves-preact.js.map