'use strict';

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
      messageInput.value = messageInput.value.replace(/[^а-яА-Я\.\,\!\?\;\:\"\s\d]/,'');
    });
};

/*

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

  */

  export default validation;