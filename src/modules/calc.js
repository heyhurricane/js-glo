'use strict';

const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');
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
    if (target.value === '') {
      const totalValue = document.getElementById('total');
      totalValue.textContent = 0;
    }
    if (target.matches('.calc-type') || target.matches('.calc-square') ||
    target.matches('.calc-day') || target.matches('.calc-count')) {
      countSum();
    }

  });
};

export default calc;