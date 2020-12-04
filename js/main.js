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


let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  budget: 0,
  budgetDay: 0, 
  budgetMonth: 0,
  incomeMonth: 0,
  expensesMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,

  start: function() {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getIncome();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    console.log(appData);
    appData.showResult();
  },
  buttonCheck: function() {
    if (salaryAmount.value.trim() === '') {
      btnCalc.disabled = true;
    }
    else { 
      btnCalc.disabled = false;
    } 
  },
  changePeriod: function() {
    periodAmount.textContent = inputRange.value;
  },
  addExpensesBlock: function() {
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
  },
  addIncomeBlock: function() {
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
  },
  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('input.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('input.income-title').value;
      let cashIncome  = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income ) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpenses.value.toLowerCase().split(", ");
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
    for (let i = 0; i < appData.addExpenses.length; i++)
    {
      let word = appData.addExpenses[i];
      let newWord = word[0].toUpperCase();
      for (let j = 1; j < word.length; j++) {
        newWord += word[j];
      }
      appData.addExpenses[i] = newWord;
    }
  },
  getAddIncome: function(){
    inputIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
    for (let i = 0; i < appData.addIncome.length; i++)
    {
      let word = appData.addIncome[i];
      let newWord = word[0].toUpperCase();
      for (let j = 1; j < word.length; j++) {
        newWord += word[j];
      }
      appData.addIncome[i] = newWord;
    }
  },
  showResult: function() {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = Math.floor(appData.budgetDay);
    expensesMonth.value = appData.expensesMonth;
    expensesValue.value = appData.addExpenses.join(', ');
    incomeValue.value = appData.addIncome.join(', ');
    targetMonth.value = Math.ceil(appData.getTargetMonth());
    incomePeriod.value = appData.calcPeriod();
    inputRange.addEventListener('input', function(){
      incomePeriod.value = appData.calcPeriod();
    });
  },
  getExpensesMonth: function() {  
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    appData.expensesMonth = sum;
    console.log('Расходы за месяц: ', appData.expensesMonth);
  },

  // Накопления за месяц
  getBudget: function() {  
    appData.budgetMonth = appData.budget + appData.incomeMonth -  appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  // Период, за который будет достигнута цель
  getTargetMonth: function() {  
    return targetAmount.value / appData.budgetMonth;
  },

  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    }
    else {
      if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) { 
        console.log("У вас средний уровень дохода");
      }
      else 
      {
        console.log("К сожалению, у вас уровень дохода ниже среднего");
      }
    }
  },

  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", 10);
      }
      while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },

  calcPeriod: function() {
    return appData.budgetMonth * inputRange.value;
  }
};


appData.buttonCheck();
inputListener();
btnCalc.addEventListener('click', appData.start);
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click', appData.addIncomeBlock);
inputRange.addEventListener('input', appData.changePeriod);
// salaryAmount.addEventListener('input', appData.buttonCheck);
salaryAmount.addEventListener('input', () => btnCalc.disabled = salaryAmount.value.trim() === '');




