let money = 30000;
let income = "Фриланс";
let addExpenses = "Интернет, Комуналка, Бензин";
let deposit = false;
let mission = 150000;
let period = 6;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log("Период равен "+ period +" месяцев");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(", "));

let budgetDay = money / 30;
console.log(budgetDay);