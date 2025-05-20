
const progressBar = document.getElementById("progress");
const totalDurationEl = document.getElementById("duration");
const currentDurationEl = document.getElementById("current");
const playPauseBtn = document.getElementById("playPauseButton");
const nextBtn = document.getElementById("nextButton");
const songImg = document.getElementById("songImg");
const songInfo = document.getElementById("songInfo");


  // Playlist of song URLs
const songs = [
  {
    title: "Lost In The City Lights",
    author: "Cosmo Sheldrake",
    src: "./resources/lost-in-city-lights-145038.mp3",
    img: "./resources/cover-1.jpg",
  },
  {
    title: "Forrest Lullaby",
    author: "storm in the woods",
    src: "./resources/forest-lullaby-110624.mp3",
    img: "./resources/cover-2.jpg",
  },
];
let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);

// Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentDurationEl.textContent = formatTime(audio.currentTime);
    totalDurationEl.textContent = formatTime(audio.duration);
});

nextBtn.addEventListener("click", () => {
   audio.pause();
   currentSongIndex = (currentSongIndex + 1) % songs.length;
   audio = new Audio(songs[currentSongIndex].src);
   songInfo.innerHTML = `
    <p>${songs[currentSongIndex].title}</p>
   <p class="artist-name">${songs[currentSongIndex].author}</p>`;
    songImg.innerHTML = `<img class="song-img" src = "${songs[currentSongIndex].img}">`;
    audio.play();
    audio.addEventListener("timeupdate", () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + "%";
        currentDurationEl.textContent = formatTime(audio.currentTime);
        totalDurationEl.textContent = formatTime(audio.duration);
    });
});

playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });



// Format time as M:SS
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function loadSong(index) {
   songInfo.innerHTML = `
   <p>${songs[0].title}</p>
   <p class="artist-name">${songs[0].author}</p>
    `;
    songImg.innerHTML = `<img class="song-img" src = "${songs[0].img}">`
}


loadSong(currentSongIndex)