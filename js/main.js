"use strict"

let money = prompt("Ваш месячный доход?");

let income = "Фриланс";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов:");
let amount1 = prompt("Во сколько это обойдется?", "0");
let expenses2 = prompt("Введите обязательную статью расходов:");
let amount2 = prompt("Во сколько это обойдется?", "0");
let mission = 150000;
let period = 6;

let showTypeOf = function (data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(", "));

// Расходы за месяц

const getExpensesMonth = function() {  
  return (Number(amount1) + Number(amount2));
};

let sum = getExpensesMonth();
console.log('Расходы за месяц: ', sum);

// Накопления за месяц


const getAccumulatedMonth = function() {  
  return money - sum;
};

let accumulatedMonth = getAccumulatedMonth();
 
// Период, за который будет достигнута цель

const getTargetMonth = function() {  
  return Math.ceil(mission / accumulatedMonth);
};

let months = getTargetMonth();
console.log("Цель будет достигнута за " + months + " мес.");


let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день: ", Math.floor(budgetDay));

let getStatusIncome = function() {
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
