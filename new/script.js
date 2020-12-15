window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const dateNow = new Date(),
        newYear = new Date('01 Jan 2021');
  let options = {
      weekday: 'long'
    };
  let daytime;
  const timeNow = dateNow.getHours();
  if (timeNow < 22) {
    daytime = 'ый вечер';
  }
  if (timeNow < 17) {
    daytime = 'ый день';
  }
  if (timeNow < 12) {
    daytime = 'ое утро';
  }
  if (timeNow < 5) {
    daytime = 'ой ночи';
  }

  document.body.innerHTML = 'Добр' + daytime + '!<br>';
  let day = Intl.DateTimeFormat('ru', options).format(dateNow);
  let newWord = day[0].toUpperCase();
  for (let i = 1; i < day.length; i++) {
    newWord += day[i];
  }
  day = newWord;
  document.body.innerHTML += 'Сегодня: ' + day + '<br>';
  options = {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
  let time = Intl.DateTimeFormat('en-US', options).format(dateNow);
  document.body.innerHTML += 'Текущее время: ' + time + '<br>';
  const days = Math.floor(((((newYear.getTime() - dateNow.getTime()) / 1000) / 60) / 60) / 24);
  document.body.innerHTML += 'До нового года осталось ' + days + ' дней. ' + '<br>';
});