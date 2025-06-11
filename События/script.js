//1. Изменение текста по щелчку
const button = document.getElementById('button');

button.addEventListener('click', function(e) {
    if (button.textContent === 'Отправить') {
        button.textContent = 'Отправлено';
    } else {
        button.textContent = 'Отправить';
    } 
});

//2. Изменение размера элемента при наведении
button.addEventListener('mouseover', function(e){
    button.style.transform = 'scale(1.1)';
});
button.addEventListener('mouseout', function(e){
    button.style.transform = 'scale(1)';
});

//3. Вывод отпущенной клавиши в консоль
document.getElementById('input');

input.addEventListener('keyup', function(e){
    console.log(`${event.key}`);
});

//4. Сообщение об успешной отправке формы
document.getElementById('form');

form.addEventListener('submit', function(e){
    event.preventDefault();
    alert('Форма отправлена')
})

//Изменение темы
const changeTheme = document.getElementById('change-theme');
const body = document.body;
const allElements = document.querySelectorAll('*');
let isDarkTheme = false;

changeTheme.addEventListener('click', function(e){
    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        
        allElements.forEach(el => {
            el.style.color = 'white';
            el.style.backgroundColor = el === body ? 'black' : 'inherit';
        });
    } else {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        
        allElements.forEach(el => {
            el.style.color = '';
            el.style.backgroundColor = '';
        });
    }
});

