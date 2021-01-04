'use strict';


  const changeImages = () => {
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
    
  };

export default changeImages;