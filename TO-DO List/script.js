document.addEventListener("DOMContentLoaded", function () {
  // Элементы DOM
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const showAllBtn = document.getElementById("showAll");
  const showActiveBtn = document.getElementById("showActive");
  const showCompletedBtn = document.getElementById("showCompleted");
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");
  const totalTasksElem = document.getElementById("totalTasks");
  const completedTasksElem = document.getElementById("completedTasks");
  const activeTasksElem = document.getElementById("activeTasks");

  let tasks = [];
  let currentFilter = "all";

  // Инициализация приложения
  function init() {
    setupEventListeners();
    loadTasksFromStorage();
  }

  // Настройка обработчиков событий
  function setupEventListeners() {
    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addTask();
      }
    });

    showAllBtn.addEventListener("click", () => filterTasks("all"));
    showActiveBtn.addEventListener("click", () => filterTasks("active"));
    showCompletedBtn.addEventListener("click", () => filterTasks("completed"));
  }

  // Загрузка задач из localStorage
  function loadTasksFromStorage() {
    const storedTasks = localStorage.getItem("todoTasks");

    // Всегда сначала пытаемся загрузить с сервера
    fetchTasksFromServer()
      .then(() => {
        // После загрузки с сервера, проверяем localStorage
        if (storedTasks) {
          const localTasks = JSON.parse(storedTasks);

          // Объединяем задачи, отдавая приоритет локальным
          const mergedTasks = localTasks.map((localTask) => {
            const serverTask = tasks.find((t) => t.id === localTask.id);
            if (serverTask) {
              // Сохраняем статус выполнения из localStorage
              return { ...serverTask, completed: localTask.completed };
            }
            return localTask;
          });

          // Добавляем задачи, которых нет на сервере
          localTasks.forEach((localTask) => {
            if (!mergedTasks.some((t) => t.id === localTask.id)) {
              mergedTasks.push(localTask);
            }
          });

          tasks = mergedTasks;
        }

        saveTasksToStorage();
        renderTasks();
      })
      .catch((error) => {
        // Если сервер недоступен, используем localStorage
        if (storedTasks) {
          tasks = JSON.parse(storedTasks);
          renderTasks();
        } else {
          taskList.innerHTML =
            '<div class="empty-state"><i>📝</i><p>Список задач пуст</p><p>Добавьте первую задачу!</p></div>';
        }
      });
  }

  // Получение задач с сервера
  async function fetchTasksFromServer() {
    try {
      taskList.innerHTML =
        '<div class="loading">Загрузка задач с сервера</div>';

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки задач с сервера");
      }

      const serverTasks = await response.json();

      // Преобразуем задачи сервера в наш формат
      tasks = serverTasks.map((task) => ({
        id: task.id,
        text: task.title,
        completed: task.completed,
        reminder: false,
        reminderTimeout: null,
        reminderTime: null,
      }));

      return tasks;
    } catch (error) {
      console.error("Ошибка загрузки с сервера:", error);
      throw error;
    }
  }

  // Сохранение задач в localStorage
  function saveTasksToStorage() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
    updateStats();
  }

  // Отображение уведомления
  function showNotification(message, isError = false) {
    notificationText.textContent = message;
    notification.classList.remove("error");

    if (isError) {
      notification.classList.add("error");
    }

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // Добавление новой задачи
  function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
      showNotification("Введите текст задачи", true);
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      reminder: false,
      reminderTimeout: null,
      reminderTime: null,
    };

    tasks.push(newTask);
    saveTasksToStorage();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();

    showNotification("Задача добавлена");
  }

  // Удаление задачи
  function deleteTask(id) {
    // Очищаем таймаут, если он есть
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete && taskToDelete.reminderTimeout) {
      clearTimeout(taskToDelete.reminderTimeout);
    }

    tasks = tasks.filter((task) => task.id !== id);
    saveTasksToStorage();
    renderTasks();

    showNotification("Задача удалена");
  }

  // Переключение статуса выполнения задачи
  function toggleTaskCompletion(id) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        // Если задача завершается, удаляем напоминание
        if (!task.completed && task.reminderTimeout) {
          clearTimeout(task.reminderTimeout);
          return {
            ...task,
            completed: true,
            reminder: false,
            reminderTimeout: null,
            reminderTime: null,
          };
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    saveTasksToStorage();
    renderTasks();
  }

  // Переключение напоминания
  function toggleReminder(id) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) return;

    const task = tasks[taskIndex];

    // Если напоминание уже установлено - удаляем его
    if (task.reminder) {
      if (task.reminderTimeout) {
        clearTimeout(task.reminderTimeout);
      }
      tasks[taskIndex] = {
        ...task,
        reminder: false,
        reminderTimeout: null,
        reminderTime: null,
      };
      showNotification("Напоминание удалено");
      saveTasksToStorage();
      renderTasks();
      return;
    }

    // Запрашиваем время для напоминания
    const timeInput = prompt("Установите время напоминания (в секундах):");
    if (!timeInput || isNaN(timeInput) || timeInput <= 0) {
      showNotification("Введите корректное время в секундах", true);
      return;
    }

    const timeInSeconds = parseInt(timeInput);

    // Очищаем предыдущий таймаут, если был
    if (task.reminderTimeout) {
      clearTimeout(task.reminderTimeout);
    }

    // Устанавливаем новый таймаут
    const reminderTimeout = setTimeout(() => {
      showNotification(`Напоминание: "${task.text}"`, false);

      // Обновляем задачу после срабатывания напоминания
      tasks = tasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            reminder: false,
            reminderTimeout: null,
            reminderTime: null,
          };
        }
        return t;
      });
      saveTasksToStorage();
      renderTasks();
    }, timeInSeconds * 1000);

    tasks[taskIndex] = {
      ...task,
      reminder: true,
      reminderTimeout: reminderTimeout,
      reminderTime: timeInSeconds,
    };

    showNotification(`Напоминание установлено на ${timeInSeconds} секунд`);
    saveTasksToStorage();
    renderTasks();
  }

  // Фильтрация задач
  function filterTasks(filter) {
    currentFilter = filter;

    // Обновляем активную кнопку
    showAllBtn.classList.remove("active");
    showActiveBtn.classList.remove("active");
    showCompletedBtn.classList.remove("active");

    if (filter === "all") showAllBtn.classList.add("active");
    if (filter === "active") showActiveBtn.classList.add("active");
    if (filter === "completed") showCompletedBtn.classList.add("active");

    renderTasks();
  }

  // Обновление статистики
  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;

    totalTasksElem.textContent = total;
    completedTasksElem.textContent = completed;
    activeTasksElem.textContent = active;
  }

  // Отображение задач
  function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else if (currentFilter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    }

    if (filteredTasks.length === 0) {
      let message = "";

      if (currentFilter === "all") message = "Список задач пуст";
      else if (currentFilter === "active") message = "Нет активных задач";
      else if (currentFilter === "completed") message = "Нет завершенных задач";

      taskList.innerHTML = `
                <div class="empty-state">
                    <i>${currentFilter === "completed" ? "✅" : "📝"}</i>
                    <p>${message}</p>
                    <p>${
                      currentFilter === "all"
                        ? "Добавьте первую задачу!"
                        : "Измените фильтр для просмотра задач"
                    }</p>
                </div>
            `;
      return;
    }

    taskList.innerHTML = "";

    filteredTasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";

      if (task.completed) {
        taskItem.classList.add("completed");
      }

      if (task.reminder) {
        taskItem.classList.add("reminder");
      }

      // Обновленный HTML с правильным отображением кнопки напоминания
      taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="reminder-btn ${
                      task.reminder ? "active" : ""
                    }" ${task.completed ? 'style="display:none;"' : ""}>
                        ${task.reminder ? `⏰ ${task.reminderTime}s` : "🔔"}
                    </button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;

      // Обработчики событий
      const checkbox = taskItem.querySelector(".task-checkbox");
      checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

      const deleteBtn = taskItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => deleteTask(task.id));

      const reminderBtn = taskItem.querySelector(".reminder-btn");
      if (!task.completed) {
        reminderBtn.addEventListener("click", () => toggleReminder(task.id));
      }

      taskList.appendChild(taskItem);
    });

    updateStats();
  }

  // Инициализация приложения
  init();
});

