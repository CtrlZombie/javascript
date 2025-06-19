// 1. Изменение свойств при поверхностном копировании
const student = {
  name: 'Pupa',
  age: 30,
  addres: {
    city: 'Magnitogorsk',
    street: 'Pushkina',
    house: 'Kolotushkina'
  },
  sayHello: () => console.log('Hello Pupa!')
};

const studentCopy = Object.assign({}, student);
studentCopy.name = 'Lupa';
studentCopy.addres.city = 'Bishkek'

const studentCopy2 = {...student};
studentCopy2.addres.street = 'Kurchatova';
studentCopy2.addres.house = 6;

console.log(student); /*Свойства оригинала изменились так как вложенные объекты и массивы копируются по ссылке,
 а не по значению. соответственно меняя значения в копии - по ссылке меняются значения в оригинале*/

// 2. Вызов функции у копии объекта
const studentDeepCopy = JSON.parse(JSON.stringify(student));

studentDeepCopy.sayHello(); /*метод sayHello исчез из копии объекта, так как функции не могуть быть корректно
преобразованы в JSON*/

// 3. Разбор функции глубокого копирования
function deepCopy(obj) {
  // 1. Проверка на примитивные типы и null
  // Если объект является примитивом (строка, число, boolean, undefined, symbol) или null,
  // возвращаем его как есть, так как примитивы копируются по значению
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. Обработка массивов
  // Если объект является массивом, создаем новый массив
  if (Array.isArray(obj)) {
    // Создаем пустой массив-контейнер для копии
    const copy = [];
    
    // Рекурсивно копируем каждый элемент массива
    for (let i = 0; i < obj.length; i++) {
      // Для каждого элемента вызываем deepCopy рекурсивно,
      // чтобы скопировать вложенные объекты/массивы
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // 3. Обработка обычных объектов
  // Создаем пустой объект-контейнер для копии
  const copy = {};
  
  // Перебираем все ключи исходного объекта
  for (const key in obj) {
    // Проверяем, что свойство принадлежит самому объекту,
    // а не прототипу (исключает унаследованные свойства)
    if (obj.hasOwnProperty(key)) {
      // Рекурсивно копируем каждое свойство объекта,
      // включая вложенные объекты/массивы
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}