"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, 
    start = function() {
      do {
        money = prompt("Ваш месячный доход?");
      }
      while (!isNumber(money));
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 150000,
  period: 6,
  budget: money,
  budgetDay: 0, 
  budgetMonth: 0,
  expensesMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,

  asking: function() {
    if (confirm("Есть ли у Вас дополнительный источник заработка?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt("Какой у Вас дополнительный заработок?", "Таксую");
      }
      while (isNumber(itemIncome)); 
      do {
        cashIncome = prompt("Сколько в месяц Вы на этом зарабатываете?", 10000);
      }
      while (!isNumber(cashIncome));
      appData[itemIncome] = cashIncome;
    }

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    for (let i = 0; i < appData.addExpenses.length; i++)
    {
      let word = appData.addExpenses[i];
      let newWord = word[0].toUpperCase();
      for (let j = 1; j < word.length; j++) {
        newWord += word[j];
      }
      appData.addExpenses[i] = newWord;
    }
    console.log(appData.addExpenses.join(', '));

    appData.deposit = confirm("Есть ли у Вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let obj = {};
      do {
        obj.expenses1 = prompt("Введите обязательную статью расходов:");
      }
      while (isNumber(obj.expenses1));
      do {
        obj.expenses2 = prompt("Во сколько это обойдется?");
      }
      while (!isNumber(obj.expenses2));
      appData.expenses[i] = obj;
    }
  },

  getExpensesMonth: function() {  
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key].expenses2;
    }
    appData.expensesMonth = sum;
    console.log('Расходы за месяц: ', appData.expensesMonth);
  },

  // Накопления за месяц
  getBudget: function() {  
    appData.budgetMonth = appData.budget -  appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  // Период, за который будет достигнута цель
  getTargetMonth: function() {  
    const months =  Math.ceil(appData.mission / appData.budgetMonth);
    if (months >= 0) {
      console.log("Цель будет достигнута за " + months + " мес.");
    }
    else {
      console.log("Цель не будет достигнута");
    }
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

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log('Ключ: ' + key + ', Свойство: ' + appData[key]);
  }

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

// переменные

let btnCalc = document.getElementById('start');
let btnPlusIncome = document.getElementsByTagName('button')[0];
let btnPlusExpenses = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let inputIncomeItem = document.querySelectorAll('.additional_income-item');

let classValue = document.querySelectorAll('[class*="-value"]');

let budgetMonth = classValue[0];
let budgetDay = classValue[1];
let expensesMonth = classValue[2];
let incomeValue = classValue[3];
let expensesValue = classValue[4];
let incomePeriod = classValue[5];
let targetMonth = classValue[6];

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('input.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('input.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpenses = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let inputRange = document.querySelector('[type="range"]');

