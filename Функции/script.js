//Палиндром
function isPalindrome(str) {
  return str === [...str].reverse().join('');
}
console.log(isPalindrome('топот'));
console.log(isPalindrome('мадам'));
console.log(isPalindrome('привет'));
console.log(isPalindrome('radar'));
console.log(isPalindrome('палиндром'));

//Самое короткое слово
function findShortestWord(sentence) {
    const words = sentence.split(' ');
        let shortestWord = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortestWord.length) {
            shortestWord = words[i];
        }
    }
    return shortestWord;
}
const sentence = "I've become so numb, I can't feel you there";
console.log("самок короткое слово -",findShortestWord(sentence));

//Преобразование телефонного номера
function createPhoneNumber(numbers) {
    const numArray = String(numbers).split('');
        return `8 (${numArray.slice(0, 3).join('')}) ${numArray.slice(3, 6).join('')}-${numArray.slice(6).join('')}`;
}
const phoneNumber = createPhoneNumber(8005553535);
console.log(phoneNumber, '- проще позвонить чем у кого то занимать');

//Мин и макс значение в массиве
function findMinMax(arr) {
  if (arr.length === 0) {
    return null;
  }
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return  {min, max};
}
const numbers = [12, 15, 29, 95, 96 , 20];
const result = findMinMax(numbers);
console.log(result);

//Сортировка
function sortArray(arr) {
  const sorted = [...arr];
    let swapped;
    for (let i = 0; i < sorted.length - 1; i++) {
    swapped = false;
        for (let j = 0; j < sorted.length - 1 - i; j++) {
      if (sorted[j] > sorted[j + 1]) {
        const temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
         swapped = true; 
      }
    }
        if (!swapped) break;
  }
  
  return sorted;
}
const testArray = [8, 16, 15, 42, 4, 23];
console.log("Исходный массив:", testArray);
console.log("Отсортированный массив:", sortArray(testArray));
