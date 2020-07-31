import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
      temp.style.display = 'none';
      playerBtn.forEach(item => item.classList.remove('active'));
      playerBlock.forEach(item => item.classList.remove('active'));
};

const stopPlayer = () => {
      playerBtn.forEach((btn, i) => {
            const block = playerBlock[i];
            if (!block.classList.contains('active')){
                  const player = block.querySelector('.player');
                  player.pause()
                  player.currentTime = 0;
            }
      })
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
      deactivationPlayer();
      btn.classList.add('active');
      playerBlock[i].classList.add('active');
      stopPlayer();
}));

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();