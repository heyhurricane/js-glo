'use strict';


const scrollingDown = () => {
  const scrollLinks = document.querySelectorAll('a[href*="#"]');
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

export default scrollingDown;