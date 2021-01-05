'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollingDown from './modules/scrollingDown';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImages from './modules/changeImages';
import validation from './modules/validation';
import maskPhone from './modules/maskPhone';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
// таймер
countTimer('05 Jan 2021');
// меню
toggleMenu();
// pop-up
togglePopUp();
// scroll
scrollingDown();
// табы
tabs();
// слайдер
slider();
// наведение на картинки
changeImages();
// валидация
validation();
//маска
maskPhone('.form-phone', '+_ (___) ___-__-__');
// калькулятор
calc(100);
// send-ajax-form
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