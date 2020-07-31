export const videoPlayerInit = () => {
   
   const video = document.querySelector('.video');
   const videoPlayer = document.querySelector('.video-player');
   const videoButtonPlay = document.querySelector('.video-button__play');
   const videoButtonStop = document.querySelector('.video-button__stop');
   const videoProgress = document.querySelector('.video-progress');
   const videoTimePassed = document.querySelector('.video-time__passed');
   const videoTimeTotal = document.querySelector('.video-time__total');
   const videoVolume = document.querySelector('.video-volume');
   const videoFullScreen = document.querySelector('.video-fullscreen');

   const addZero = n => n < 10 ? '0' + n : n;

   // ЗАмена иконки плеера
   const toggleIcon = () => {
      if (videoPlayer.paused) {
         videoButtonPlay.classList.remove('fa-pause');
         videoButtonPlay.classList.add('fa-play');
      } else {
         videoButtonPlay.classList.remove('fa-play');
         videoButtonPlay.classList.add('fa-pause');
      }
   };

   // Нажатие на клавишу проигрывателя
   const togglePlay = () => {
      if (videoPlayer.paused) {
         videoPlayer.play();
      } else {
         videoPlayer.pause();
      }
   };

   // Стоп
   const stopPlay = () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
   };

   // Играть/останавливать при нажатии space
   const spacePlay = event => {
      if (video.classList.contains('active')){
         // Если нажали на пробел
         if (event.keyCode === 32) {
            togglePlay();
         }
      }
   };

   videoPlayer.addEventListener('click', togglePlay);
   videoButtonPlay.addEventListener('click', togglePlay);

   videoPlayer.addEventListener('play', toggleIcon); // СТоп
   videoPlayer.addEventListener('pause', toggleIcon); // Играй

   videoButtonStop.addEventListener('click', stopPlay);

   videoPlayer.addEventListener('timeupdate', () => {
      const currentTime = videoPlayer.currentTime;
      const duration = videoPlayer.duration;

      videoProgress.value = (currentTime / duration) * 100;

      // Оставшиеся минуты и секунд
      let minutePassed = Math.floor(currentTime / 60);
      let secondsPassed = Math.floor(currentTime % 60);

      // Сколько всего минут и секунд
      let minuteTotal = Math.floor(duration / 60);
      let secondsTotal = Math.floor(duration % 60);

      // Запись с плеером 
      videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
      videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
   });

   videoProgress.addEventListener('input', () => {
      const duration = videoPlayer.duration;
      const value = videoProgress.value;

      videoPlayer.currentTime = (value * duration) / 100;
   });

   // Видео на полный экран
   videoFullScreen.addEventListener('click', () => {
      videoPlayer.requestFullscreen();
   });

   // Регулировка громкости
   videoVolume.addEventListener('input', () => {
      videoPlayer.volume = videoVolume.value / 100;
   })

   // Нажатие клавиши
   document.body.addEventListener('keydown', spacePlay);

};