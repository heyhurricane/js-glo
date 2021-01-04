'use strict';



const togglePopUp = () => {
  const popupContent = document.querySelector('.popup-content');
  let animateInterval, countPopUp = 0;
  const popup = document.querySelector('.popup');
  // countPopUp = 0;
  // popupContent.style.left = count + 'px';
  const btnPopUp = document.querySelectorAll('.popup-btn');

  const popupAnimation = () => {
    animateInterval = requestAnimationFrame(popupAnimation);
    countPopUp += 3;
    const widthWindow = window.screen.width;
    let halfWindow = parseInt(popupContent.style.left);
    if (isNaN(halfWindow)) { halfWindow = 0; }
    const width = 0.38 * widthWindow;
    if (widthWindow < 768) {
      cancelAnimationFrame(animateInterval);
      popupContent.style.left = '30%';
    }
    else if (halfWindow < width) {
      popupContent.style.left = 2*countPopUp + 'px';
    }
    else {
      cancelAnimationFrame(animateInterval);
    }
  };

  btnPopUp.forEach((elem) => {
    elem.addEventListener('click', () => {
      animateInterval = requestAnimationFrame(popupAnimation);
      popup.style.display = 'block';
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;
    const inputs = popup.querySelectorAll('input');
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
      countPopUp = 0;
      popupContent.style.left = countPopUp + 'px';
      inputs.forEach((el) => {
        el.value = '';
      });
    }
    else {
      target = target.closest('.popup-content'); 
      if (!target) {
        popup.style.display = 'none';
        countPopUp = 0;
        popupContent.style.left = countPopUp + 'px';
        inputs.forEach((el) => {
          el.value = '';
        });
      }
    }
  });
};

export default togglePopUp;