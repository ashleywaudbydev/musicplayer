//Variables
const songImg = document.getElementById("songImg");
const songInfo = document.getElementById("songInfo");
const totalDurationEl = document.getElementById("duration");
const currentDurationEl = document.getElementById("current");
const progressBar = document.getElementById("progress");
// Playlist of song URLs
const songs = [
  {title: "Lost In The City Lights",author: "Cosmo Sheldrake",src: "./resources/lost-in-city-lights-145038.mp3",img: "./resources/cover-1.jpg",},
  {title: "Forrest Lullaby",author: "storm in the woods",src: "./resources/forest-lullaby-110624.mp3",img: "./resources/cover-2.jpg",},
];
let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);
// Update progress bar as song plays
function updateProgressBar(){
   let percent = (audio.currentTime / audio.duration) * 100;
   progressBar.style.width = percent + "%";
   currentDurationEl.textContent = formatTime(audio.currentTime);
   totalDurationEl.textContent = formatTime(audio.duration);
};
// Update The ui on song change
function updateUi() {
  songInfo.innerHTML = `
    <p>${songs[currentSongIndex].title}</p>
    <p class="artist-name">${songs[currentSongIndex].author}</p>`;
    songImg.innerHTML = `<img style='border-radius: 0.5rem'; src = "${songs[currentSongIndex].img}">`;
    songImg.classList.add("song-img")
}
// play a next song
function nextSong(){
   audio.pause();
   currentSongIndex = (currentSongIndex + 1) % songs.length;
   audio = new Audio(songs[currentSongIndex].src);
   updateUi();
   audio.addEventListener("timeupdate",updateProgressBar);
   audio.play();
};
// play a prev song
function prevSong(){
   audio.pause();
   currentSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
   audio = new Audio(songs[currentSongIndex].src);
   audio.play();
   updateUi();
   audio.addEventListener("timeupdate",updateProgressBar);
   audio.play();
};
// play and pause the current song
function playPause()  {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
// formatting the timer
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (!isFinite(minutes) || !isFinite(seconds)) return null;
return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
// load song state into the ui
function loadSong(index) {
   songInfo.innerHTML = `
   <p>${songs[0].title}</p>
   <p class="artist-name">${songs[0].author}</p>
    `;
    songImg.innerHTML = `<img style='border-radius: 0.5rem'; src = "${songs[0].img}">`;
   
   
    audio.play()
}
// Event listners for the project
document.getElementById("playPauseButton").addEventListener("click", playPause);
document.getElementById("nextBtn").addEventListener("click", nextSong);
document.getElementById("prevBtn").addEventListener("click", prevSong);
audio.addEventListener("timeupdate",updateProgressBar);
loadSong(currentSongIndex)
