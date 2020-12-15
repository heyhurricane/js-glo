window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  
  // таймер
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = (Math.floor(timeRemaining % 60)).toString(),
          minutes = (Math.floor((timeRemaining / 60) % 60)).toString(),
          hours = (Math.floor((timeRemaining / 60) / 60)).toString();
      return {timeRemaining, hours, minutes, seconds};
    }
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.hours.length === 1) {
        timer.hours = '0' + timer.hours;
      }
      if (timer.minutes.length === 1) {
        timer.minutes = '0' + timer.minutes;
      }
      if (timer.seconds.length === 1) {
        timer.seconds = '0' + timer.seconds;
      }
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      if (timer.timeRemaining > 0) {
        setInterval(updateClock, 1000);
        // setTimeout(updateClock, 1000);
      }
      else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }

    updateClock();

  }
  countTimer('16 Dec 2020');


  //setInterval(countTimer, 1000, '31 Dec 2020');
});