//Проверка подстроки
const str = 'JavaScript is fun!';
console.log(str.includes('fun'));

//Выполнение условия при falsy значении
let username;
const greeting = 'Hello ';
const displayName = username || 'user';
console.log(greeting + displayName);

//Шаблонная строка
const firstName = 'John';
const lastName = 'Doe';
const occupation = 'software developer';
console.log(`Hello, my name is ${firstName} ${lastName}. I am ${occupation}.`)

//Сравнение Null и Undefined
let a;
let b = null;
console.log(a == b);//True так как занчения одинаковые. Пустое и неопределенное.
console.log(a === b);//False так как разный тип данных. Undefined и Object(исторический баг)

//Удивительный JS
console.log(1 + '1');//Выводит 11 так как первая 1 это число, а вторая 1 это строка