//Квадраты чисел
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map((num) => num * num);
console.log(squares);

//Фильтр массива
const numbers2 = [1, 2, 3, 3, 4, 5, 5, 5, 6, 6, 7, 8, 8, 9];
const uniqNumbers2 = numbers2.filter(
  (num, index) => numbers2.indexOf(num) === index
);
console.log(uniqNumbers2);

//Сумма чисел массива
const numbers3 = [12, 15, 29];
const sum = numbers3.reduce((total, num) => total + num, 0);
console.log(sum);

//Разворачивание массива без reverse
const numbers4 = [1, 2, 3, 4, 5];
const reversedNumbers4 = [];
for (let i = numbers4.length - 1; i >= 0; i--) {
  reversedNumbers4.push(numbers4[i]);
}
console.log(reversedNumbers4);

//let и const
let game = "God of war";
game = "Red dead redemption 2";
console.log(game); //Выводит значение "Red dead redemption 2", так как переменную сделанную с let можно переопределять
const movie = "Interstellar";
movie = "Zodiac";
console.log(movie); //выводит ошибку, так как переменную сделанную с const нельзя переопределять
let games = ["God of war", "Red dead redemption 2"];
games.push("Bloodborne"); //Позволяет менять значения
console.log(games);
games = ["Balatro", "NHL 25"]; //Позволяет переопределять массиы
console.log(games);
const movies = ["Zodiac", "Interstellar", "Dark knight"];
movies.pop(); //Позволяет менять содержимое так как ссылка не меняется
console.log(movies);
movies = ["Rush hour", "Karate Kid"];
console.log(movies); //Выводит ошибку так как const нельзя присвоить новый массив, потому что нельзя менять ссылку
