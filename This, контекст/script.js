// 1.
const user2 = {
  name: "Ivan",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const greetings = user2.greet;

greetings(); // name не отобразится так как мы копируем ссылку без контекста

// 2.
/*const student = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },

  delayedGreet: function () { 
    setTimeout(this.greet, 1000); //DelayedGreet теряет контекст при вызове колбэка
  },
};

student.greet(); // Hello, Alice
student.delayedGreet(); // Hello, undefined*/

//исправленный вариант
const student = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },

  delayedGreet: function () {
    setTimeout(() => {
      //стрелочная функция не имеет своего This, она использует this из окружающего контекста (метода delayedGreet)
      this.greet();
    }, 1000);
  },
};

student.greet();
student.delayedGreet();

// 3.

function greet(hello, bye) {
  console.log(`${hello}, my name is ${this.name}. ${bye}.`);
}

greet.call(user2, "Hey", "See you soon");
greet.apply(user2, ["Yo", "See ya"]);
const boundGreet = greet.bind(user2, "Hello", "Good bye");
boundGreet();

// 4.
function sayHello() {
  console.log("Hello, " + this.name);
}

const admin = {
  name: "Bob",
};

const user = {
  name: "John",
};

const sayHelloToAdmin = sayHello.bind(admin);

sayHelloToAdmin();

//const sayHelloToUser = sayHelloToAdmin.bind(user); //Вторая попытка привязать контекст игнорируется
const sayHelloToUser = () => sayHello.call(user); //Исправлено через использование call
sayHelloToUser();
