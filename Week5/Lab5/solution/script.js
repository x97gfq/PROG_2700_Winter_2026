// Validation schema - defines required fields for Pokemon data
const schema = {
    requiredFields: ['id', 'name', 'types', 'hp', 'sprite']
};

// Rehydrate data from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    rehydrateFromStorage();
});

// Button event listeners
document.getElementById('loadBtn').addEventListener('click', loadPokemonData);
document.getElementById('clearBtn').addEventListener('click', clearData);

// Load and validate Pokemon data
async function loadPokemonData() {
    try {
        // Fetch JSON data from file
        const response = await fetch('../pokemon-data.json');
        const pokemonData = await response.json();

        // Validate each item and separate valid/invalid
        const validItems = [];
        const invalidItems = [];

        pokemonData.forEach(item => {
            if (validateItem(item, schema)) {
                validItems.push(item);
            } else {
                invalidItems.push(item);
            }
        });

        // Persist valid items to localStorage
        localStorage.setItem('validPokemon', JSON.stringify(validItems));

        // Update counts
        document.getElementById('validCount').textContent = validItems.length;
        document.getElementById('invalidCount').textContent = invalidItems.length;

        // Render valid Pokemon
        renderPokemon(validItems);

        console.log(`✓ Loaded ${validItems.length} valid Pokemon`);
        console.log(`✗ Found ${invalidItems.length} invalid items`);

    } catch (error) {
        console.error('Error loading Pokemon data:', error);
    }
}

// Validate item against schema
function validateItem(item, schema) {
    return schema.requiredFields.every(field => item.hasOwnProperty(field) && item[field]);
}

// Render Pokemon cards to the grid
function renderPokemon(pokemonArray) {
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';

    pokemonArray.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <img src="${pokemon.sprite}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <div>
                ${pokemon.types.map(type => `<span class="type">${type}</span>`).join('')}
            </div>
            <p class="hp">HP: ${pokemon.hp}</p>
        `;
        grid.appendChild(card);
    });
}

// Clear localStorage and reset display
function clearData() {
    localStorage.removeItem('validPokemon');
    document.getElementById('pokemonGrid').innerHTML = '';
    document.getElementById('validCount').textContent = '0';
    document.getElementById('invalidCount').textContent = '0';
    console.log('✓ localStorage cleared');
}

// Rehydrate data from localStorage
function rehydrateFromStorage() {
    const stored = localStorage.getItem('validPokemon');
    if (stored) {
        const pokemonData = JSON.parse(stored);
        document.getElementById('validCount').textContent = pokemonData.length;
        renderPokemon(pokemonData);
        console.log('✓ Rehydrated from localStorage');
    }
}
