// 1.
// Создаем объект
const person = {};

// Делаем все свойства неизменяемыми с помощью Object.defineProperty
Object.defineProperty(person, 'name', {
    value: 'Иван',
    writable: false,       // нельзя изменить значение
    enumerable: true,      // свойство будет перечисляемым
    configurable: false    // нельзя удалить или изменить дескриптор
});

Object.defineProperty(person, 'age', {
    value: 30,
    writable: false,
    enumerable: true,
    configurable: false
});

Object.defineProperty(person, 'city', {
    value: 'Москва',
    writable: false,
    enumerable: true,
    configurable: false
});

// Проверяем свойства
console.log('Исходные значения:');
console.log('name:', person.name);
console.log('age:', person.age);
console.log('city:', person.city);

// Пытаемся изменить значения
console.log('\nПопытка изменить значения:');

try {
    person.name = 'Петр';
    console.log('name изменен?:', person.name); // Осталось "Иван"
} catch (error) {
    console.log('Ошибка при изменении name:', error.message);
}

try {
    person.age = 25;
    console.log('age изменен?:', person.age); // Осталось 30
} catch (error) {
    console.log('Ошибка при изменении age:', error.message);
}

try {
    person.city = 'Санкт-Петербург';
    console.log('city изменен?:', person.city); // Осталось "Москва"
} catch (error) {
    console.log('Ошибка при изменении city:', error.message);
}

// Пытаемся удалить свойства
console.log('\nПопытка удалить свойства:');

try {
    delete person.name;
    console.log('name удален?:', 'name' in person); // true - свойство все еще существует
} catch (error) {
    console.log('Ошибка при удалении name:', error.message);
}

try {
    delete person.age;
    console.log('age удален?:', 'age' in person); // true
} catch (error) {
    console.log('Ошибка при удалении age:', error.message);
}

// Проверяем дескрипторы свойств
console.log('\nДескрипторы свойств:');
console.log('name descriptor:', Object.getOwnPropertyDescriptor(person, 'name'));
console.log('age descriptor:', Object.getOwnPropertyDescriptor(person, 'age'));
console.log('city descriptor:', Object.getOwnPropertyDescriptor(person, 'city'));

// Можно ли добавить новое свойство?
person.country = 'Россия'; // Это сработает, так как объект сам по себе не заморожен
console.log('\nНовое свойство country:', person.country);

// 2.
// Создаем объект
const car = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2022
};

// Добавляем неперечисляемое свойство
Object.defineProperty(car, 'vin', {
    value: 'JTDBR32E030000123',
    writable: false,
    enumerable: false,    // свойство НЕ будет перечисляемым
    configurable: false
});

// Добавляем еще одно неперечисляемое свойство (цену)
Object.defineProperty(car, 'price', {
    value: 2500000,
    writable: true,       // можно изменить цену
    enumerable: false,    // но не видно в циклах
    configurable: true    // можно удалить или изменить
});

// Проверяем все свойства объекта
console.log('Все свойства объекта car:');
console.log('brand:', car.brand);
console.log('model:', car.model);
console.log('year:', car.year);
console.log('vin:', car.vin);       // Доступно напрямую
console.log('price:', car.price);   // Доступно напрямую

// Проверяем перечисляемость в цикле for...in
console.log('\nЦикл for...in (только перечисляемые свойства):');
for (const key in car) {
    console.log(key + ':', car[key]);
}
// Выведет только: brand, model, year

// Проверяем Object.keys()
console.log('\nObject.keys() (только перечисляемые свойства):');
const keys = Object.keys(car);
console.log('Keys:', keys); // ['brand', 'model', 'year']

// Проверяем Object.values()
console.log('\nObject.values() (только перечисляемые свойства):');
const values = Object.values(car);
console.log('Values:', values); // ['Toyota', 'Camry', 2022]

// Проверяем Object.entries()
console.log('\nObject.entries() (только перечисляемые свойства):');
const entries = Object.entries(car);
console.log('Entries:', entries); // [['brand', 'Toyota'], ['model', 'Camry'], ['year', 2022]]

// Но все свойства доступны через другие методы
console.log('\nПроверка наличия всех свойств:');
console.log('hasOwnProperty vin:', car.hasOwnProperty('vin'));    // true
console.log('hasOwnProperty price:', car.hasOwnProperty('price')); // true

// Получаем все свойства (включая неперечисляемые)
console.log('\nObject.getOwnPropertyNames() (все свойства):');
const allProperties = Object.getOwnPropertyNames(car);
console.log('All properties:', allProperties); // ['brand', 'model', 'year', 'vin', 'price']

// Получаем дескрипторы всех свойств
console.log('\nДескрипторы всех свойств:');
allProperties.forEach(prop => {
    const descriptor = Object.getOwnPropertyDescriptor(car, prop);
    console.log(`${prop}:`, {
        value: descriptor.value,
        enumerable: descriptor.enumerable,
        writable: descriptor.writable,
        configurable: descriptor.configurable
    });
});

// Можем изменить неперечисляемое свойство price (т.к. writable: true)
car.price = 2600000;
console.log('\nНовая цена:', car.price); // 2600000

// Но не можем изменить vin (т.к. writable: false)
try {
    car.vin = 'NEWVIN123';
    console.log('VIN изменен?:', car.vin); // Остался прежним
} catch (error) {
    console.log('Ошибка при изменении VIN:', error.message);
}

// Можем удалить price (т.к. configurable: true)
delete car.price;
console.log('\nprice удален?:', 'price' in car); // false

// Но не можем удалить vin (т.к. configurable: false)
try {
    delete car.vin;
    console.log('vin удален?:', 'vin' in car); // true - все еще существует
} catch (error) {
    console.log('Ошибка при удалении VIN:', error.message);
}