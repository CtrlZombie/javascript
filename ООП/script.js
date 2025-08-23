// 1.
class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    // Метод для вывода информации об автомобиле
    getInfo() {
        return `${this.brand} ${this.model}`;
    }

    // Метод для детальной информации
    displayInfo() {
        console.log(`Автомобиль: ${this.getInfo()}`);
    }
}

// Создаем несколько экземпляров класса
const car1 = new Car('Toyota', 'Camry');
const car2 = new Car('Honda', 'Civic');
const car3 = new Car('BMW', 'X5');

// Выводим информацию
car1.displayInfo(); // Автомобиль: Toyota Camry
car2.displayInfo(); // Автомобиль: Honda Civic
car3.displayInfo(); // Автомобиль: BMW X5

console.log(car1.getInfo()); // Toyota Camry
console.log(car2.getInfo()); // Honda Civic
console.log(car3.getInfo()); // BMW X5

// 2.
class ElectricCar extends Car {
    constructor(brand, model, batteryCapacity) {
        super(brand, model); // Вызов конструктора родительского класса
        this.batteryCapacity = batteryCapacity; // емкость батареи в кВт·ч
    }

    // Переопределяем метод getInfo
    getInfo() {
        return `${this.brand} ${this.model} (Электромобиль, ${this.batteryCapacity} кВт·ч)`;
    }

    // Добавляем новый метод
    getRange() {
        // Предположим, что 1 кВт·ч дает 6 км пробега
        const range = this.batteryCapacity * 6;
        return `Примерный запас хода: ${range} км`;
    }
}

// Создаем экземпляры ElectricCar
const electricCar1 = new ElectricCar('Tesla', 'Model S', 100);
const electricCar2 = new ElectricCar('Nissan', 'Leaf', 40);

// Выводим информацию
electricCar1.displayInfo(); // Автомобиль: Tesla Model S (Электромобиль, 100 кВт·ч)
electricCar2.displayInfo(); // Автомобиль: Nissan Leaf (Электромобиль, 40 кВт·ч)

console.log(electricCar1.getRange()); // Примерный запас хода: 600 км
console.log(electricCar2.getRange()); // Примерный запас хода: 240 км

// 3.
// Базовый класс Animal
class Animal {
    constructor(name) {
        this.name = name;
    }

    // Общий метод, который будет переопределен в дочерних классах
    makeSound() {
        return 'Некоторый звук';
    }

    // Метод, который будет использовать полиморфизм
    introduce() {
        console.log(`Я ${this.name} и я говорю: ${this.makeSound()}`);
    }
}

// Класс Dog, наследующий Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    // Переопределяем метод makeSound
    makeSound() {
        return 'Гав-гав!';
    }

    // Добавляем специфичный метод
    fetch() {
        return `${this.name} приносит палку!`;
    }
}

// Класс Cat, наследующий Animal
class Cat extends Animal {
    constructor(name, color) {
        super(name);
        this.color = color;
    }

    // Переопределяем метод makeSound
    makeSound() {
        return 'Мяу-мяу!';
    }

    // Добавляем специфичный метод
    purr() {
        return `${this.name} мурлычет...`;
    }
}

// Класс Bird, наследующий Animal
class Bird extends Animal {
    constructor(name, canFly) {
        super(name);
        this.canFly = canFly;
    }

    // Переопределяем метод makeSound
    makeSound() {
        return 'Чик-чирик!';
    }

    // Добавляем специфичный метод
    fly() {
        return this.canFly ? 
            `${this.name} летит!` : 
            `${this.name} не умеет летать`;
    }
}

// Демонстрация полиморфизма
const animals = [
    new Dog('Барсик', 'Лабрадор'),
    new Cat('Мурка', 'рыжий'),
    new Bird('Кеша', true),
    new Bird('Пингвин', false),
    new Animal('Неизвестное животное')
];

console.log('=== Демонстрация полиморфизма ===');

// Вызываем общий метод для всех объектов
animals.forEach(animal => {
    animal.introduce(); // Каждое животное использует свою версию makeSound
});

console.log('\n=== Специфичные методы ===');

// Работа с конкретными типами
const dog = new Dog('Рекс', 'Овчарка');
const cat = new Cat('Васька', 'черный');
const bird = new Bird('Гоша', true);

console.log(dog.fetch()); // Рекс приносит палку!
console.log(cat.purr());  // Васька мурлычет...
console.log(bird.fly());  // Гоша летит!

console.log('\n=== Проверка типов ===');

// Проверяем принадлежность к классам
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(cat instanceof Cat);    // true
console.log(cat instanceof Animal); // true

console.log('\n=== Использование общего интерфейса ===');

// Функция, работающая с любым животным через общий интерфейс
function animalConcert(animalsList) {
    console.log('=== Концерт животных ===');
    animalsList.forEach(animal => {
        console.log(`${animal.name}: ${animal.makeSound()}`);
    });
}

animalConcert(animals);