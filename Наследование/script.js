// 1.
// Базовый класс Person
class Person {
    constructor(name) {
        this.name = name;
    }

    // Метод для представления
    introduce() {
        console.log(`Привет, меня зовут ${this.name}`);
    }
}

// Класс Student, наследующий от Person
class Student extends Person {
    constructor(name, course) {
        super(name); // Вызов конструктора родительского класса
        this.course = course;
    }

    // Переопределенный метод introduce
    introduce() {
        console.log(`Привет, меня зовут ${this.name}, и я учусь на ${this.course} курсе`);
    }
}

// Пример использования
const person = new Person("Иван");
person.introduce(); // Привет, меня зовут Иван

const student = new Student("Мария", 2);
student.introduce(); // Привет, меня зовут Мария, и я учусь на 2 курсе

// Исследование цепочки прототипов
console.log(Student.prototype); // Прототип Student
console.log(Student.prototype.__proto__); // Прототип Person
console.log(Student.prototype.__proto__.__proto__); // Object.prototype
console.log(Student.prototype.__proto__.__proto__.__proto__); // null

// Проверка наследования
console.log(student instanceof Student); // true
console.log(student instanceof Person); // true
console.log(student instanceof Object); // true

// 2.
// Класс Employee, наследующий от Person
class Employee extends Person {
    constructor(name, position) {
        super(name); // Вызов конструктора родительского класса
        this.position = position;
    }

    // Переопределенный метод introduce
    introduce() {
        console.log(`Привет, меня зовут ${this.name}, и я работаю на позиции ${this.position}`);
    }

    // Новый метод work
    work() {
        console.log(`Я работаю на позиции ${this.position}`);
    }
}

// Пример использования
const employee = new Employee("Алексей", "разработчик");
employee.introduce(); // Привет, меня зовут Алексей, и я работаю на позиции разработчик
employee.work(); // Я работаю на позиции разработчик

// Проверка цепочки прототипов
console.log(Employee.prototype); // Прототип Employee
console.log(Employee.prototype.__proto__); // Прототип Person
console.log(Employee.prototype.__proto__.__proto__); // Object.prototype

// Демонстрация полиморфизма
const people = [
    new Person("Ольга"),
    new Student("Дмитрий", 3),
    new Employee("Сергей", "менеджер")
];

people.forEach(person => person.introduce());

// 3.
// Базовый объект Vehicle
const Vehicle = {
    // Метод move
    move() {
        console.log(`${this.type || 'Транспорт'} движется`);
    },
    
    // Инициализатор (аналог конструктора)
    init(type) {
        this.type = type;
        return this;
    }
};

// Объект Car, наследующий от Vehicle через Object.create
const Car = Object.create(Vehicle, {
    // Добавляем новый метод drive
    drive: {
        value: function() {
            console.log(`${this.type} едет по дороге`);
        },
        writable: true,
        configurable: true,
        enumerable: true
    },
    
    // Можно добавить свойства через дескрипторы
    wheels: {
        value: 4,
        writable: true,
        enumerable: true
    }
});

// Создание экземпляров
const myVehicle = Object.create(Vehicle).init("Мотоцикл");
const myCar = Object.create(Car).init("Седан");

// Использование методов
myVehicle.move(); // Мотоцикл движется
myCar.move();     // Седан движется
myCar.drive();    // Седан едет по дороге

// Исследование цепочки прототипов
console.log(Object.getPrototypeOf(myCar) === Car); // true
console.log(Object.getPrototypeOf(Car) === Vehicle); // true
console.log(Object.getPrototypeOf(Vehicle) === Object.prototype); // true

// Проверка наличия методов
console.log('move' in myCar); // true (наследуется от Vehicle)
console.log('drive' in myCar); // true (собственный метод Car)
console.log(myCar.hasOwnProperty('drive')); // false (метод в прототипе)
console.log(myCar.hasOwnProperty('type')); // true (собственное свойство)

// Альтернативный способ создания с конструкторной функцией
function createCar(type, brand) {
    const car = Object.create(Car);
    car.type = type;
    car.brand = brand;
    return car;
}

const bmw = createCar("Седан", "BMW");
bmw.drive();
console.log(bmw.brand);