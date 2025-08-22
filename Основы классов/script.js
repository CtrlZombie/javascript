// 1.
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    // Метод для вывода краткой информации
    getInfo() {
        return `Книга: "${this.title}", автор: ${this.author}, ${this.pages} страниц`;
    }
}

// Пример использования
const book1 = new Book("Война и мир", "Лев Толстой", 1225);
const book2 = new Book("1984", "Джордж Оруэлл", 328);

console.log(book1.getInfo()); 
console.log(book2.getInfo()); 

// 2.
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // Метод для вывода информации о пользователе
    displayInfo() {
        console.log(`Пользователь: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log('---');
    }
}

// Создание экземпляров и вызов метода
const user1 = new User("Иван Иванов", "ivan@example.com");
const user2 = new User("Мария Петрова", "maria@example.com");
const user3 = new User("Алексей Сидоров", "alex@example.com");

user1.displayInfo();
user2.displayInfo();
user3.displayInfo();

// 3.
class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    // Геттер для площади
    get area() {
        return this._width * this._height;
    }

    // Геттер для периметра
    get perimeter() {
        return 2 * (this._width + this._height);
    }

    // Сеттер для высоты с проверкой
    set height(value) {
        if (value > 0) {
            this._height = value;
        } else {
            console.error("Ошибка: высота должна быть положительным числом");
        }
    }

    // Сеттер для ширины с проверкой
    set width(value) {
        if (value > 0) {
            this._width = value;
        } else {
            console.error("Ошибка: ширина должна быть положительным числом");
        }
    }

    // Геттеры для получения значений
    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }
}

// Пример использования
const rect = new Rectangle(10, 5);

console.log("Площадь:", rect.area); // 50
console.log("Периметр:", rect.perimeter); // 30

// Корректное изменение высоты
rect.height = 8;
console.log("Новая высота:", rect.height); // 8
console.log("Новая площадь:", rect.area); // 80
console.log("Новый периметр:", rect.perimeter); // 36

// Попытка установить некорректную высоту
rect.height = -5; // Ошибка: высота должна быть положительным числом
console.log("Высота осталась прежней:", rect.height); // 8

// Попытка установить нулевую ширину
rect.width = 0; // Ошибка: ширина должна быть положительным числом
console.log("Ширина осталась прежней:", rect.width); // 10