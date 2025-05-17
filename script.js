
//Проверка является ли число положительным/отрицательным или нулем
const num = 29;
if (Number(num > 0)) {
  console.log('Положительное число')
} else if (Number(num < 0)) {
  console.log('Отрицательное число')
}
 else {
  console.log('Число является нулем')
}
//ИМТ
const weight = prompt('Введите ваш вес в кг');
const height = prompt('Введите ваш рост в см');
const smToMeters = height / 100;
const bmi = weight / (smToMeters * smToMeters);
if (bmi <= 16) {
console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Выраженный дефицит массы тела');
} else if (bmi < 18.5) {
  console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Недостаточная масса тела');
} else if (bmi < 25) {
  console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Норма');
} else if (bmi < 30) {
  console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Избыточная масса тела (предожирение)');
} else if (bmi < 35) {
  console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Ожирение 1 степени');
} else if (bmi < 40) {
  console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Ожирение 2 степени');
} else if (bmi >= 40) {  
  console.log('Ваш индекс массы тела -', bmi.toFixed(2), 'Ожирение 3 степени');
}
//Вывод названия месяца
const month = 9;
let monthName;
switch (month) {
  case 1:
    monthName = 'Январь';
    break;
  case 2:
    monthName = 'Февраль';
    break;
  case 3:
    monthName = 'Март';
    break;
  case 4:
    monthName = 'Апрель';
    break;
  case 5:
    monthName = 'Май';
    break;
  case 6:
    monthName = 'Июнь';
    break;
  case 7:
    monthName = 'Июль';
    break;
  case 8:
    monthName = 'Август';
    break;
  case 9:
    monthName = 'Сентябрь';
    break;
  case 10:
    monthName = 'Октябрь';
    break;
  case 11:
    monthName = 'Ноябрь';
    break;
  case 12:
    monthName = 'Декабрь';
    break;
  default:
    monthName = 'Неверный месяц';
}
console.log(monthName);
//Свое условие для операторов swith/case
const moviePlaceOnImdb = 9;
let movie;
switch (moviePlaceOnImdb) {
  case 1:
    movie = 'Интерстеллар';
    break;
  case 2:
    movie = 'Кретсный отец';
    break;
  case 3:
    movie = 'Крестный отец 2';
    break;
  case 4:
    movie = 'Славные парни';
    break;
  case 5:
    movie = 'Начало';
    break;
  case 6:
    movie = 'Таксист';
    break;
  case 7:
    movie = 'Отступники';
    break;
  case 8:
    movie = 'В порту';
    break;
  case 9:
    movie = 'Темный рыцарь';
    break;
  case 10:
    movie = 'Побег из шоушенка';
    break;
  default:
    movie = 'Неверное значение';
}
console.log(movie);