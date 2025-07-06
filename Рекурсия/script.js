// 1.
function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }

  return arr[0] + sumArray(arr.slice(1));
}

console.log(sumArray([12, 15, 29]));

// 2.
function findMax(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  const first = arr[0];
  const maxInRest = findMax(arr.slice(1));

  return first > maxInRest ? first : maxInRest;
}

console.log(findMax([12, 15, 29]));

// 4.
function createFibonacciCalculator() {
  const cache = {0: 0, 1: 1};

  function fibonacci(n) {
    if (cache[n] !== undefined) {
      return cache[n];
    }

    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return cache[n];
  }
  return fibonacci;
}

const fibonacci = createFibonacciCalculator();
console.log(fibonacci(8)); 
console.log(fibonacci(800)); 
console.log(fibonacci(555)); 
console.log(fibonacci(35));
console.log(fibonacci(35)); 