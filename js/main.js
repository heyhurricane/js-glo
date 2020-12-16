window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  
  // таймер
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        idInterval;

    function addZero(num) {
      if (num.length === 1) {
        num = '0' + num;
      }
      return num;
    }

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = (Math.floor(timeRemaining % 60)).toString(),
          minutes = (Math.floor((timeRemaining / 60) % 60)).toString(),
          hours = (Math.floor((timeRemaining / 60) / 60)).toString();
      seconds = addZero(seconds);
      minutes = addZero(minutes);
      hours = addZero(hours);
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
        clearInterval(idInterval);
      }
    }
    updateClock();
    idInterval = setInterval(updateClock, 1000);

  }
  countTimer('17 Dec 2020');

  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li>a');          

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    menu.addEventListener('click', (event) => {
      let target = event.target;
      menuItems.forEach((elem) => {
        if (target.classList.contains('close-btn') || elem === target) {
          handlerMenu();
        }
      });
    });
  };

  toggleMenu();

  // pop-up

  const popupContent = document.querySelector('.popup-content');
  let animateInterval, count = 0;

  function popupAnimation() {
    animateInterval = requestAnimationFrame(popupAnimation);
    count += 3;
    const widthWindow = window.screen.width;
    let halfWindow = parseInt(popupContent.style.left);
    if (isNaN(halfWindow)) { halfWindow = 0; }
    const width = 0.38 * widthWindow;
    if (widthWindow < 768) {
      cancelAnimationFrame(animateInterval);
      popupContent.style.left = '30%';
    }
    else if (halfWindow < width) {
      popupContent.style.left = 2*count + 'px';
    }
    else {
      cancelAnimationFrame(animateInterval);
    }
  }

  const togglePopUp = () => {
    count = 0;
    // popupContent.style.left = count + 'px';
    const popup = document.querySelector('.popup'), 
          btnPopUp = document.querySelectorAll('.popup-btn');

    btnPopUp.forEach((elem) => {
      elem.addEventListener('click', () => {
        animateInterval = requestAnimationFrame(popupAnimation);
        popup.style.display = 'block';
      });
    });

    popup.addEventListener('click', (event) => {
       let target = event.target;
       if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
        count = 0;
        popupContent.style.left = count + 'px';
       }
       else {
        target = target.closest('.popup-content'); 
        if (!target) {
          popup.style.display = 'none';
          count = 0;
          popupContent.style.left = count + 'px';
        }
       }
    });
  };

  togglePopUp();

  // scroll

  const scrollLinks = document.querySelectorAll('a[href*="#"]')

  const scrollingDown = () => {
    scrollLinks.forEach((anchor) => {
      anchor.addEventListener('click', (elem) => {
        elem.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        if (blockID !== 'close') {
          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
  
  scrollingDown();

  // табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tabContent[i].classList.remove('d-none');
          tab[i].classList.add('active');
        }
        else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) { 
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

});