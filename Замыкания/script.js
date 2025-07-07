// 1.
function createCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter();
counter();

// 2.
const account = createBankAccount(4815);

function createBankAccount(initailBalance) {
  let balance = initailBalance;
  return {
    checkBalance: function() {
      return balance;
    },
    deposit: function (amount) {
      balance += amount;
      console.log(`Пополнение на ${amount}. Новый баланс: ${balance}.`);
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`Снятие ${amount}. Новый баланс: ${balance}.`);
      } else {
        console.log('Недостаточно средств на счете');
      }
    }
  };
}

account.deposit(16);
account.withdraw(2342);
console.log(account.checkBalance());

// 3.
function createFibonacciCalculator() {
  const cache = {0: 0, 1: 1};

  return function(n) {
    if (cache[n] !== undefined) {
      return cache[n];
    }
    let [a, b] = [1, 2];
    let temp;

    for (let i = 2; i <= n; i++) {
      temp = a + b;
      a = b;
      b = temp;
    }
    cache[n] = b;
    return b;
  };
}

const fibonacci = createFibonacciCalculator();
console.log(fibonacci(8));
console.log(fibonacci(800));
console.log(fibonacci(555));
console.log(fibonacci(35));
console.log(fibonacci(35));