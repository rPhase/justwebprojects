const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volBtn = document.getElementById("volume-btn");
const volContainer = document.getElementById("volume-container");
const volume = document.getElementById("volume");
const volBar = document.getElementById("volume-bar");
const repeatBtn = document.getElementById("repeat");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const timestamp = document.getElementById("timestamp");
const timetotal = document.getElementById("timetotal");

// Song titles
const songs = ["hey", "summer", "ukulele", "fenderbender"];

// Volume level
let volLevel = 0.4;

// Keep track of song
let songIndex = 3;

// Init default values
(function () {
  audio.volume = volLevel;
  volume.style.width = `${volLevel * 100}%`;
})();

// Initial load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

// Play and pause audio
function toggleSongStatus() {
  // Check if playing
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.firstElementChild.className = "fa fa-pause";
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.firstElementChild.className = "fa fa-play";
  audio.pause();
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  if (musicContainer.classList.contains("play")) {
    playSong();
  }
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  if (musicContainer.classList.contains("play")) {
    playSong();
  }
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  timestamp.innerText = secondsToTime(currentTime);
  progress.style.width = `${progressPercent}%`;
}

// Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// convert audio time to timestamp
function secondsToTime(vt) {
  // Get minutes, convert to string and pad with leading 0
  var m = Math.floor(vt / 60)
    .toString()
    .padStart(2, "0");
  // Get seconds, convert to string and pad with leading 0
  var s = Math.floor(vt % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// Show or hide the volume controls
function toggleVolumeControl() {
  volContainer.classList.toggle("show");
  volBtn.classList.toggle("active");
}

// Set volume
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  volLevel = clickX / width;
  volume.style.width = `${volLevel * 100}%`;
  audio.volume = volLevel;
}

// Toggle repeat
function toggleRepeat() {
  repeatBtn.classList.toggle("active");
}

// Event listeners
playBtn.addEventListener("click", toggleSongStatus);

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Toggle Volume
volBtn.addEventListener("click", toggleVolumeControl);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Load song duration after metadata is loaded
// Prevent duration from returning NaN
audio.addEventListener("loadedmetadata", () => {
  timetotal.innerText = secondsToTime(audio.duration);
});

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", () => {
  if (repeatBtn.classList.contains("active")) {
    playSong();
  } else {
    nextSong();
  }
});

// Click on volume bar
volBar.addEventListener("click", setVolume);

// Click on repeat
repeatBtn.addEventListener("click", toggleRepeat);
