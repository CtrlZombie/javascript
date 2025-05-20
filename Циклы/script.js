
//Вывод чисел от 1 до 10
for (let i = 1; i < 11; i++) {
  console.log(i);
}
//Сумма чисел от 1 до 100
let sum = 0;
let number = 1;
while (number <= 100) {
  sum += number;
  number++;
}
console.log(`Сумма чисел от 1 до 100 равна: ${sum}`);
//Поиск простых чисел
for (let num = 2; num <= 100; num++) {
  let isPrime = true;
  for (let a = 2; a < num; a++) {
    if (num % a === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) console.log(num + ' - Простое число');
}