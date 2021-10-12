const video = document.getElementById('video');
const play = document.getElementById("play");
const volume = document.getElementById("volume");
const volumeSlider = document.getElementById("volume-slider");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const timetotal = document.getElementById("timetotal");

// Init default values
(function () {
  video.volume=0.4;
  volumeSlider.value=40;
  progress.value=0;
})();

// Play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updateDuration();
  updatePlayIcon();
}


// Update play/pause icon
function updatePlayIcon() {
  if(video.paused) {
    play.firstElementChild.className = 'fa fa-play fa-2x'
  } else {
    play.firstElementChild.className = "fa fa-pause fa-2x";
  }
}

// Update progress and timestamp
function updateProgress(){
  progress.value = (video.currentTime / video.duration) * 100;
  timestamp.innerText = secondsToTime(video.currentTime);
}

// Update video duration
function updateDuration() {
  timetotal.innerText = secondsToTime(video.duration);
}

// convert video time to timestamp
function secondsToTime(vt) {
  // Get minutes, convert to string and pad with leading 0
  var m = Math.floor(vt / 60).toString().padStart(2,'0');
  // Get seconds, convert to string and pad with leading 0
  var s = Math.floor(vt % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value / 100) * video.duration;
}


// show or hide the volume control panel
function toggleVolumeControl() {
  if (!volume.classList.contains('pressed')) {
    volumeSlider.style.visibility = 'visible';
  } else {
    volumeSlider.style.visibility = "hidden";
  }
  volume.classList.toggle('pressed');
}

// change the volume
function updateVolume(){
  video.volume = volumeSlider.value/100;
}


// Doubleclick on the video to toggle fullscreen
// https://stackoverflow.com/questions/27768320/html5-video-double-click-to-go-full-screen
function makeFullScreen() {
  var divObj = video;
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (divObj.requestFullscreen) {
      divObj.requestFullscreen();
    } else if (divObj.msRequestFullscreen) {
      divObj.msRequestFullscreen();
    } else if (divObj.mozRequestFullScreen) {
      divObj.mozRequestFullScreen();
    } else if (divObj.webkitRequestFullscreen) {
      divObj.webkitRequestFullscreen();
    } else {
      console.log("Fullscreen API is not supported");
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

// Event listeners

video.addEventListener('click', toggleVideoStatus);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("dblclick", makeFullScreen);
video.addEventListener('ended', updatePlayIcon);


play.addEventListener('click', toggleVideoStatus);

volume.addEventListener('click', toggleVolumeControl);

volumeSlider.addEventListener("input", updateVolume);

progress.addEventListener("input", setVideoProgress);
progress.addEventListener("mousedown", toggleVideoStatus);
progress.addEventListener("mouseup", toggleVideoStatus);
