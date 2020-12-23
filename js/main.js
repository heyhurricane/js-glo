window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  
  // таймер
  const countTimer = (deadline) => {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        idInterval;

    const addZero = (num) => {
      if (num.length === 1) {
        num = '0' + num;
      }
      return num;
    };

    const getTimeRemaining = () => {
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
    };

    const updateClock = () => {
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
  countTimer('23 Dec 2020');

  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li>a');   
    let isActive = false;       

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
      isActive = !isActive;
    };

    document.body.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.menu');
      if (target) {
         handlerMenu();
      }
      else {
        target = event.target;
        target = target.closest('.active-menu'); 
        if (!target && isActive) {
          handlerMenu();
        }
        else {
          target = event.target;
          menuItems.forEach((elem) => {
            if (target.classList.contains('close-btn') || elem === target) {
              handlerMenu();
            }
          });
        }
      }
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

  // слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
    btn = document.querySelectorAll('.portfolio-btn'),
    portfolioDots = document.querySelector('.portfolio-dots'),
    slider = document.querySelector('.portfolio-content');

    for (let i = 0; i < slide.length; i++) {
      const li = document.createElement('li');
      li.classList.add('dot');
      portfolioDots.append(li);
    }

    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');

    let currentSlide = 0,
    interval;

    const prevSlide = (elem, index, strClass) => { 
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass)  => { 
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide>=slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      }
      else if (target.matches('#arrow-left')) {
        currentSlide--;
      }
      else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    startSlide(1500);

    slider.addEventListener('mouseover', (event) => {
      let target = event.target;

      if (target.matches('.portfolio-btn, .dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      let target = event.target;

      if (target.matches('.portfolio-btn, .dot')) {
        startSlide(1500);
      }
    });
  };

  slider();

  // наведение на картинки

  const images = document.querySelectorAll('.command__photo');
  images.forEach((elem) => {
    elem.addEventListener('mouseenter', (event) => {
      const oldImage = event.target.src;
      event.target.src = event.target.dataset.img;
      event.target.dataset.img = oldImage;
    });
     elem.addEventListener('mouseleave', (event) => {
      const newImage = event.target.src;
      event.target.src = event.target.dataset.img;
      event.target.dataset.img = newImage;
    });
  });
  
  // ввод в калькуляторе только цифр

  const inputs = document.querySelectorAll('input.calc-item');

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^\d]/,'');
    });
  });

  // калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcCount = document.querySelector('.calc-count'),
          calcDay = document.querySelector('.calc-day'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
      countValue = 1,
      dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value, 
            squareValue = +calcSquare.value;
      
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = Math.round(price * typeValue * squareValue * countValue * dayValue);
      }
      totalValue.textContent = total;
    };


    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if (target.matches('.calc-type') || target.matches('.calc-square') ||
      target.matches('.calc-day') || target.matches('.calc-count')) {
        countSum();
      }

    });
    


  };

  calc(100);

});