//Отладка с помощью Breakpoint
function hasEvenNumber(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      return true; // Нашли чётное - сразу возвращаем true
    }
  }
  return false; // Если дошли сюда - чётных нет
}

console.log(hasEvenNumber([1, 3, 4, 5]));

//Отладка с помощью Debugger
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    /* Исправлено условие. 
    i <= numbers.length приводило к тому что цикл доходил до несуществующего элемента*/
    sum += numbers[i];
  }
  return sum / numbers.length;
}

console.log(calculateAverage([2, 4, 6]));

//Отладка с помощью console.log
function findLargestNumber(arr) {
  let largest = arr[0]; //Вместо let largest = 0, let largest = arr[0]
  //console.log("Начальное значение largest:", largest);

  for (let i = 0; i < arr.length; i++) {
    //console.log("--- Новая итерация ---");
    //console.log("Текущий элемент:", arr[i]);
    //console.log("Текущее largest:", largest);

    if (arr[i] > largest) {
      //console.log(`Обновляем largest (${largest} -> ${arr[i]})`);
      largest = arr[i];
    } else {
      //console.log(`${arr[i]} <= ${largest} - не обновляем`);
    }
  }

  //console.log("Финальное largest:", largest);
  return largest;
}

console.log(findLargestNumber([-10, -20, -30]));
