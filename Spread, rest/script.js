//Среднее значение
const numbers = [12, 15, 29, 42]; 
const avg = (...args) => {
  const sum = args.reduce((total, num) => total + num, 0);
  return sum / args.length; 
};
console.log('Среднее значение -',avg(...numbers));

//Информация о пользователе
const user = {
  userName: 'Ivan',
  age: 30,
  hobby: 'Hockey',
}
const {userName, age, hobby} = user;
console.log('Имя пользователя -', userName,'Возраст -', age, 'Увлечение -', hobby);

//Извлечение значений на разных уровнях вложенности
const team = {
  name: 'Pittsburgh Penguins',
  league: 'NHL',
  address: {
    country: 'USA',
    city: 'Pittsburgh',
  },
  stanleyCupWinners: [1991, 1992, 2009, 2016, 2017],
  bestPlayers: [
    {name: 'Evgeni Malkin', number: 71},
    {name: 'Sidney Crosby', number: 87},
  ]
};
const {
  name,
  address: {country},
  stanleyCupWinners: [firstTime],
  bestPlayers: [firstPlayer],
} = team;
const {name: bestPlayer } = firstPlayer;
console.log('team -', name);
console.log('country -', country);
console.log('Won the Stanley Cup for the first time in', firstTime);
console.log('Best player -', bestPlayer);

//Копирование массива и добавление элементов
const company = ['Activision Blizzard', 'Take Two Interactive', 'Electronic Arts'];
const updateCompany = ['From Software', ...company, 'Naughty Dog'];
console.log(updateCompany);

//Возврат объекта без одного указанного параметра
const removeParametr = (obj, parametrToRemove) => {
  const { [parametrToRemove]: removed, ...rest } = obj;
  return rest;
};

const movie = {
  movieName: 'Back to the future',
  director: 'Robert Zemeckis',
  releaseDate: 1985,
}
console.log(removeParametr(movie, 'releaseDate'));
console.log(removeParametr(movie, 'director')); 