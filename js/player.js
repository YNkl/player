window.addEventListener('load', function () {

    controlPanel = document.getElementById('controlPanel');
    firstButtonBlock = document.getElementById('firstButtonBlock');
    secButtonBlock = document.getElementById('secButtonBlock');    
    pBar = document.getElementById('progress');
    
    drawButtons();
    
    console.log(pBar.offsetWidth);
    //Video Container
    video = document.getElementById('video');
    vd = document.getElementById('videoContaier');

    //Button Container
    playButton = document.getElementById('play');
    timeField = document.getElementById('time');
    //soundButton = document.getElementById('sound-button');
   // sbarContainer = document.getElementById('sbar-container');
   // sbar = document.getElementById('sbar');
    fullscreenButton = document.getElementById('fullScreen');
    //Progress Bar Container
    pbarContainer = document.getElementById('pBar');
    pbar = document.getElementById('pField');

    video.load();
    video.addEventListener('canplay',function () {
        playButton.addEventListener('click', playOrPause,false);
        pbarContainer.addEventListener('click', skip,false);
        //soundButton.addEventListener("click",muteOrUnmute,false);
        //sbarContainer.addEventListener('click',changeVolume,false);
        fullscreenButton.addEventListener('click', fullscreen,false);
        //soundButton.addEventListener('click',showSBar,false);
    },false);
}, false);

function drawButtons(){
    controlPanelWidth = controlPanel.offsetWidth;
    firstButtonBlockWidth = firstButtonBlock.offsetWidth;
    secButtonBlockWidth = secButtonBlock.offsetWidth;
    
    pBar.style.width = controlPanelWidth - firstButtonBlockWidth - secButtonBlockWidth - 10 + "px";
}

function showSBar(){
    sbarContainer.style.opacity = 100;
}

function playOrPause(){
    if(video.paused){
        video.play();
        playButton.style.backgroundImage = "url(../img/pause.png)";
        update = setInterval(updatePlayer,30);
    }
    else{
        video.pause();
        playButton.style.backgroundImage = "url(../img/play.png)";
        window.clearInterval(update);
    }
}

function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormatedTime();
    if (video.ended){
        window.clearInterval(update);
        playButton.style.backgroundImage = 'url(../img/replay.png)';
    }
}

function skip(e) {
    var mouseX = e.pageX - pbarContainer.offsetLeft - controlPanel.offsetWidth / 2;
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length-2));

    video.currentTime = (mouseX/width)*video.duration;
    updatePlayer();
}

function getFormatedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds/60);

    if (minutes > 0){
        seconds -= minutes*60;
    }
    if (seconds.toString().length === 1){
        seconds = '0' + seconds;
    }
    if (minutes.toString().length === 1){
        minutes = '0' + minutes;
    }

    var  totalSeconds = Math.round(video.duration) ;
    var  totalMinutes = Math.floor(totalSeconds/60);

    if (totalMinutes > 0){
        totalSeconds -= totalMinutes*60;
    }
    if (totalSeconds.toString().length === 1){
        totalSeconds = '0' + totalSeconds;
    }
    if (totalMinutes.toString().length === 1){
        totalMinutes = '0' + totalMinutes;
    }

    return minutes + ':' + seconds;// + ' / ';// + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
    if (!video.muted){
        video.muted = true;
        soundButton.src = 'img/volume.png';
        //sbar.style.display = 'none';
    }
    else{
        video.muted = false;
        soundButton.src = 'img/volume.png';
        //sbar.style.display = 'block';
    }
}

function changeVolume(e) {
    var mouseX = e.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length-2));

    video.volume = (mouseX/width);
    sbar.style.width = (mouseX/width)*100 + '%';
    video.muted = false;
    
    soundButton.src = 'img/volume.png';
    sbar.style.display = 'block';
}

var isFull = false;

function fullscreen() {
    
    if(!isFull){
        if (video.requestFullscreen) {
            console.log('4');
            vd.requestFullscreen();
            //vd.style.height = 100 + '%';
        } else if (vd.webkitRequestFullscreen){
            console.log('3');
            vd.webkitRequestFullscreen();
            vd.style.width = 100 + '%';
            vd.style.height = 100 + '%';
            drawButtons();
            //vd.style.top = 0;
        } else if (video.mozRequestFullScreen){
            console.log('1');
            vd.mozRequestFullScreen();
            //vd.style.height = 100 + '%';
        } else if (video.msRequestFullscreen){
            console.log('2');
            vd.msRequestFullscreen();
           // vd.style.height = 100 + '%';
        }
    }else{
        if (document.exitFullscreen) {
	       document.exitFullscreen();
           vd.style.width = 640 + 'px';
           vd.style.height = 360 + 'px';
        } 
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            vd.style.width = 640 + 'px';
            vd.style.height = 360 + 'px';
            drawButtons();
        } 
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            vd.style.width = 640 + 'px';
            vd.style.height = 360 + 'px';
        } 
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            vd.style.width = 640 + 'px';
            vd.style.height = 360 + 'px';
        }
    }
    isFull = !isFull;
}