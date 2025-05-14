//Решение первого примера
const example1 = 2 * 2 + 2;
console.log(example1);

//Решение второго примера
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
const sin54 = Math.sin(degreesToRadians(54));
const cos16 = Math.cos(degreesToRadians(16));
const example2 = Math.pow(sin54 * cos16, 2);
console.log(example2.toFixed(3));

//Решение третьего примера
const examplePart1 = Math.sqrt(13.2 * 71.9);
const examplePart2 = 16 * examplePart1;
const examplePart3 = 2.4 * 7 ** 4;
const examplePart4 = examplePart2 / examplePart3;
const examplePart5 = 3 ** Math.sqrt(49);
const leftSideOfExample = examplePart4 + examplePart5;
const answer = leftSideOfExample * 2 ** 7;

//Проверка чисел на четность/нечетность
console.log(Math.round(answer));
const numbers = {
  a: 12,
  b: 15,
  c: 29,
};
if (numbers.a % 2 === 0) {
  console.log(numbers.a + " - чётное");
} else {
  console.log(numbers.a + " - нечётное");
}
if (numbers.b % 2 === 0) {
  console.log(numbers.b + " - чётное");
} else {
  console.log(numbers.b + " - нечётное");
}
if (numbers.c % 2 === 0) {
  console.log(numbers.c + " - чётное");
} else {
  console.log(numbers.c + " - нечётное");
}
//Проверка переменной name
let name1
let name2 = "Ivan";
let name3 = null
let name4 = ''
const greetingName = (name1 ?? 'Guest').trim() || 'Guest';
const greetingName2 = (name2 ?? 'Guest').trim() || 'Guest';
const greetingName3 = (name3 ?? 'Guest').trim() || 'Guest';
const greetingName4 = (name4 ?? 'Guest').trim() || 'Guest';
console.log(`Hello, ${greetingName}!`);
console.log(`Hello, ${greetingName2}!`);
console.log(`Hello, ${greetingName3}!`);
console.log(`Hello, ${greetingName4}!`);

