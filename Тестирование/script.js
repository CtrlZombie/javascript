const quizData = [
  {
    type: "choice",
    question: 'Какой фильм получил "Оскар" за лучший фильм в 2020 году?',
    options: ["1917", "Джокер", "Паразиты", "Однажды в Голливуде"],
    answer: 2,
  },
  {
    type: "input",
    question: 'Как звали главного героя фильма "Форрест Гамп"?',
    answer: "Форрест Гамп",
  },
  {
    type: "choice",
    question: 'В каком году вышел фильм "Титаник"?',
    options: ["1995", "1997", "1999", "2001"],
    answer: 1,
  },
  {
    type: "input",
    question: 'Режиссер фильма "Назад в будущее"',
    answer: "Роберт Земекис",
  },
  {
    type: "choice",
    question: 'Кто срежиссировал "Начало"?',
    options: [
      "Кристофер Нолан",
      "Стивен Спилберг",
      "Квентин Тарантино",
      "Джеймс Кэмерон",
    ],
    answer: 0,
  },
  {
    type: "input",
    question: 'Как зовут актера, сыгравшего Джокера в "Темном рыцаре?"',
    answer: "Хит Леджер",
  },
  {
    type: "choice",
    question: 'Какой фильм НЕ входит в трилогию "Властелин колец"?',
    options: [
      "Братство кольца",
      "Две крепости",
      "Возвращение короля",
      "Хоббит",
    ],
    answer: 3,
  },
  {
    type: "input",
    question: "В каком году вышел первый фильм о Гарри Поттере?",
    answer: "2001",
  },
  {
    type: "choice",
    question: 'Кто играл Нео в "Матрице"?',
    options: ["Брэд Питт", "Леонардо ДиКаприо", "Киану Ривз", "Том Круз"],
    answer: 2,
  },
  {
    type: "input",
    question:
      "Как называется фильм с Томом Хэнксом, где он оказывается на необитаемом острове?",
    answer: "Изгой",
  },
];

// Элементы DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const inputContainer = document.getElementById("input-container");
const textAnswer = document.getElementById("text-answer");
const submitAnswerBtn = document.getElementById("submit-answer");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");

// Переменные состояния
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Загрузка лучшего результата из localStorage
function loadBestScore() {
  const bestScore = localStorage.getItem("bestScore") || 0;
  bestScoreEl.textContent = bestScore;
}

// Инициализация приложения
function init() {
  loadBestScore();
  startBtn.addEventListener("click", startQuiz);
  restartBtn.addEventListener("click", restartQuiz);
  submitAnswerBtn.addEventListener("click", checkTextAnswer);

  textAnswer.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkTextAnswer();
    }
  });
}

// Начало теста
function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
  startTimer();
}

// Показ вопроса
function showQuestion() {
  const question = quizData[currentQuestion];
  questionText.textContent = question.question;
  progressEl.textContent = `Вопрос ${currentQuestion + 1}/${quizData.length}`;

  // Сброс таймера
  timeLeft = 30;
  timerEl.textContent = `Время: ${timeLeft} сек`;
  timerEl.classList.remove("time-warning");

  // Очищаем контейнер с вариантами ответов
  optionsContainer.innerHTML = "";

  // Сбрасываем состояние поля ввода
  textAnswer.value = "";
  textAnswer.disabled = false;
  submitAnswerBtn.disabled = false;

  // Убираем стили обратной связи
  inputContainer.classList.remove("correct", "incorrect");

  // Всегда скрываем поле ввода по умолчанию
  inputContainer.classList.add("hidden");

  if (question.type === "choice") {
    // Для вопросов с выбором ответа
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("option");
      button.textContent = option;
      button.addEventListener("click", () => checkAnswer(index));
      optionsContainer.appendChild(button);
    });
  } else if (question.type === "input") {
    // ТОЛЬКО ДЛЯ ВОПРОСОВ С ВВОДОМ: показываем поле ввода
    inputContainer.classList.remove("hidden");
  }
}
// Проверка выбранного ответа
function checkAnswer(selectedIndex) {
  const question = quizData[currentQuestion];
  const isCorrect = selectedIndex === question.answer;

  // Визуальная обратная связь ТОЛЬКО для выбранной кнопки
  const selectedButton = document.querySelectorAll(".option")[selectedIndex];
  selectedButton.classList.add(isCorrect ? "correct" : "incorrect");

  if (isCorrect) score++;
  if (!isCorrect) {
    // Показываем правильный ответ
    const correctButton = document.querySelectorAll(".option")[question.answer];
    correctButton.classList.add("correct");
    correctButton.style.animation = "pulse 1s infinite";
  }
  setTimeout(nextQuestion, 1000);
}

// Проверка введенного ответа
function checkTextAnswer() {
  const question = quizData[currentQuestion];
  const userAnswer = textAnswer.value.trim().toLowerCase();
  const correctAnswer = question.answer.toLowerCase();
  const isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
    score++;
    textAnswer.classList.add("correct");
  } else {
    textAnswer.classList.add("incorrect");

    // Создаем контейнер для правильного ответа
    const correctAnswerContainer = document.createElement("div");
    correctAnswerContainer.className = "correct-answer-container";

    // Создаем элемент с правильным ответом
    const correctAnswerElement = document.createElement("div");
    correctAnswerElement.className = "correct-answer";
    correctAnswerElement.innerHTML = `
      <span>Правильный ответ: </span>
      <strong>${question.answer}</strong>
    `;

    // Добавляем анимацию пульсации
    correctAnswerElement.style.animation = "pulse 1s infinite";

    // Вставляем элементы в DOM
    correctAnswerContainer.appendChild(correctAnswerElement);
    inputContainer.appendChild(correctAnswerContainer);
  }

  // Блокируем поле ввода после ответа
  textAnswer.disabled = true;
  submitAnswerBtn.disabled = true;

  setTimeout(() => {
    // Удаляем стили и разблокируем поле
    textAnswer.classList.remove("correct", "incorrect");
    textAnswer.disabled = false;
    submitAnswerBtn.disabled = false;

    // Удаляем сообщение с правильным ответом
    const correctAnswerContainer = inputContainer.querySelector(
      ".correct-answer-container"
    );
    if (correctAnswerContainer) {
      correctAnswerContainer.remove();
    }

    nextQuestion();
  }, 2000); // Увеличиваем время для чтения правильного ответа
}
// Переход к следующему вопросу
function nextQuestion() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.classList.add("fade-out");

  setTimeout(() => {
    clearInterval(timer);
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      showQuestion();
      startTimer();
      questionContainer.classList.remove("fade-out");
    } else {
      showResults();
    }
  }, 500);
}
// Таймер для вопроса
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Время: ${timeLeft} сек`;
    if (timeLeft <= 10) {
      timerEl.classList.add("time-warning");
    } else {
      timerEl.classList.remove("time-warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      timerEl.textContent = "Время вышло!";
      setTimeout(nextQuestion, 1000);
    }
  }, 1000);
}

// Показ результатов
function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreEl.textContent = score;
  let currentScore = 0;
  const scoreAnimation = setInterval(() => {
    scoreEl.textContent = currentScore;
    currentScore++;
    if (currentScore > score) clearInterval(scoreAnimation);
  }, 100);
  const bestScore = localStorage.getItem("bestScore") || 0;
  if (score > bestScore) {
    localStorage.setItem("bestScore", score);
    bestScoreEl.textContent = score;
  }
}

// Сохранение лучшего результата

// Перезапуск теста
function restartQuiz() {
  // Сбрасываем все состояния
  currentQuestion = 0;
  score = 0;
  inputContainer.classList.add("hidden");
  inputContainer.classList.remove("correct", "incorrect");
  optionsContainer.innerHTML = "";
  textAnswer.value = "";
  document.getElementById("question-container").classList.remove("fade-out");

  // Сразу переходим к тесту, минуя стартовый экран
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  
  // Показываем первый вопрос
  showQuestion();
  startTimer(); // Не забываем запустить таймер
}
// Запуск приложения
init();
