const watch = document.querySelector(".watch");
const stop = document.querySelector(".stop");
const down = document.querySelector(".down");
const pause = document.querySelector(".pause");
const play = document.querySelector(".play");
const up = document.querySelector(".up");

const tree = document.querySelector(".tree");
const cloud = document.querySelector(".cloud");
const cabin = document.querySelector(".cabin");
const fire = document.querySelector(".fire");

const darkMode = document.querySelector(".darkMode");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");

let treeAudio = createAudioElement(
  "assets/sounds/Wild Life In The Forest Sounds (320 kbps).mp3"
);
let cloudAudio = createAudioElement(
  "assets/sounds/Rain Sound Effect Short (2 minutes) ♪ (320 kbps).mp3"
);
let cabinAudio = createAudioElement(
  "assets/sounds/Sound Effects - Crowd Outdoor Market, Large Crowd Ambience, Foreign (320 kbps).mp3"
);
let fireAudio = createAudioElement(
  "assets/sounds/Burning Fire with sound effects free to use _ no copyright (320 kbps).mp3"
);

let minutesDisplay = document.querySelector(".minutes");
let secondsDisplay = document.querySelector(".seconds");
let minutes = Number(minutesDisplay.textContent);
let timerOutId;

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function resetTimer() {
  updateTimerDisplay(minutes, 0);
  clearTimeout(timerOutId);
}

function controls() {
  function tooglePauseAndPlay() {
    play.classList.toggle("hide");
    pause.classList.toggle("hide");
  }

  watch.addEventListener("click", function (e) {
    let newMinutes = prompt("Quantos minutos?");
    if (!newMinutes) {
      resetTimer();
      return;
    }

    minutes = newMinutes;
    updateTimerDisplay(minutes, 0);
    tooglePauseAndPlay();
  });

  play.addEventListener("click", function (e) {
    countDown();
    tooglePauseAndPlay();
  });

  pause.addEventListener("click", function (e) {
    clearTimeout(timerOutId);
    tooglePauseAndPlay();
  });

  stop.addEventListener("click", function (e) {
    resetTimer();
    tooglePauseAndPlay();
    if (play) {
      pause.classList.add("hide");
      play.classList.remove("hide");
    }
  });
}

function ajustTimer() {
  up.addEventListener("click", function () {
    if (up) {
      let currentMinutes = Number(minutesDisplay.textContent);
      let newMinutes = currentMinutes + 5;
      minutesDisplay.textContent = String(newMinutes).padStart(2, "0");
    }
  });

  down.addEventListener("click", function () {
    if (down) {
      let currentMinutes = Number(minutesDisplay.textContent);
      if (currentMinutes >= 5) {
        let newMinutes = currentMinutes - 5;
        minutesDisplay.textContent = String(newMinutes).padStart(2, "0");
      }
    }
  });
}

function countDown() {
  timerOutId = setTimeout(function () {
    let minutes = Number(minutesDisplay.textContent);
    let seconds = Number(secondsDisplay.textContent);

    secondsDisplay.textContent = String(seconds - 1).padStart(2, "0");

    if (minutes <= 0 && seconds <= 0) {
      alert(`Tempo esgotado! Adicione o tempo desejado!`);
      handlePlayTime();
      return;
    }

    if (seconds <= 0) {
      seconds = 60;
      minutesDisplay.textContent = String(minutes - 1).padStart(2, "0");
    }

    secondsDisplay.textContent = String(seconds - 1).padStart(2, "0");
    countDown();
  }, 1000);
}

function createAudioElement(audioElement) {
  let audio = new Audio(audioElement);

  return {
    play: () => {
      audio.play();
    },
    pause: () => {
      audio.pause();
    },
  };
}

function buttonSound() {
  tree.addEventListener("click", function () {
    if (tree.classList.contains("click")) {
      tree.classList.remove("click");
      treeAudio.pause();
    } else {
      tree.classList.add("click");
      treeAudio.play();
      treeAudio.loop = true;
    }
  });
  cloud.addEventListener("click", function () {
    if (cloud.classList.contains("click")) {
      cloud.classList.remove("click");
      cloudAudio.pause();
    } else {
      cloud.classList.add("click");
      cloudAudio.play();
      cloudAudio.loop = true;
    }
  });
  cabin.addEventListener("click", function () {
    if (cabin.classList.contains("click")) {
      cabin.classList.remove("click");
      cabinAudio.pause();
    } else {
      cabin.classList.add("click");
      cabinAudio.play();
      cabinAudio.loop = true;
    }
  });
  fire.addEventListener("click", function () {
    if (fire.classList.contains("click")) {
      fire.classList.remove("click");
      fireAudio.pause();
    } else {
      fire.classList.add("click");
      fireAudio.play();
      fireAudio.loop = false;
    }
  });
}

buttonSound();
controls();
ajustTimer();
