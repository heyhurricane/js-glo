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

  };
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
  
  // валидация

  const validation = () => {

    const inputs = document.querySelectorAll('input.calc-item');

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^\d]/,'');
      });
    });
    
    const phoneInputs = document.querySelectorAll('.form-phone');
    phoneInputs.forEach((phoneInput) => {
      phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^\d\+]/,'');
      });
    });

    const nameInputs = document.querySelectorAll('[name="user_name"]');
    nameInputs.forEach((nameInput) => {
      nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^а-яА-Я\s]/,'');
      });
    });


    const messageInput = document.querySelector('[name="user_message"]');
    messageInput.addEventListener('input', () => {
        messageInput.value = messageInput.value.replace(/[^а-яА-Я\s\W\d]/,'');
      });
  };

  validation();

  const debounce = (f, t) => {
    return function (args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= t)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => f(args), t);
    };
  };

  let animateTotal = false;
  let timer;

    // АНИМАЦИЯ ЦИФР
  const animatedTotal = (obj, start, end) => {
    if (start === end) { return;}
    let count2 = start;
    const stepTime = 1;
    animateTotal = true;
    const step = end - start;
    timer = setInterval(function() {
      if (end.toString().length >= 5) {
        if (count2 < (end - (end % 1000))) {
          count2 += 1000;
        }
        else {
          if (count2 < (end - (end % 100))) {
            count2 += 100;
          }
          else { count2 += 10; }
        }
      }
      else {
        count2 += 10;
      }    
      if (count2 >= end) {
        animateTotal = false;
        clearInterval(timer);
        obj.textContent = end;
      }
      else { obj.textContent = count2; }
    }, stepTime);
  };   

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
      if (animateTotal) {
        clearInterval(timer);
        totalValue.textContent = 0;
      }
      animatedTotal(totalValue, 0, total);
     
      
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

  // send-ajax-form

  const sendForm = () => {
    const errorMessage ='Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

    const forms = document.querySelectorAll('[name="user_form"]');


    const statusMessage = document.createElement('div');
    
    statusMessage.style.cssText = 'font-size: 2rem;';

    const postData = (body/*, outputData, errorData*/) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve();
            // outputData();
          } else {
            reject();
            // errorData(request.status);
          }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.send(JSON.stringify(body));
      });
    };

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.getAttribute('id') === 'form3') { 
          statusMessage.style.color = '#FFF';
        }
        statusMessage.textContent = '';
        const inputs = form.querySelectorAll('input');
        let count = 0;
        inputs.forEach((input) => {
          const mistake = document.createElement('div');
          mistake.classList.add('mistake');
          // console.log(input.parentNode.childNodes);
          if (input.parentNode.childNodes.length === 4) { input.parentNode.childNodes[3].remove(); }
          mistake.style.cssText = 'font-size: 1rem; color: red;';
          if (form.getAttribute('id') === 'form1') { 
            mistake.style.cssText += 'margin-top: -2rem;';
          }
          if ((input.classList.contains('form-name') || input.classList.contains('top-form')) && 
          (input.value.length < 2 || input.value.length > 50)) {
            mistake.textContent = 'Имя должно быть от 2 до 50 символов';
            input.parentNode.append(mistake);
            count++;
          }
          if (input.classList.contains('form-phone') && input.value.length < 11) {
            mistake.textContent = 'Номер должен содержать 11 символов';
            input.parentNode.append(mistake);
            count++;
          }
          if (input.classList.contains('form-email') && !(input.value.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/))) {
            mistake.textContent = 'Введите в формте: name@domain.com';
            input.parentNode.append(mistake);
            count++;
          }
        });
        if (count === 0) {
          statusMessage.classList.add('preloader__row');
          const messageItem = document.createElement('div');
          messageItem.classList.add('preloader__item');
          statusMessage.appendChild(messageItem);
          statusMessage.appendChild(messageItem);
          statusMessage.classList.add('loaded');
          form.append(statusMessage);

          const formData = new FormData(form);
          let body = {};
        
          formData.forEach((val, key) => {
            body[key] = val;
          });
          
          postData(body)
            .then(() => {
              statusMessage.classList.remove('preloader__row');
              statusMessage.classList.remove('loaded');
              statusMessage.textContent = successMessage;
              inputs.forEach((input) => {
                input.value = '';
              });
            })
            .catch((error) => { 
              statusMessage.classList.remove('preloader__row');
              statusMessage.classList.remove('loaded');
              statusMessage.textContent = errorMessage;
              console.error(error);
            });
        }

      });
    });

  };

  sendForm();

  /*
  const valid = new Validator({
    selector: '#form1',
    pattern: {},
    method: {
      'phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'email': [
        ['notEmpty'],
        ['pattern', 'email']
      ]
    }
  });

  valid.init();*/

});