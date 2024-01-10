let player;

function start(name) {
    let swfobject = {};
    
    swfobject.embedSWF = function(url, cont) {
        let ruffle = window.RufflePlayer.newest();
        
        player = Object.assign(document.getElementById(cont).appendChild(ruffle.createPlayer()), {
            style: "width: 100%; height: 100%;"
        });

        player.config = {
            letterbox: "on",
            autoplay: "on",
            unmuteOverlay: "hidden",
        };

        player.load({ url: url });
    }

    swfobject.embedSWF(`/swf/mildescape/${name}.swf`, 'ruffle');
}

function fullscreen() {
    if (player === undefined) {
        return;
    }

    try {
        player.enterFullscreen();
    } catch (err) {
        console.error(err);
        alert(localizeLang === undefined ? 
            "フルスクリーン表示に失敗しました" :
            localizedTexts["localize-mildescape-fullscreen-error"]
        );
    }
}
