// 1.
function getUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userData = {
        name: 'Dill',
        lastname: 'Doe',
        age: 30,
        email: 'bigdealdoe@example.com'
      };
      resolve(userData);
    }, 2000);
  });
}

getUserData()
  .then(user => {
    console.log('Данные получены:', user);
    user.status = 'active';
    return user;
  })
  .then(updateUser => {
    console.log('Обновленные данные:', updateUser);
    return `Пользователь ${updateUser.name} теперь активен`;
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
  
  // 2.
function getFirstData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Данные из первого источника');
    }, 3000);
  });
}

function getSecondData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Данные из второго источника');
    }, 5000);
  });
}

Promise.all([getFirstData(), getSecondData()])
  .then(results => {
    console.log('Оба промиса выполнены:');
    console.log('Результат 1:', results[0]);
    console.log('Результат 2:', results[1]);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  });

// 3.
function getFastData(dataName) {
  const delay = 1000 + Math.random() * 4000;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${dataName} выполнен за ${(delay/1000).toFixed(2)} сек`);
    }, delay);
  });
}
const promise1 = getFastData('Промис 1');
const promise2 = getFastData('Промис 2');

Promise.race([promise1, promise2])
  .then(result => {
    console.log('Победил первый завершенный промис:');
    console.log(result);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  });

  

