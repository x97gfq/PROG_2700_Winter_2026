// Array of Pokemon names
const pokemonNames = ['pikachu', 'charizard', 'bulbasaur', 'squirtle', 'jigglypuff', 'mewtwo'];

// Render buttons for each Pokemon
const buttonContainer = document.getElementById('buttonContainer');
pokemonNames.forEach(name => {
    const button = document.createElement('button');
    button.className = 'pokemon-btn';
    button.textContent = name;
    button.addEventListener('click', () => fetchPokemon(name));
    buttonContainer.appendChild(button);
});

// Fetch Pokemon data by name
async function fetchPokemon(pokemonName) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const result = document.getElementById('result');

    // Reset display
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    result.classList.add('hidden');

    try {
        // Fetch data from Pokemon API with name parameter
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        // Hide loading
        loading.classList.add('hidden');

        // Display result
        result.classList.remove('hidden');
        result.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>${data.name}</h3>
            <p><strong>Height:</strong> ${data.height}</p>
            <p><strong>Weight:</strong> ${data.weight}</p>
            <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
            <pre>Sample JSON:\n${JSON.stringify(data.types, null, 2)}</pre>
        `;
    } catch (err) {
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        error.textContent = `Error: ${err.message}`;
    }
}
