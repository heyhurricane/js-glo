window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  
  // таймер
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function addZero(hours, minutes, seconds) {
      if (hours.length === 1) {
        hours = '0' + hours;
      }
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return {hours, minutes, seconds};
    }

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = (Math.floor(timeRemaining % 60)).toString(),
          minutes = (Math.floor((timeRemaining / 60) % 60)).toString(),
          hours = (Math.floor((timeRemaining / 60) / 60)).toString();
      const time = addZero(hours, minutes, seconds);
      seconds = time.seconds;
      minutes = time.minutes;
      hours = time.hours;
      return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      if (timer.timeRemaining <= 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }

    setInterval(updateClock, 1000);

  }
  countTimer('16 Dec 2020');
});