// 1.
const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

outer.addEventListener('click', (event) => {
  console.log('outer clicked')
});
middle.addEventListener('click', (event) => {
  console.log('middle clicked')}
);
inner.addEventListener('click', (event) => {
  console.log('inner clicked')
});

// 2.
outer.addEventListener('click', (event) => {
  console.log('outer clicked')
});
middle.addEventListener('click', (event) => {
  console.log('middle clicked')
  event.stopPropagation();
});
inner.addEventListener('click', (event) => {
  console.log('inner clicked')
});

// 3.
const form = document.getElementById('myForm');

form.addEventListener('input', function(event) {
  if (event.target.matches('input')) {
    const input = event.target;
    const maxLength = parseInt(input.dataset.maxlength) || 20;
    const errorElement = input.nextElementSibling;

    if (input.value.length > maxLength) {
      input.setCustomValidity(`Максимум ${maxLength} символов`);
      errorElement.textContent = `Слишком длинно (макс. ${maxLength})`;
      errorElement.style.display = 'block';
    } else {
      input.setCustomValidity('');
      errorElement.style.display = 'none';
    }
  }
  console.log(`Всплытие: событие input на ${event.currentTarget.tagName}`);
}, false);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Форма отправлена!');
});

