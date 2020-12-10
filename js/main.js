"use strict";

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// переменные
const btnCalc = document.querySelector('#start'),
btnPlusIncome = document.querySelector('.income_add'),
btnPlusExpenses = document.querySelector('.expenses_add'),
inputIncomeItem = document.querySelectorAll('.additional_income-item'),
classValue = document.querySelectorAll('[class*="-value"]'),
data = document.querySelector('.data'),
btnCancel = document.querySelector('#cancel'),
checkBox = document.querySelector('#deposit-check');

const budgetMonth = classValue[0],
budgetDay = classValue[1],
expensesMonth = classValue[2],
incomeValue = classValue[3],
expensesValue = classValue[4],
incomePeriod = classValue[5],
targetMonth = classValue[6];

const salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('input.income-title'),
expensesTitle = document.querySelector('input.expenses-title'),
additionalExpenses = document.querySelector('.additional_expenses-item'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
inputRange = document.querySelector('[type="range"]'),
periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'), 
leftInputs = data.querySelectorAll('input[type=text]'),
inputsPlaceholder =  document.querySelectorAll('[placeholder="Наименование"]'),
inputsPlaceholderSum =  document.querySelectorAll('[placeholder="Сумма"]'),
incomeItems = document.querySelectorAll('.income-items');


// отслеживание ввода
function inputListener() {
  inputsPlaceholder.forEach((item) => {
        item.addEventListener('input', ()=> {
          item.value = item.value.replace(/[^а-яА-Я\s\W]/,'');
      });
  });
  inputsPlaceholderSum.forEach((item) => {
        item.addEventListener('input', ()=> {
          item.value = item.value.replace(/[^\d]/,'');
      });
  });
}

class AppData {
  constructor(){
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }  

  buttonCheck() {
    if (salaryAmount.value.trim() === '') {
      btnCalc.disabled = true;
    }
    else { 
      btnCalc.disabled = false;
    } 
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getBudget();
    this.getAdd();
    this.showResult();
  }

  reset() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budget = 0;
    this.budgetDay = 0; 
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.resetBlocks();
    expensesItems = document.querySelectorAll('.expenses-items');
    leftInputs = data.querySelectorAll('input[type=text]');
    leftInputs.forEach((item) => {
      item.value='';
    });
    classValue.forEach((item) => {
      item.value='';
    });
    inputRange.value = '1';
    periodAmount.textContent = '1';
    this.buttonCheck();
  }

  changePeriod() {
    periodAmount.textContent = inputRange.value;
  }

  addBlock(btn) {
    const count = item => {
      let cloneItem = item[0].cloneNode(true);
      let cloneInputs = cloneItem.querySelectorAll('input');
      cloneInputs.forEach((e) => {
        e.value='';
      });
      const one = item[0];
      const startStr = one.className.split('-')[0];
      if (item === incomeItems) {
        item[0].parentNode.insertBefore(cloneItem, btnPlusIncome);
      }
      else {
        item[0].parentNode.insertBefore(cloneItem, btnPlusExpenses);
      }
      item = document.querySelectorAll(`.${startStr}-items`);
      if (item.length === 3) {
        if (startStr === 'income') {
          btnPlusIncome.style.display = 'none';
        }
        else {
          btnPlusExpenses.style.display = 'none';
        }
      }
      inputsPlaceholder =  document.querySelectorAll('[placeholder="Наименование"]');
      inputsPlaceholderSum =  document.querySelectorAll('[placeholder="Сумма"]');
      inputListener();
    };
    if (btn.classList.contains('expenses_add')) {
      count(expensesItems);
    }
    else {
      count(incomeItems);
    }
  }
  resetBlocks() {
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');
    if (expensesItems.length > 1) {
      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
      }
    }
    btnPlusExpenses.style.display = 'block';
    expensesItems = document.querySelectorAll('.expenses-items');
    if (incomeItems.length > 1) {
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[0].parentNode.removeChild(incomeItems[i]);
      }
    }
    btnPlusIncome.style.display = 'block';
    incomeItems = document.querySelectorAll('.income-items');
  }

  getExpInc() {
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`input.${startStr}-title`).value;
      const itemAmount  = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    incomeItems.forEach(count);
    expensesItems.forEach(count);
    for (let key in this.income ) {
      this.incomeMonth += +this.income[key];
    }
  }
  
  getAdd() {
    let addExpenses = additionalExpenses.value.toLowerCase().split(", ");
    let startStr ='addExpenses';
    const count = item => {
      if (startStr === 'addExpenses') { item = item.trim();}
      if (startStr === 'addIncome') { item = item.value.trim();}
      if (item !== '') {
        this[startStr].push(item);
      }
    };
    const format = () => {
      for (let i = 0; i < this[startStr].length; i++)
      {
        let word = this[startStr][i];
        let newWord = word[0].toUpperCase();
        for (let j = 1; j < word.length; j++) {
          newWord += word[j];
        }
        this[startStr][i] = newWord;
      }
    };
    addExpenses.forEach(count);
    format();
    startStr='addIncome';
    inputIncomeItem.forEach(count);
    format();
  }

  showResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = Math.floor(this.budgetDay);
    expensesMonth.value = this.expensesMonth;
    expensesValue.value = this.addExpenses.join(', ');
    incomeValue.value = this.addIncome.join(', ');
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcPeriod();
    const _data = this;
    inputRange.addEventListener('input', function(){
      incomePeriod.value = _data.calcPeriod();
    });
  }

  getExpensesMonth() {  
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    console.log('Расходы за месяц: ', this.expensesMonth);
  }
  
  // Накопления за месяц
  getBudget() {  
    this.budgetMonth = this.budget + this.incomeMonth -  this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }

  // Период, за который будет достигнута цель
  getTargetMonth() {  
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    }
    else {
      if ((this.budgetDay >= 600) && (this.budgetDay < 1200)) { 
        console.log("У вас средний уровень дохода");
      }
      else 
      {
        console.log("К сожалению, у вас уровень дохода ниже среднего");
      }
    }
  }
  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt("Какой годовой процент?", 10);
      }
      while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      }
      while (!isNumber(this.moneyDeposit));
    }
  }

  calcPeriod() {
    return this.budgetMonth * inputRange.value;
  }

  eventListners() {
    const _this = this;

    btnCalc.addEventListener('click', () => {
      this.start();
      leftInputs = data.querySelectorAll('input[type=text]');
      leftInputs.forEach((item) => {
      item.disabled = true;
      });
      btnCalc.style.display = 'none';
      btnCancel.style.display = 'block';
    });

    btnCancel.addEventListener('click', () => {
      this.reset();
      leftInputs = data.querySelectorAll('input[type=text]');
      leftInputs.forEach((item) => {
      item.disabled = false;
      });
      btnCancel.style.display = 'none';
      btnCalc.style.display = 'block';
    });

    btnPlusExpenses.addEventListener('click', () => {
      this.addBlock(btnPlusExpenses);
    });
    btnPlusIncome.addEventListener('click', () => { 
      this.addBlock(btnPlusIncome);
    });
    inputRange.addEventListener('input', _this.changePeriod);
    salaryAmount.addEventListener('input', () => btnCalc.disabled = salaryAmount.value.trim() === '');
  }
}


const appData = new AppData();
appData.buttonCheck();
inputListener();
appData.eventListners();







