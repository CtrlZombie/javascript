// 1.
async function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  })
}

async function exampleUsage() {
  console.log('Начало задержки...');
  await delay(2000);
  console.log('Задержка завершена');
}

exampleUsage();

//2. 
async function fetchUserData() {
  const response = await fetch('https://persianwifes.com/user/1')
  const data = await response.json();
  return data;
}

fetchUserData().then(user => {
  console.log(user);
});