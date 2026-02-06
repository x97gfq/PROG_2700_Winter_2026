// Team array to store Pokemon
let team = [];

// TODO: Add form submit event listener
document.getElementById('addForm').addEventListener('submit', handleAddPokemon);

// TODO: Add Enter key support for input
document.getElementById('pokemonInput').addEventListener('keypress', function(e) {
    if (e.key === "Enter") { 
        handleAddPokemon(e); 
    }
});

// TODO: Create handleAddPokemon function
async function handleAddPokemon(e) {
    // TODO: Prevent form submission default behavior
    e.preventDefault();

    // TODO: Get input value
    const input = document.getElementById("pokemonInput");
    const pokemonName = input.value.trim();

    // TODO: Validate input (check if empty)

    if (!pokemonName) {
        showError('Please enter a Pokemon name!');
        return;
    }

    if (team.length >= 6) {
        showError('Team is full! Maximum 6 Pokemon allowed.');
        return;
    }

    if (team.some(p => p.name === pokemonName.toLowerCase())) {
        showError('This Pokemon is already in your team!');
        return;
    }

 
    const pokemon = await fetchPokemon(pokemonName);

    if (pokemon) {
        team.push(pokemon);
        renderTeam();
        input.value = '';
    }
}

// Fetch Pokemon from API with error handling
async function fetchPokemon(name) {
    const loading = document.getElementById('loading');
    const errorEl = document.getElementById('error');

    loading.classList.remove('hidden');
    errorEl.classList.add('hidden');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

        if (!response.ok) {
            throw new Error(`Pokemon "${name}" not found! Check spelling.`);
        }

        const data = await response.json();
        loading.classList.add('hidden');

        //“We project the API response into a DTO (or view model) by mapping it into the shape our app needs.”
        return {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types.map(t => t.type.name),
            hp: data.stats[0].base_stat,
            height: data.height
        };

    } catch (err) {
        loading.classList.add('hidden');
        showError(err.message);
        return null;
    }
}

// TODO: Create renderTeam function
// Render team display
function renderTeam() {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';

    team.forEach((pokemon, index) => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <button class="remove-btn" onclick="removePokemon(${index})">×</button>
            <img src="${pokemon.sprite}" alt="${pokemon.name}">
            <h4>${pokemon.name}</h4>
            ${pokemon.types.map(type => `<span class="type-badge">${type}</span>`).join('')}
            <p>HP: ${pokemon.hp}</p>
        `;
        grid.appendChild(card);
    });

    document.getElementById('teamCount').textContent = team.length;
    updateStats();
}

// Remove Pokemon from team
function removePokemon(index) {
    team.splice(index, 1);
    renderTeam();
}


// Update team statistics
function updateStats() {
    const statsDiv = document.getElementById('teamStats');

    if (team.length === 0) {
        statsDiv.classList.add('hidden');
        return;
    }

    statsDiv.classList.remove('hidden');

    const totalHp = team.reduce((sum, p) => sum + p.hp, 0);
    const avgHeight = (team.reduce((sum, p) => sum + p.height, 0) / team.length).toFixed(1);
    const allTypes = [...new Set(team.flatMap(p => p.types))];

    document.getElementById('totalHp').textContent = totalHp;
    document.getElementById('avgHeight').textContent = avgHeight;
    document.getElementById('teamTypes').textContent = allTypes.join(', ');
}


// Show error message
function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');

    setTimeout(() => errorEl.classList.add('hidden'), 3000);
}
