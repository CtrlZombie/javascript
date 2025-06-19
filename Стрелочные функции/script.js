// 1. 
const applyMathOperation = (numbers, operation) => numbers.map(operation);
const doubled = applyMathOperation([12, 15, 29], x => x * 2);
console.log(doubled);

// 2.
const stanleyCupChampions2025 = {
  name: 'Florida Panthers',
  captain: 'Alexander Barkov',
  goalkeeper: 'Sergey Bobrovsky',

  showDelayedInfo() {
  setTimeout(() => {
    console.log(`Обладатель Кубка Стенли 2025: ${this.name}, Капитан: ${this.captain}, Вратарь: ${this.goalkeeper}`);
    }, 1000);
  }
};

stanleyCupChampions2025.showDelayedInfo();

// 3.
const applyFunctionToArray = (fn, array) => array.map(fn);
const multyply = x => x * x;

console.log(applyFunctionToArray(multyply, [12, 15, 29]));
