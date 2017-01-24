window.onload = function () {
    controlPanel = document.getElementById('controlPanel');
    firstButtonBlock = document.getElementById('firstButtonBlock');
    secButtonBlock = document.getElementById('secButtonBlock');
    pBar = document.getElementById('progress');

    drawButtons();

    console.log(pBar.offsetWidth);
    //Video Container
    video = document.getElementById('video');
    vd = document.getElementById('videoContaier');
    playlist = document.getElementById('playlist');
    info = document.getElementById('playerInfo');
    info.style.opacity = 0;
    soundPanel = document.getElementById('soundField');
    helpBut = document.getElementById('help');
    //Button Container
    playButton = document.getElementById('play');
    timeField = document.getElementById('time');
    playlistButton = document.getElementById('menu');
    soundButton = document.getElementById('volume');
    
    //soundButton = document.getElementById('sound-button');
    sbarContainer = document.getElementById('currentSoundField');
    sbar = document.getElementById('sound');
    fullscreenButton = document.getElementById('fullScreen');
    //Progress Bar Container
    pbarContainer = document.getElementById('pBar');
    pbar = document.getElementById('pField');
    
    vd.onresize = function(){
        alert('Размеры div #Test изменены.');
    }

    video.load();
    video.addEventListener('canplay', function () {
        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        soundButton.addEventListener("click",showSoundPanel,false);
        sbarContainer.addEventListener('click',changeVolume,false);
        fullscreenButton.addEventListener('click', toggleFullScreen, false);
        playlistButton.addEventListener('click', showPlaylist, false);
        helpBut.addEventListener('click', showInfo, false);
        //document.addEventListener('keypress', test, false);
        //soundButton.addEventListener('click',showSBar,false);
        
        document.addEventListener("keydown", function(e) {
          if (e.keyCode == 13) {
            toggleFullScreen();
          }
        }, false);
        
        document.onwebkitfullscreenchange = function ( event ) { 
            setTimeout(function(){  
        drawButtons();
      },20);
        }; 

    }, false);
}

function toggleFullScreen() {
    
  if (!document.webkitFullscreenElement) {
      vd.webkitRequestFullscreen();
  } else {
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); 
      
    }
  }

   // drawButtons();
}



function showSoundPanel() {
    if(window.getComputedStyle(soundPanel).getPropertyValue("opacity") < 1){
        TweenLite.to(soundPanel, 0.5, {opacity:"1"});
        soundPanel.style.pointerEvents = 'all';
    }
    else{
        TweenLite.to(soundPanel, 0.5, {opacity:"0"});
        soundPanel.style.pointerEvents = 'none';
    }
}
function showInfo() {
    if(window.getComputedStyle(playerInfo).getPropertyValue("opacity") < 0.7){
        //playlist.style.opacity = '100';
        TweenLite.to(playerInfo, 0.5, {opacity:"0.8"});
    }
    else{
        TweenLite.to(playerInfo, 0.5, {opacity:"0"});
    }
}

function showPlaylist() {
    if(window.getComputedStyle(playlist).getPropertyValue("opacity") < 0.8){
        //playlist.style.opacity = '100';
        TweenLite.to(playlist, 0.5, {opacity:"0.8"});
    }
    else{
        TweenLite.to(playlist, 0.5, {opacity:"0"});
    }
}

function drawButtons() {
    controlPanelWidth = controlPanel.offsetWidth;
    firstButtonBlockWidth = firstButtonBlock.offsetWidth;
    secButtonBlockWidth = secButtonBlock.offsetWidth;
    
    //alert(controlPanelWidth - firstButtonBlockWidth - secButtonBlockWidth);
    pBar.style.width = controlPanelWidth - firstButtonBlockWidth - secButtonBlockWidth - 10 + "px";
}

function showSBar() {
    sbarContainer.style.opacity = 100;
}

function playOrPause() {
    console.log("sdfds");
    if (video.paused) {
        video.play();
        playButton.style.backgroundImage = "url(../img/pause.png)";
        update = setInterval(updatePlayer, 30);
    } else {
        video.pause();
        playButton.style.backgroundImage = "url(../img/play.png)";
        window.clearInterval(update);
    }
}

function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormatedTime();
    if (video.ended) {
        window.clearInterval(update);
        playButton.style.backgroundImage = 'url(../img/replay.png)';
    }
}

function skip(e) {
    var mouseX = e.pageX - pbarContainer.offsetLeft - controlPanel.offsetWidth;
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));

    video.currentTime = (mouseX / width) * video.duration;
    updatePlayer();
}

function getFormatedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);

    if (minutes > 0) {
        seconds -= minutes * 60;
    }
    if (seconds.toString().length === 1) {
        seconds = '0' + seconds;
    }
    if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
    }

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds / 60);

    if (totalMinutes > 0) {
        totalSeconds -= totalMinutes * 60;
    }
    if (totalSeconds.toString().length === 1) {
        totalSeconds = '0' + totalSeconds;
    }
    if (totalMinutes.toString().length === 1) {
        totalMinutes = '0' + totalMinutes;
    }

    return minutes + ':' + seconds; // + ' / ';// + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
    if (!video.muted) {
        video.muted = true;
        soundButton.src = 'img/volume.png';
        //sbar.style.display = 'none';
    } else {
        video.muted = false;
        soundButton.src = 'img/volume.png';
        //sbar.style.display = 'block';
    }
}

function changeVolume(e) {
    var mouseY = (sbarContainer.getBoundingClientRect().top - e.pageY + 45);
    
    var height = window.getComputedStyle(sbarContainer).getPropertyValue('height');
    height = parseFloat(height.substr(0, height.length - 2));
    //alert(height);
    video.volume = (mouseY / height);
    sbar.style.height = (mouseY / height) * 100 + '%';
    //video.muted = false;

    //alert(mouseY);
    //alert((mouseY / height)* 100);
    //soundButton.src = 'img/volume.png';
    //sbar.style.display = 'block';
}

var isFull = false;

function fullscreen() {

    if (!isFull) {
        
        if (vd.requestFullscreen) {
            console.log('4');
            vd.requestFullscreen();
            vd.style.width = 100 + '%';
            vd.style.height = 100 + '%';
        } else if (vd.webkitRequestFullscreen) {
            console.log('3');
            vd.webkitRequestFullscreen();
            //vd.style.width = 100 + '%';
            //vd.style.height = 100 + '%';
            drawButtons();
            //vd.style.top = 0;
        } else if (vd.mozRequestFullScreen) {
            console.log('1');
            vd.mozRequestFullScreen();
            vd.style.width = 100 + '%';
            vd.style.height = 100 + '%';
        } else if (vd.msRequestFullscreen) {
            console.log('2');
            vd.msRequestFullscreen();
            vd.style.width = 100 + '%';
            vd.style.height = 100 + '%';
        }
    } else {
        if (vd.exitFullscreen) {
            vd.exitFullscreen();
            vd.style.width = 640 + 'px';
            vd.style.height = 360 + 'px';
        } else if (vd.webkitExitFullscreen) {
            vd.webkitExitFullscreen();
            console.log(isFull);
            //vd.style.width = 640 + 'px';
            //vd.style.height = 360 + 'px';
            drawButtons();
        } else if (vd.mozCancelFullScreen) {
            vd.mozCancelFullScreen();
            vd.style.width = 640 + 'px';
            //vd.style.height = 360 + 'px';
        } else if (vd.msExitFullscreen) {
            vd.msExitFullscreen();
            vd.style.width = 640 + 'px';
            vd.style.height = 360 + 'px';
        }
    }
    
    isFull = !isFull;
}