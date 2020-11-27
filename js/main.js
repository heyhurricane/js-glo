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

  asking: function() {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let obj = {};
      obj.expenses1 = prompt("Введите обязательную статью расходов:");
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