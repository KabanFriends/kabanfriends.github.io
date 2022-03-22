function start(baseWidth, baseHeight, name) {
    const topHeight = document.getElementById('top').offsetHeight;
    const bottomHeight = document.getElementById('bottom').offsetHeight;

    const windowWidth = (window.innerWidth || document.documentElement.clientWidth || 0);
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0) - topHeight - bottomHeight;

    var width = baseWidth * 2;
    var height = baseHeight * 2;

    if (windowWidth < width) {
        width = windowWidth;
        height = (windowWidth / baseWidth) * baseHeight;
    }
    if (windowHeight < height) {
        console.log("true")
        width = (windowHeight / baseHeight) * baseWidth;
        height = windowHeight;
    }

    var swfobject = {};
    
    swfobject.embedSWF = function(url, cont, width, height){
        var ruffle = window.RufflePlayer.newest(),
            player = Object.assign(document.getElementById(cont).appendChild(ruffle.createPlayer()), {
                width: width,
                height: height,
                style: `width: ${width}px; height: ${height}px;`,
            });
        
        player.load({ url: url });
    }
    
    swfobject.embedSWF(`/mildescape-archive/${name}.swf`, 'ruffle', width, height);
}