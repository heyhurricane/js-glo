'use strict';


const sendForm = () => {
  const errorMessage ='Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

  const forms = document.querySelectorAll('[name="user_form"]');
  const popup = document.querySelector('.popup');
  

  const statusMessage = document.createElement('div');
  
  statusMessage.style.cssText = 'font-size: 2rem;';

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    /* return new Promise((resolve, reject) => {
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
    });*/
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
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Status network isn't 200");
            }
            statusMessage.classList.remove('preloader__row');
            statusMessage.classList.remove('loaded');
            statusMessage.textContent = successMessage;
            inputs.forEach((input) => {
              input.value = '';
            });
            setTimeout(() => {
              statusMessage.textContent = '';
              if (form.getAttribute('id') === 'form3') {
                popup.style.display = 'none';
                // const popupContent = document.querySelector('.popup-content');
                // popupContent.style.left = 0 +'px';
              }
            }, 4000);
          })
          .catch((error) => { 
            statusMessage.classList.remove('preloader__row');
            statusMessage.classList.remove('loaded');
            statusMessage.textContent = errorMessage;
            console.error(error);
            setTimeout(() => {
              statusMessage.textContent = '';
            }, 4000);
          });
      }

    });
  });

};

export default sendForm;