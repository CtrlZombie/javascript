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
  try {
    const response = await fetch('https://ivashev-education.ru/user/my/profile');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; 
  }
}

fetchUserData()
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.error('Failed to load user data:', error);
  });