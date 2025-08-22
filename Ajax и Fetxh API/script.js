document.addEventListener('DOMContentLoaded', function() {
    // Элементы для работы с постами
    const postForm = document.getElementById('postForm');
    const postResponse = document.getElementById('postResponse');
    const loadButton = document.getElementById('loadPosts');
    const postsContainer = document.getElementById('postsContainer');

    // Элементы для работы с пользователями
    const userForm = document.getElementById('userForm');
    const userResponse = document.getElementById('userResponse');

    // 1. Создание поста
    postForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const postData = {
            userId: parseInt(document.getElementById('userId').value),
            title: document.getElementById('title').value,
            body: document.getElementById('body').value
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();
            postResponse.innerHTML = `
                <h3>Пост создан успешно!</h3>
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Заголовок:</strong> ${data.title}</p>
            `;
            
        } catch (error) {
            postResponse.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    });

    // 2. Загрузка постов
    loadButton.addEventListener('click', async function() {
        try {
            postsContainer.innerHTML = '<p>Загрузка постов...</p>';
            
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            
            const posts = await response.json();
            displayPosts(posts);
            
        } catch (error) {
            postsContainer.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    });

    function displayPosts(posts) {
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>Посты не найдены</p>';
            return;
        }

        let html = '<h3>Список постов:</h3>';
        posts.forEach(post => {
            html += `
                <div id="post-${post.id}" style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                    <h4>${post.title}</h4>
                    <p><strong>ID:</strong> ${post.id}</p>
                    <p><strong>User ID:</strong> ${post.userId}</p>
                    <p>${post.body}</p>
                    <button onclick="deletePost(${post.id})" style="background-color: #ff4444; color: white;">
                        Удалить
                    </button>
                </div>
            `;
        });
        
        postsContainer.innerHTML = html;
    }

    // 3. Удаление поста
    window.deletePost = async function(postId) {
        if (!confirm('Удалить этот пост?')) return;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const postElement = document.getElementById(`post-${postId}`);
            if (postElement) postElement.remove();
            
            console.log(`Пост ${postId} удален`);
            
        } catch (error) {
            alert('Ошибка при удалении: ' + error.message);
        }
    };

    // 4. Обновление пользователя
    userForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const userData = {
            id: parseInt(document.getElementById('updateUserId').value),
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            // Остальные поля будут заполнены сервером или останутся прежними
        };

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const updatedUser = await response.json();
            userResponse.innerHTML = `
                <h3>Пользователь обновлен!</h3>
                <p><strong>ID:</strong> ${updatedUser.id}</p>
                <p><strong>Имя:</strong> ${updatedUser.name}</p>
                <p><strong>Email:</strong> ${updatedUser.email}</p>
                <p><strong>Username:</strong> ${updatedUser.username || 'не указан'}</p>
            `;
            
        } catch (error) {
            userResponse.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    });
});

// Разница между PUT и PATCH:
console.log(`Разница между PUT и PATCH:
- PUT: Полная замена ресурса. Все поля должны быть переданы, отсутствующие поля будут удалены.
- PATCH: Частичное обновление. Передаются только изменяемые поля, остальные остаются без изменений.`)