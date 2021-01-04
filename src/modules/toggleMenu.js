'use strict';


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

export default toggleMenu;