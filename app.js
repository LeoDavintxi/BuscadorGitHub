async function searchUsers() {
    const username = document.getElementById('username').value;
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '<p>Cargando...</p>';

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${username}`);
        if (!response.ok) {
            throw new Error('Error en los datos');
        }

        const data = await response.json();
        resultsContainer.innerHTML = '';

        if (data.items.length === 0) {
            resultsContainer.innerHTML = '<p>Usuario no encontrado.</p>';
            return;
        }

        data.items.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            userCard.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}">
                <h3>${user.login}</h3>
                <a href="${user.html_url}" target="_blank">Ver Perfil</a>
            `;

            resultsContainer.appendChild(userCard);
        });
    } catch (error) {
        resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}