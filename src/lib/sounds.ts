// Sound utility for playing sound effects

let buttonClickAudio: HTMLAudioElement | null = null;
let planetClickAudio: HTMLAudioElement | null = null;
let backButtonAudio: HTMLAudioElement | null = null;
let explosionAudio: HTMLAudioElement | null = null;
let gunShotAudio: HTMLAudioElement | null = null;

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

export function playExplosionSound() {
  if (!explosionAudio) {
    explosionAudio = new Audio('/sounds/explosion.mp3');
    explosionAudio.volume = 0.6;
  }
  explosionAudio.currentTime = 0;
  explosionAudio.play().catch(() => {
    // Ignore errors if audio fails to play
  });
}

export function playGunShotSound() {
  if (!gunShotAudio) {
    gunShotAudio = new Audio('/sounds/gun-shot.mp3');
    gunShotAudio.volume = 0.5;
  }
  gunShotAudio.currentTime = 0;
  gunShotAudio.play().catch(() => {
    // Ignore errors if audio fails to play
  });
}

