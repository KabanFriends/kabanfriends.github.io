const mobile = new MobileDetect(window.navigator.userAgent);

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

        if (mobile.is("AndroidOS") && !!window.chrome) {
            console.log("Set preferred renderer to WebGL as the client uses Chrome on Android (https://bugs.chromium.org/p/chromium/issues/detail?id=1510149)")
            player.config.preferredRenderer = "webgl";
        }

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
