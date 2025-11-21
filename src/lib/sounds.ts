// Sound utility for playing sound effects

let buttonClickAudio: HTMLAudioElement | null = null;
let planetClickAudio: HTMLAudioElement | null = null;
let backButtonAudio: HTMLAudioElement | null = null;

export function playButtonClickSound() {
  if (!buttonClickAudio) {
    buttonClickAudio = new Audio('/sounds/button-press.mp3');
    buttonClickAudio.volume = 0.5;
  }
  buttonClickAudio.currentTime = 0;
  buttonClickAudio.play().catch(() => {
    // Ignore errors if audio fails to play
  });
}

export function playPlanetClickSound() {
  if (!planetClickAudio) {
    planetClickAudio = new Audio('/sounds/planet-press.mp3');
    planetClickAudio.volume = 0.5;
  }
  planetClickAudio.currentTime = 0;
  planetClickAudio.play().catch(() => {
    // Ignore errors if audio fails to play
  });
}

export function playBackButtonSound() {
  if (!backButtonAudio) {
    backButtonAudio = new Audio('/sounds/back-button.mp3');
    backButtonAudio.volume = 0.5;
  }
  backButtonAudio.currentTime = 0;
  backButtonAudio.play().catch(() => {
    // Ignore errors if audio fails to play
  });
}

