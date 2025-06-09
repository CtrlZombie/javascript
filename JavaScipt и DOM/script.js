//1. Изменение текстового содержимого
const changeText = document.getElementById('change-text');
changeText.innerHTML = '<p>Текст изменился</p>'

//2. Изменение фона и цвета текста с определенным классом
const changeStyles = document.querySelector('.changeStyles');
changeStyles.style.color = 'white';
changeStyles.style.background = 'gray';

//3. Создание параграфа и добавление его в конец документа
const newElement = document.createElement('p');
newElement.textContent = 'Новый параграф с текстом добавленный в конец документа';
document.body.appendChild(newElement);

//4. Удаление элемента по ID
const deleteThis = document.getElementById('delete-this');
deleteThis.parentNode.removeChild(deleteThis);

//5. Изменение атрибута ссылки
const link = document.querySelector('a');
link.setAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');

//6. Создание нового элемента и добавление в DOM
const newElement2 = document.createElement('div');
newElement2.classList.add('highlight');
newElement2.textContent = 'Текст создан и добавлен в DOM';
newElement.insertBefore(newElement2, newElement.firstChild);

//7. Переключение класса элемента
newElement2.classList.toggle('active');
const checkClass = document.querySelector('.active');
console.log(checkClass)

