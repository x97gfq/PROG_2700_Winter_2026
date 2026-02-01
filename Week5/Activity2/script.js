// Team array to store Pokemon
let team = [];

// TODO: Add form submit event listener
// HINT: document.getElementById('addForm').addEventListener('submit', handleAddPokemon);



// TODO: Add Enter key support for input
// HINT: document.getElementById('pokemonInput').addEventListener('keypress', ...);



// TODO: Create handleAddPokemon function
async function handleAddPokemon(e) {
    // TODO: Prevent form submission default behavior


    // TODO: Get input value


    // TODO: Validate input (check if empty)


    // TODO: Check team size limit (max 6)
    // HINT: if (team.length >= 6) { showError('Team is full!'); return; }


    // TODO: Check for duplicates
    // HINT: if (team.some(p => p.name === pokemonName)) { ... }


    // TODO: Fetch Pokemon data with error handling
    // HINT: Use try-catch, show loading, handle errors


    // TODO: Add Pokemon to team array


    // TODO: Update display


    // TODO: Clear input

}

// TODO: Create fetchPokemon function
async function fetchPokemon(name) {
    // TODO: Get loading and error elements


    // TODO: Show loading, hide error


    // TODO: Fetch from API with try-catch
    // HINT: const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);


    // TODO: Check response.ok


    // TODO: Parse JSON


    // TODO: Return formatted data object
    // return { id: data.id, name: data.name, sprite: data.sprites.front_default, types: ..., hp: ... };

}

// TODO: Create renderTeam function
function renderTeam() {
    // TODO: Get team grid element


    // TODO: Clear grid


    // TODO: Loop through team and create cards
    // HINT: team.forEach((pokemon, index) => { ... });


    // TODO: Add remove button to each card


    // TODO: Update team count


    // TODO: Update team stats

}

// TODO: Create removePokemon function
function removePokemon(index) {
    // TODO: Remove from team array


    // TODO: Re-render team

}

// TODO: Create updateStats function
function updateStats() {
    // TODO: Calculate total HP


    // TODO: Calculate average height


    // TODO: Get all unique types


    // TODO: Display stats
    // HINT: Show stats section if team has Pokemon

}

// TODO: Create showError function
function showError(message) {
    // TODO: Display error message


    // TODO: Auto-hide after 3 seconds

}
