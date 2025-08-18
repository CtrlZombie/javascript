// 1.
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const displayName = document.getElementById('displayName');
  const displayPhone = document.getElementById('displayPhone');
  const displayEmail = document.getElementById('displayEmail');
  const savedDataDiv = document.getElementById('savedData');

  const savedContact = localStorage.getItem('contact');
  if (savedContact) {
    showContact(JSON.parse(savedContact));
  } else {
    savedDataDiv.style.display = 'none';
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const contact = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      email: form.elements.email.value
    };

    localStorage.setItem('contact', JSON.stringify(contact));
    showContact(contact);

    form.reset();
  });
  function showContact(contact) {
    displayName.textContent = contact.name;
    displayPhone.textContent = contact.phone;
    displayEmail.textContent = contact.email;
    savedDataDiv.style.display = 'block';
  }
});

// 2.
document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  const STORAGE_KEY = 'expenses';
  let expenses = loadExpenses();
  renderExpenses();

  expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      description: document.getElementById('description').value,
      amount: parseFloat(document.getElementById('amount').value),
      date: document.getElementById('date').value
    };
    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();
    expenseForm.reset();
  });

  function loadExpenses() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveExpenses() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }

  function renderExpenses() {
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
      expenseList.innerHTML = '<li>Нет расходов</li>'
      return
    }

    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.innerHTML = `
      ${expense.date} - ${expense.description}: ${expense.amount.toFixed(2)}
      <button onclick='deleteExpense(${expense.id})'>Удалить</button>
      `;
      expenseList.appendChild(li);
    });
  }

  window.deleteExpense = function(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderExpenses();
  };
});

// 3.
document.addEventListener('DOMContentLoaded', function() {
  const timeCounter = document.getElementById('timeCounter');
  const STORAGE_COUNTER_KEY = 'pageTimeSpent';
  let seconds = 0;
  const savedTime = sessionStorage.getItem(STORAGE_COUNTER_KEY);
  if (savedTime) {
    seconds = parseInt(savedTime);
    updateTimeDisplay();
  }

  const timer = setInterval(function() {
    seconds ++
    sessionStorage.setItem(STORAGE_COUNTER_KEY, seconds.toString());
    updateTimeDisplay();
  }, 1000);

  function updateTimeDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    let timeString = '';
    if (hours > 0) timeString += `${hours} час${getRussianEnding(hours, ['', 'а', 'ов'])} `;
        if (minutes > 0 || hours > 0) timeString += `${minutes} минут${getRussianEnding(minutes, ['а', 'ы', ''])} `;
        timeString += `${secs} секунд${getRussianEnding(secs, ['а', 'ы', ''])}`;

        timeCounter.textContent = timeString;
    }

  function getRussianEnding(number, endings) {
     number = number % 100;
    if (number >= 11 && number <= 19) {
      return endings[2];
    }
    const i = number % 10;
    switch (i) {
      case 1: return endings[0];
      case 2:
      case 3:
      case 4: return endings[1];
      default: return endings[2];
    }
  }

  window.addEventListener('beforeunload', function() {
    clearInterval(timer);
  });
});
