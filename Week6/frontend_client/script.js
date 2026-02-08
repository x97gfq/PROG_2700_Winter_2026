document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('pokemon-container');
    const API_URL = 'http://localhost:3000/pokemon';

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(pokemons => {
            // Clear loading text
            container.innerHTML = '';

            pokemons.forEach(pokemon => {
                const card = createPokemonCard(pokemon);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching Pokemon:', error);
            container.innerHTML = '<p class="error">Failed to load Pokemon data. Is the backend running?</p>';
        });
});

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <h2>${pokemon.name}</h2>
        
        <div class="type-badge">${pokemon.type}</div>
        
        <div class="stat-row">
            <span class="label">HP:</span>
            <span>${pokemon.hp}</span>
        </div>
        <div class="stat-row">
            <span class="label">Attack:</span>
            <span>${pokemon.attack}</span>
        </div>
        <div class="stat-row">
            <span class="label">Defense:</span>
            <span>${pokemon.defense}</span>
        </div>
        <div class="stat-row">
            <span class="label">Speed:</span>
            <span>${pokemon.speed}</span>
        </div>
    `;

    return card;
}
