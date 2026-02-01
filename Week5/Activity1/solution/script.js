// Add event listener to search button
document.getElementById('searchBtn').addEventListener('click', searchPokemon);

// Allow Enter key to trigger search
document.getElementById('pokemonInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

// Main search function
async function searchPokemon() {
    const pokemonName = document.getElementById('pokemonInput').value;
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const result = document.getElementById('result');

    // Validate input
    if (!pokemonName.trim()) {
        error.classList.remove('hidden');
        error.textContent = 'Please enter a Pokemon name!';
        result.classList.add('hidden');
        return;
    }

    // Show loading state
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    result.classList.add('hidden');

    try {
        // Fetch Pokemon data from API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

        // Check if Pokemon exists
        if (!response.ok) {
            throw new Error(`Pokemon "${pokemonName}" not found! Try: pikachu, charizard, bulbasaur`);
        }

        // Parse JSON response
        const data = await response.json();

        // Hide loading and display Pokemon
        loading.classList.add('hidden');
        displayPokemon(data);

    } catch (err) {
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        error.textContent = err.message;
    }
}

// Display Pokemon information
function displayPokemon(data) {
    const result = document.getElementById('result');
    result.classList.remove('hidden');

    result.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h2>${data.name}</h2>
        <div class="info-grid">
            <div class="info-item"><strong>Height:</strong> ${data.height}</div>
            <div class="info-item"><strong>Weight:</strong> ${data.weight}</div>
            <div class="info-item"><strong>Types:</strong> ${data.types.map(t => t.type.name).join(', ')}</div>
            <div class="info-item"><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</div>
        </div>
    `;
}
