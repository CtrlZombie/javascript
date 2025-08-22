// 1.
"use strict";

function addNumbers(a, b) {
    // Попытка создать переменную без ключевого слова (вызовет ошибку)
    // result = a + b; // ReferenceError: result is not defined
    
    // Исправленная версия
    let result = a + b;
    return result;
}

console.log(addNumbers(5, 3)); 

// 2.
"use strict";

// Оригинальная функция с ошибкой (дублирование параметров)
// function processData(data, data) { // SyntaxError: Duplicate parameter name not allowed
//     return data + data;
// }

// Исправленная версия
function processData(firstData, secondData) {
    return firstData + secondData;
}

console.log(processData("Hello", "World")); 

// 3.
"use strict";

function showThis() {
    console.log("Значение this:", this);
}

// В нестрогом режиме: this = global object (window)
// В строгом режиме: this = undefined
showThis(); // undefined

const obj = {
    name: "Test Object",
    showThis: function() {
        console.log("Значение this в методе объекта:", this);
    }
};

obj.showThis(); // { name: "Test Object", showThis: f }

// Привязка контекста
const boundShowThis = showThis.bind(obj);
boundShowThis();

// 4.
"use strict";

const testObj = { name: "Test" };

// Попытка удалить встроенное свойство
try {
    delete Object.prototype.toString; // TypeError: Cannot delete property 'toString' of object
    console.log("Метод toString удален");
} catch (error) {
    console.log("Ошибка при удалении:", error.message);
}

// Правильный подход - создание собственного свойства
const customObj = { name: "Custom" };

// Добавляем собственный метод toString
customObj.toString = function() {
    return `CustomObject: ${this.name}`;
};

console.log(customObj.toString()); // CustomObject: Custom

// Теперь можно удалить собственный метод
delete customObj.toString;
console.log("toString удален:", customObj.toString === undefined); // true

// Но встроенный метод prototype остался нетронутым
console.log("Object.prototype.toString:", typeof Object.prototype.toString); // function

/*Встроенные свойства объектов (как Object.prototype.toString) имеют атрибут [[Configurable]]: false
Это означает, что их нельзя удалить, переопределить или изменить некоторые атрибуты
Такая защита предотвращает случайное повреждение базовой функциональности JavaScript*/

