import Player from '@vimeo/player';
import { throttle } from 'lodash';
import isStorageAvailable from './storage.js';

const STORAGE_KEY = 'videoplayer-current-time';

const initPlayer = () => {
  const iframe = document.querySelector('#vimeo-player');
  return new Player(iframe);
};

const savePlayerTime = async (player) => {
  try {
    const currentTime = await player.getCurrentTime();
    localStorage.setItem(STORAGE_KEY, currentTime);
  } catch (err) {
    console.error('Vimeo time wasn\'t saved -> ' + err.message);
  }
};

const loadPlayerTime = (player) => {
  try {
    const currTimeFromStorage = parseFloat(localStorage.getItem(STORAGE_KEY));
    player.setCurrentTime(currTimeFromStorage);
  } catch (err) {
    console.error('Vimeo time wasn\'t loaded -> ' + err.message);
  }
};

const app = () => {
  if (!isStorageAvailable()) {
    return;
  }

  const player = initPlayer();
  loadPlayerTime(player);

  player.on('timeupdate', throttle(() => savePlayerTime(player), 1000));
};

window.addEventListener('load', app);
