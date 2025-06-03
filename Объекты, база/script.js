const person = {
  name: 'Ivan',
  age: 29,
  hobbies: [
    'Hockey',
    'Videogames',
    'Self-development'
  ]
};

console.log(person.name);
console.log(person['age']);
console.log(person.hobbies);

person.isEmployed = true; //Добавление свойства
person.age = 30; //Изменение свойства
delete person.hobbies //Удаление свойства

for (let key in person) {
  console.log(`${key}: ${person[key]}`)
};

console.log(Object.entries(person));