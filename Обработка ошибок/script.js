// 1.
function safeDivide (a, b) {
  if (b === 0) {
    throw new Error('деление на ноль невозможно');
  }
  return a / b;
}
try {
  const result = safeDivide(29, 0);
  console.log('Результат', result);
} catch (error) {
  console.error('Произошла ошибка:', error.message);
}

// 2.
function transformJSON(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return obj;
  } catch (error) {
  console.error('Ошибка парсинга JSON', error.message);
  return null
  }
}
const string = {"Mem": "Okak"};
const result = transformJSON(string);
console.log(result);

// 3.
function checkAccess(age) {
  if (age < 18) {
    throw new Error('Доступ запрещен')
  }
  return 'Доступ разрешен';
}

try {
  console.log(checkAccess(15));
} catch (error) {
  console.error('Ошибка:', error.message);
}