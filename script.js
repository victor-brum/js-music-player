const wrapper = document.querySelector(".wrapper");

const songImage = document.querySelector(".image img");
const songName = document.querySelector(".song_content .song-name");
const songArtist = document.querySelector(".song_content .song-artist");

const sliderContent = document.querySelector(".slider_content");
const sliderBar = document.querySelector(".slider-bar");

const playPauseBtn = document.querySelector(".play-pause");

const songAudio = document.querySelector("#song-audio");

let songList = [
  {
    name: "Adventure",
    artist: "Alexander Nakarada",
    img: "song01",
    src: "song01",
  },
  {
    name: "Forest Walk",
    artist: "Alexander Nakarada",
    img: "song02",
    src: "song02",
  },
  {
    name: "Blacksmith",
    artist: "Alexander Nakarada",
    img: "song03",
    src: "song03",
  },
  {
    name: "Bonfire",
    artist: "Alexander Nakarada",
    img: "song04",
    src: "song04",
  },
  {
    name: "Wild West Vikings",
    artist: "Alexander Nakarada",
    img: "song05",
    src: "song05",
  },
  {
    name: "Celebration",
    artist: "Alexander Nakarada",
    img: "song06",
    src: "song06",
  },
  {
    name: "Entertainment",
    artist: "Alexander Nakarada",
    img: "song07",
    src: "song07",
  },
  {
    name: "One Bard Band",
    artist: "Alexander Nakarada",
    img: "song08",
    src: "song08",
  },
  {
    name: "Marked",
    artist: "Alexander Nakarada",
    img: "song09",
    src: "song09",
  },
  //Add more songs:
  // {
  //   name: "Music name",
  //   artist: "Artist name",
  //   img: "song10",
  //   src: "song10",
  // },
];

let songIndex = Math.floor(Math.random() * songList.length + 1);

window.addEventListener("load", () => {
  loadSong(songIndex);
});

function loadSong(indexNumb) {
  songName.innerText = songList[indexNumb - 1].name;
  songArtist.innerText = songList[indexNumb - 1].artist;
  songImage.src = `images/${songList[indexNumb - 1].src}.jpg`;
  songAudio.src = `songs/${songList[indexNumb - 1].src}.mp3`;
}

function playSong() {
  wrapper.classList.add("stopped-song");
  playPauseBtn.innerHTML = '<ion-icon name="pause-circle"></ion-icon>';
  songAudio.play();
}

function pauseSong() {
  wrapper.classList.remove("stopped-song");
  playPauseBtn.innerHTML = '<ion-icon name="play-circle"></ion-icon>';
  songAudio.pause();
}

const prevSong = () => {
  songIndex--;
  songIndex < 1 ? (songIndex = songList.length) : (songIndex = songIndex);
  loadSong(songIndex);
  playSong();
};

const repeatSong = () => {
  let current_index = songIndex;
  loadSong(current_index);
  playSong();
};

const nextSong = () => {
  songIndex++;
  songIndex > songList.length ? (songIndex = 1) : (songIndex = songIndex);
  loadSong(songIndex);
  playSong();
};

const randomSong = () => {
  var randomIndex = Math.floor(Math.random() * songList.length) + 1;

  loadSong(randomIndex);
  playSong();
};

const playpauseSong = () => {
  const isSongPlay = wrapper.classList.contains("stopped-song");
  isSongPlay ? pauseSong() : playSong();
};

songAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let sliderWidth = (currentTime / duration) * 100;
  sliderBar.style.width = `${sliderWidth}%`;

  let songCurrentTime = wrapper.querySelector(".current-time"),
    songDuration = wrapper.querySelector(".total-duration");
  songAudio.addEventListener("loadeddata", () => {
    let songAudioDuration = songAudio.duration;
    let totalMinutes = Math.floor(songAudioDuration / 60);
    let totalSeconds = Math.floor(songAudioDuration % 60);
    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }
    songDuration.innerText = `${totalMinutes}:${totalSeconds}`;
  });
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  songCurrentTime.innerText = `${currentMinutes}:${currentSeconds}`;

  if (
    songCurrentTime.innerText == songDuration.innerText &&
    songCurrentTime.innerText > "0:00"
  ) {
    nextSong();
  }
});

sliderContent.addEventListener("click", (e) => {
  let sliderWidth = sliderContent.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = songAudio.duration;

  songAudio.currentTime = (clickedOffsetX / sliderWidth) * songDuration;
  playSong();
});
