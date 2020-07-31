export const musicPlayerInit = () => {
   const audio = document.querySelector('.audio');
   const audioImg = document.querySelector('.audio-img');
   const audioHeader = document.querySelector('.audio-header');
   const audioPlayer = document.querySelector('.audio-player');
   const audioNavigation = document.querySelector('.audio-navigation');
   const audioButtonPlay = document.querySelector('.audio-button__play');
   const audioProgress = document.querySelector('.audio-progress');
   const audioProgressTiming = document.querySelector('.audio-progress__timing');
   const audioTimePassed = document.querySelector('.audio-time__passed');
   const audioTimeTotal = document.querySelector('.audio-time__total');
   const musicVolume = document.querySelector('.music-volume__range');

   const playList = ['hello', 'flow', 'speed']; // Список песен

   let trackIndex = 0; // С какой песни стартуем

   // Делаем красивый вывод времени проигрывания песни
   const addZero = n => n < 10 ? '0' + n : n;

   const togglePlay = () => {
      const isPlayed = audioPlayer.paused;
      if (isPlayed) {
         audioPlayer.play();
      } else {
         audioPlayer.pause();
      }
   };
   
   // Загрузка песни
   const loadTrack = () => {
      const track = playList[trackIndex];
      audioHeader.textContent = track.toUpperCase();
      audioPlayer.src = `./audio/${track}.mp3`;
      audioImg.src = `./audio/${track}.jpg`;

      togglePlay();
   };

   // Меняем иконку проигрывателя
   const changeIconPlay = () => {
      if (audioPlayer.paused) {
         audio.classList.remove('play');
         audioButtonPlay.classList.add('fa-play');
         audioButtonPlay.classList.remove('fa-pause');
      } else {
         audio.classList.add('play');
         audioButtonPlay.classList.remove('fa-play');
         audioButtonPlay.classList.add('fa-pause');
      }
   };

   // Следующая песня
   const nextTrack = () => {
      if (trackIndex === playList.length - 1) {
         trackIndex = 0;
      } else {
         trackIndex++;
      }
      loadTrack();
   };

   // Предыдущая песня
   const prevTrack = () => {
      if (trackIndex !== 0) {
         trackIndex--;
      } else {
         trackIndex = playList.length - 1;
      }
      loadTrack();
   };

   // Играем/останавливаем плеер клавишей space
   const spacePlay = event => {
      if (audio.classList.contains('active')) {
         if (event.keyCode === 32) {
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
            togglePlay();
         }
      }
   };

   // Перемотка трека в плеере
   const rewindTrack = event => {
      if (audio.classList.contains('active')) {
         // Код кнопки
         const code = event.keyCode;
         let step = 5; // Шаг перемотки
         // Мотаем вперед стрелочкой вправо
         if (code === 39) audioPlayer.currentTime += step;
         // Мотаем назад стрелочкой влево
         else if (code === 37) audioPlayer.currentTime -= step;
      }
   };

   // Изменение громкости стрелочками вверх и вниз
   const changeVolume = event => {
      if (audio.classList.contains('active')) {
         // Код кнопки
         const code = event.keyCode;
         let step = 5; // Шаг изменения громкости
         let val = parseInt(musicVolume.value); // Значение громкости бегунка
         // Увеличиваем громкость стрелочкой вверх
         if (code === 38) val += step;
         // Уменьшаем громкость стрелочкой вниз
         else if (code === 40) val -= step;

         musicVolume.value = val; // Присватваем бегунку значение громкости
         audioPlayer.volume = musicVolume.value / 100; // Присваиваем значение громкости плееру
      }
   };

   audioNavigation.addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains('audio-button__play')){
         audio.classList.toggle('play');
         audioButtonPlay.classList.toggle('fa-play');
         audioButtonPlay.classList.toggle('fa-pause');
         
         if (audioPlayer.paused) {
            audioPlayer.play();
         } else {
            audioPlayer.pause();
         }

         const track = playList[trackIndex];
         audioHeader.textContent = track.toUpperCase();
      }

      // Предыдущая песня
      if (target.classList.contains('audio-button__prev')){
         prevTrack();
      }

      // Следующая песня
      if (target.classList.contains('audio-button__next')){
         nextTrack();
      }

   });

   audioPlayer.addEventListener('ended', () => {
      nextTrack();
      audioPlayer.play();
   });

   audioPlayer.addEventListener('timeupdate', () => {
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      const progress = (currentTime / duration) * 100;

      audioProgressTiming.style.width = progress + '%';

      const minutesPassed = Math.floor(currentTime / 60) || '0';
      const secondsPassed = Math.floor(currentTime % 60) || '0';

      const minutesTotal = Math.floor(duration / 60) || '0';
      const secondsTotal = Math.floor(duration % 60) || '0';
      
      audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
      audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

      audioProgress.addEventListener('click', event => {
         const x = event.offsetX;
         const allWidth = audioProgress.clientWidth;
         const progress = (x / allWidth) * audioPlayer.duration;
         audioPlayer.currentTime = progress;
      });

      // Всплывающая подсказка
      audioProgress.addEventListener('mousemove', event => {
         const x = event.offsetX;
         const allWidth = audioProgress.clientWidth;
         const progress = (x / allWidth) * audioPlayer.duration;
         const minutes = Math.floor(progress / 60) || '0';
         const seconds = Math.floor(progress % 60) || '0';
         audioProgress.setAttribute('title', `${addZero(minutes)}:${addZero(seconds)}`);
      });

      // Регулирование громкости
      musicVolume.addEventListener('input', () => {
         audioPlayer.volume = musicVolume.value / 100;
      })
      
   });

   audioPlayer.addEventListener('play', changeIconPlay);
   audioPlayer.addEventListener('pause', changeIconPlay);

   document.body.addEventListener('keydown', spacePlay);
   // Перемотка трека
   document.body.addEventListener('keydown', rewindTrack);
   // Меняем громкость стрелочками
   document.body.addEventListener('keydown', changeVolume);

};