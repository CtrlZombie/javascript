const stringExample = 'Hello World'; //String: строки, которые представляют текстовые данные.
console.log(typeof stringExample);

const numberExample = 29; //Number: числовые значения.
console.log(typeof numberExample);

const isItBoolean = true; //Boolean: логические значения (true или false).
console.log(typeof isItBoolean);

let withoutValue; //Undefined: специальное значение, означающее, что переменная объявлена, но ей не присвоено значение.
console.log(typeof withoutValue);

const a = null; //null — это специальное значение, представляющее намеренное отсутствие значения.
console.log(typeof a);

let b = 10;
let c = a; // Копируем значение 10 в переменную b

//разница между хранением данных по ссылке и по значению более детально
b = 20; // Меняем только b
console.log(c); // 10 (c не изменилось)

let userName1 = {name: 'Kate'};
let userName2 = userName1; //Копируем ссылку на объект

userName1.name = 'ivan'; //Меняем данные по ссылке
console.log(userName2); //userName2 тоже изменился


