"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// переменные
let btnCalc = document.querySelector('#start');
let btnPlusIncome = document.querySelector('.income_add');
console.log('btnPlusIncome: ', btnPlusIncome);
let btnPlusExpenses = document.querySelector('.expenses_add');
console.log('btnPlusExpenses: ', btnPlusExpenses);
let checkBox = document.querySelector('#deposit-check');
let inputIncomeItem = document.querySelectorAll('.additional_income-item');

let classValue = document.querySelectorAll('[class*="-value"]');

let budgetMonth = classValue[0],
budgetDay = classValue[1],
expensesMonth = classValue[2],
incomeValue = classValue[3],
expensesValue = classValue[4],
incomePeriod = classValue[5],
targetMonth = classValue[6];

let data = document.querySelector('.data'),
leftInputs = data.querySelectorAll('input[type=text]'),
btnCancel = document.querySelector('#cancel');

let salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('input.income-title'),
// let incomeAmount = document.querySelector('.income-amount');
incomeItems = document.querySelectorAll('.income-items'),
expensesTitle = document.querySelector('input.expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpenses = document.querySelector('.additional_expenses-item'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
inputRange = document.querySelector('[type="range"]'),
periodAmount = document.querySelector('.period-amount'),
inputsPlaceholder =  document.querySelectorAll('[placeholder="Наименование"]'),
inputsPlaceholderSum =  document.querySelectorAll('[placeholder="Сумма"]');


// отслеживание ввода
function inputListener() {
  inputsPlaceholder.forEach(function(item){
        item.addEventListener('input', ()=> {
          item.value = item.value.replace(/[^а-яА-Я\s\W]/,'');
      });
  });
  inputsPlaceholderSum.forEach(function(item){
        item.addEventListener('input', ()=> {
          item.value = item.value.replace(/[^\d]/,'');
      });
  });
}

const AppData = function(){
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
};

AppData.prototype.buttonCheck = function() {
  if (salaryAmount.value.trim() === '') {
    btnCalc.disabled = true;
  }
  else { 
    btnCalc.disabled = false;
  } 
};

AppData.prototype.start = function() {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getExpensesMonth();
  this.getIncome();
  this.getBudget();
  this.getAddExpenses();
  this.getAddIncome();
  console.log(this);
  this.showResult();
};

AppData.prototype.reset = function() {
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
  leftInputs = data.querySelectorAll('input[type=text]');
  leftInputs.forEach(function(item){
    item.value='';
  });
  classValue.forEach(function(item){
    item.value='';
  });
  inputRange.value = '1';
  periodAmount.textContent = '1';
  this.buttonCheck();
  };
AppData.prototype.buttonCheck = function() {
  if (salaryAmount.value.trim() === '') {
    btnCalc.disabled = true;
  }
  else { 
    btnCalc.disabled = false;
  } 
};
AppData.prototype.changePeriod = function() {
  periodAmount.textContent = inputRange.value;
},
AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  let cloneInputs = cloneExpensesItem.querySelectorAll('input');
  cloneInputs.forEach(function(item){
    item.value='';
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    btnPlusExpenses.style.display = 'none';
  }
  inputsPlaceholder =  document.querySelectorAll('[placeholder="Наименование"]');
  inputsPlaceholderSum =  document.querySelectorAll('[placeholder="Сумма"]');
  inputListener();
};
AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  let cloneInputs = cloneIncomeItem.querySelectorAll('input');
  cloneInputs.forEach(function(item){
    item.value='';
  });
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    btnPlusIncome.style.display = 'none';
  }
  inputsPlaceholder =  document.querySelectorAll('[placeholder="Наименование"]');
  inputsPlaceholderSum =  document.querySelectorAll('[placeholder="Сумма"]');
  inputListener();
};
AppData.prototype.resetBlocks = function() {
  if (expensesItems.length > 1) {
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
  }
  btnPlusExpenses.style.display = 'block';

  if (incomeItems.length > 1) {
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
  }
  btnPlusIncome.style.display = 'block';
};
AppData.prototype.getExpenses = function() {
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('input.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
};
AppData.prototype.getIncome = function() {
  incomeItems.forEach(function(item){
    let itemIncome = item.querySelector('input.income-title').value;
    let cashIncome  = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  }, this);
  for (let key in this.income ) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpenses.value.toLowerCase().split(", ");
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
  for (let i = 0; i < this.addExpenses.length; i++)
  {
    let word = this.addExpenses[i];
    let newWord = word[0].toUpperCase();
    for (let j = 1; j < word.length; j++) {
      newWord += word[j];
    }
    this.addExpenses[i] = newWord;
  }
};
AppData.prototype.getAddIncome = function(){
  inputIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
  for (let i = 0; i < this.addIncome.length; i++)
  {
    let word = this.addIncome[i];
    let newWord = word[0].toUpperCase();
    for (let j = 1; j < word.length; j++) {
      newWord += word[j];
    }
    this.addIncome[i] = newWord;
  }
};
AppData.prototype.showResult = function() {
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
};
AppData.prototype.getExpensesMonth = function() {  
  let sum = 0;
  for (let key in this.expenses) {
    sum += +this.expenses[key];
  }
  this.expensesMonth = sum;
  console.log('Расходы за месяц: ', this.expensesMonth);
};

// Накопления за месяц
AppData.prototype.getBudget = function() {  
  this.budgetMonth = this.budget + this.incomeMonth -  this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};

// Период, за который будет достигнута цель
AppData.prototype.getTargetMonth = function() {  
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function() {
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
};

AppData.prototype.getInfoDeposit = function() {
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
};

AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * inputRange.value;
};

AppData.prototype.eventListners = function() {
  const _this = this;

  btnCalc.addEventListener('click', function(){
    _this.start();
    leftInputs = data.querySelectorAll('input[type=text]');
    leftInputs.forEach(function(item){
    item.disabled = true;
    });
    this.style.display = 'none';
    btnCancel.style.display = 'block';
  });

  btnCancel.addEventListener('click', function(){
    _this.reset();
    leftInputs = data.querySelectorAll('input[type=text]');
    leftInputs.forEach(function(item){
    item.disabled = false;
    });
    this.style.display = 'none';
    btnCalc.style.display = 'block';
  });

btnPlusExpenses.addEventListener('click', _this.addExpensesBlock);
btnPlusIncome.addEventListener('click', _this.addIncomeBlock);
inputRange.addEventListener('input', _this.changePeriod);
salaryAmount.addEventListener('input', () => btnCalc.disabled = salaryAmount.value.trim() === '');
};

const appData = new AppData();
appData.buttonCheck();
inputListener();
appData.eventListners();







