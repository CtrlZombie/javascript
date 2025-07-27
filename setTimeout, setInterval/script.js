// 1.
function countDown(prefix) {
  let count = 5;
  const timerElement = document.getElementById("timer-display");
  const intervalId = setInterval(() => {
    timerElement.textContent = `${prefix}: ${count}`;
    count--;
    if (count < 0) {
      clearInterval(intervalId);
      timerElement.textContent = "Отсчет закончен.";
    }
  }, 1000);
}

countDown("Счет");

// 2.
let reminderInterval = null;

function showReminder() {
  if (reminderInterval) {
    clearInterval(reminderInterval);
  }

  const reminderElement = document.getElementById("water-reminder");
  const drankButton = document.querySelector("#water-reminder button");

  reminderElement.style.display = "block";

  drankButton.onclick = function () {
    reminderElement.style.display = "none";

    if (reminderInterval) {
      clearInterval(reminderInterval);
    }

    reminderInterval = setInterval(showReminder, 1800000);

    console.log("Напоминание подтверждено, следующее через 30 минут");
  };
}

function initReminderStyles() {
  const reminderElement = document.getElementById("water-reminder");
  reminderElement.style.cssText = `
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #e3f2fd;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
  `;

  const button = document.querySelector("#water-reminder button");
  button.style.cssText = `
    background: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  `;
}

initReminderStyles();

setTimeout(() => {
  showReminder();

  reminderInterval = setInterval(showReminder, 1800000);
}, 1000);

// 3.
let waterIntervalId = null;
const toggleButton = document.getElementById("toggleButton");
const delayInput = document.getElementById("delay");
const textInput = document.getElementById("text");

toggleButton.addEventListener("click", () => {
  if (waterIntervalId) {
    clearInterval(waterIntervalId);
    waterIntervalId = null;
    toggleButton.textContent = "Начать";
    console.log("Вывод текста остановлен");
  } else {
    const delay = parseInt(delayInput.value);
    const text = textInput.value;
    console.log(text);
    waterIntervalId = setInterval(() => {
      console.log(text);
    }, delay);

    toggleButton.textContent = "Остановить";
    console.log(`Вывод текста начат с задержкой ${delay} мс`);
  }
});
