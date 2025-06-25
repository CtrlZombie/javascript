// 1. 
function showSongName() {
  const songName = 'Chipi-chipi, chapa-chapa Dubi-dubi, daba-daba, Mágico mi dubi-dubi boom, boom, boom, boom'
  console.log(songName)
};

showSongName(); 

console.log(songName); //Выводит ошибку - переменная не назначена, так как переменные объявленные внутри функции, доступны только внутри этой функции

// 2.
const fish = 'shark';
if (fish === 'shark') {
  const virusSong = 'Baby shark tu tu tu tu tu tu'
  console.log(virusSong)
};

console.log(virusSong);//Выводит ошибку - переменная не назначена, так как переменные объявленные внутри блока, доступны только внутри этого блока

// 3.
/*Hoisting (поднятие) в JavaScript — это механизм, при котором объявления переменных и функций "поднимаются" в верхнюю часть своей области видимости
 перед выполнением кода. hoisting перемещает только объявления, но не присваивания значений!*/

//Ключевые моменты:
//1) var: всплывает с значением undefined
console.log(name); // undefined (не ошибка!)
var name = 'Ovuvuevuevue Enyetuenwuevue Ugbemugbem Osas';
// Данный код выполняется следующим образом
var name = undefined; // Поднято
console.log(name);    // undefined
name = "Алиса";       // Присваивание позже

//2) function: всплывает полностью (можно вызывать до объявления)
showText();
function showText() { //Объявление функции целиком поднимается наверх
  console.log('Вообще то ты не моешь руки - это они моют друг друга, а ты просто смотришь')
}

//3) let/const: технически всплывают, но недоступны до объявления (временная мёртвая зона)
console.log(names)
const names = 'Pupa and Lupa' // let/const всплывают но, Между началом области видимости и объявлением - временная мёртвая зона (TDZ), где переменные недоступны



 