"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = "Фриланс";

// let amount1 = 

// let amount2 = prompt("Во сколько это обойдется?", "0");
let mission = 150000;
let period = 6;

let start = function() {
  do {
    money = prompt("Ваш месячный доход?");
  }
  while (!isNumber(money));
};

start();

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");

const showTypeOf = function (data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(", "));

// Расходы за месяц

let expenses = [];

let getExpensesMonth = function() {  
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses[i] = prompt("Введите обязательную статью расходов:");
    }
    else {
      expenses[i] = prompt("Введите обязательную статью расходов:");
    }
    let amount;
    do {
      amount = prompt("Во сколько это обойдется?");
    }
    while (!isNumber(amount));
    sum += +amount;
  }
  console.log('Расходы за месяц: ', sum);
  return sum;
};

const expensesAmount = getExpensesMonth();

// Накопления за месяц


const getAccumulatedMonth = function() {  
  return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();
 
// Период, за который будет достигнута цель

const getTargetMonth = function() {  
  return Math.ceil(mission / accumulatedMonth);
};

const months = getTargetMonth();

if (months >= 0) {
  console.log("Цель будет достигнута за " + months + " мес.");
}
else {
  console.log("Цель не будет достигнута");
}



const budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день: ", Math.floor(budgetDay));

const getStatusIncome = function() {
  if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
  }
  else {
    if ((budgetDay >= 600) && (budgetDay < 1200)) { 
      console.log("У вас средний уровень дохода");
    }
    else 
    {
      console.log("К сожалению, у вас уровень дохода ниже среднего");
    }
  }
};

getStatusIncome();
