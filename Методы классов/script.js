// 1.
class Counter {
    // Приватное свойство count
    #count = 0;

    // Публичный метод для увеличения счетчика
    increment() {
        this.#count++;
        console.log('Счетчик увеличен:', this.#count);
    }

    // Публичный метод для уменьшения счетчика
    decrement() {
        if (this.#count > 0) {
            this.#count--;
            console.log('Счетчик уменьшен:', this.#count);
        } else {
            console.log('Счетчик уже на минимуме (0)');
        }
    }

    // Публичный метод для отображения значения
    display() {
        console.log('Текущее значение счетчика:', this.#count);
        return this.#count;
    }

    // Метод для сброса счетчика
    reset() {
        this.#count = 0;
        console.log('Счетчик сброшен до 0');
    }
}

// Пример использования
const counter = new Counter();
counter.display(); // Текущее значение счетчика: 0

counter.increment(); // Счетчик увеличен: 1
counter.increment(); // Счетчик увеличен: 2
counter.increment(); // Счетчик увеличен: 3

counter.decrement(); // Счетчик уменьшен: 2

counter.display(); // Текущее значение счетчика: 2

// Попытка доступа к приватному свойству (вызовет ошибку)
// console.log(counter.#count); // SyntaxError: Private field '#count' must be declared in an enclosing class

// 2.
class EmailValidator {
    // Статический метод для проверки email
    static isValid(email) {
        // Простая проверка на наличие символа @
        if (typeof email !== 'string') {
            return false;
        }
        
        const hasAtSymbol = email.includes('@');
        const hasDotAfterAt = email.split('@')[1]?.includes('.');
        const atPosition = email.indexOf('@');
        const dotPosition = email.lastIndexOf('.');
        
        return hasAtSymbol && 
               hasDotAfterAt &&
               atPosition > 0 &&
               dotPosition > atPosition + 1 &&
               dotPosition < email.length - 1;
    }

    // Дополнительный статический метод для более строгой проверки
    static strictValidation(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Пример использования статических методов
console.log(EmailValidator.isValid('test@example.com')); // true
console.log(EmailValidator.isValid('invalid-email')); // false
console.log(EmailValidator.isValid('@example.com')); // false
console.log(EmailValidator.isValid('test@')); // false
console.log(EmailValidator.isValid('test@example')); // false

console.log(EmailValidator.strictValidation('test@example.com')); // true
console.log(EmailValidator.strictValidation('test.email@domain.co.uk')); // true
console.log(EmailValidator.strictValidation('invalid@email')); // false

// Статические методы вызываются на классе, а не на экземпляре
// const validator = new EmailValidator();
// validator.isValid('test@example.com'); // TypeError: validator.isValid is not a function

// 3.
class Order {
    #items = [];
    #taxRate = 0.2; // НДС 20%

    constructor(customerName) {
        this.customerName = customerName;
    }

    // Публичный метод для добавления товаров
    addItem(name, price, quantity = 1) {
        this.#items.push({ name, price, quantity });
        console.log(`Добавлен товар: ${name} x${quantity}`);
    }

    // Приватный метод для расчета общей стоимости
    #calculateTotal() {
        let subtotal = 0;
        
        for (const item of this.#items) {
            subtotal += item.price * item.quantity;
        }
        
        const tax = subtotal * this.#taxRate;
        const total = subtotal + tax;
        
        return {
            subtotal: this.#formatCurrency(subtotal),
            tax: this.#formatCurrency(tax),
            total: this.#formatCurrency(total)
        };
    }

    // Второй приватный метод для форматирования валюты
    #formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(amount);
    }

    // Публичный метод для получения итоговой стоимости
    getTotal() {
        if (this.#items.length === 0) {
            return 'Корзина пуста';
        }
        
        const totals = this.#calculateTotal();
        
        return `
Заказ для: ${this.customerName}
Подитог: ${totals.subtotal}
НДС (20%): ${totals.tax}
Итого: ${totals.total}
        `.trim();
    }

    // Публичный метод для просмотра состава заказа
    viewOrder() {
        if (this.#items.length === 0) {
            return 'Корзина пуста';
        }

        let orderDetails = `Заказ для: ${this.customerName}\n\nТовары:\n`;
        
        this.#items.forEach((item, index) => {
            orderDetails += `${index + 1}. ${item.name} - ${item.quantity} x ${this.#formatCurrency(item.price)} = ${this.#formatCurrency(item.price * item.quantity)}\n`;
        });

        return orderDetails;
    }
}

// Пример использования
const order = new Order('Иван Иванов');

order.addItem('Ноутбук', 50000, 1);
order.addItem('Мышь', 2500, 2);
order.addItem('Клавиатура', 3500, 1);

console.log(order.viewOrder());
console.log(order.getTotal());

// Попытка вызова приватного метода (вызовет ошибку)
// order.#calculateTotal(); // SyntaxError: Private field '#calculateTotal' must be declared in an enclosing class

// Попытка доступа к приватному свойству (вызовет ошибку)
// console.log(order.#items); // SyntaxError: Private field '#items' must be declared in an enclosing class