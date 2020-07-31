export const radioPlayerInit = () => {
   const radio = document.querySelector('.radio');
   const radioNavigation = document.querySelector('.radio-navigation');
   const radioCoverImg = document.querySelector('.radio-cover__img');
   const radioHeaderBig = document.querySelector('.radio-header__big');
   const radioItem = document.querySelectorAll('.radio-item');
   const radioStop = document.querySelector('.radio-stop');
   const radioVolumeRange = document.querySelector('.radio-volume__range');

   const audio = new Audio();
   audio.classList.add('player', 'radio-player');
   audio.type = 'audio/aac';
   audio.volume = 0.5;
   radioVolumeRange.value = audio.volume * 100;
   radio.appendChild(audio);

   radioStop.disabled = true;

   // Меняем иконку кнопки
   const changeIconPlay = () => {
      if (audio.paused) {
         radio.classList.remove('play');
         radioStop.classList.add('fa-play');
         radioStop.classList.remove('fa-stop');
      } else {
         radio.classList.add('play');
         radioStop.classList.remove('fa-play');
         radioStop.classList.add('fa-stop');
      }
   };

   // Играем музыку или останавливаем
   const togglePlay = () => {
      if (audio.paused) {
         audio.play();
      } else {
         audio.pause();
      }
      changeIconPlay();
   };

   // Играть/останавливать клавишей space
   const spacePlay = event => {
      // Если сейчас открыта вкладака радио и кнопка не заморожена
      if (radio.classList.contains('active') && !radioStop.disabled) {
         if (event.keyCode === 32) {
            togglePlay();
         }
      }
   };

   // Выделение текущей проигрывающей станции
   const selectItem = elem => {
      radioItem.forEach(item => item.classList.remove('select'));
      elem.classList.add('select');
   }

   radioNavigation.addEventListener('change', event => {
      const target = event.target;
      const parent = target.closest('.radio-item');
      selectItem(parent);
      const title = parent.querySelector('.radio-name').textContent;
      radioHeaderBig.textContent = title;
      const urlImg = parent.querySelector('.radio-img').src;
      radioCoverImg.src = urlImg;
      radioStop.disabled = false;
      audio.src = target.dataset.radioStantion;
      audio.play();
      changeIconPlay();
   })

   // При нажатии на кнопку плеера
   radioStop.addEventListener('click', () => {
      // Если на пазуе - играем
      if (audio.paused) {
         audio.play();
      } else {
         // Если играем - на паузку
         audio.pause();
      }
      // Меняем инонку плеера
      changeIconPlay();
   });

   // Изменение громкости плеера
   radioVolumeRange.addEventListener('input', () => {
      audio.volume = radioVolumeRange.value / 100;
   });

   audio.addEventListener('pause', changeIconPlay);
   audio.addEventListener('play', changeIconPlay);

   document.body.addEventListener('keydown', spacePlay);
};