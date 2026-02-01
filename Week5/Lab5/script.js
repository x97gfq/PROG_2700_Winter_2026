// TODO: Define validation schema for Pokemon data
// HINT: const schema = { requiredFields: ['id', 'name', 'types', 'hp', 'sprite'] };



// TODO: Check localStorage on page load and rehydrate data
// HINT: window.addEventListener('DOMContentLoaded', () => { ... });



// Button event listeners
document.getElementById('loadBtn').addEventListener('click', loadPokemonData);
document.getElementById('clearBtn').addEventListener('click', clearData);

// TODO: Create loadPokemonData function
async function loadPokemonData() {
    // TODO: Fetch sample JSON data (can use inline data or fetch from file)
    // Sample data structure:
    // const pokemonData = [
    //     { id: 25, name: "pikachu", types: ["electric"], hp: 35, sprite: "url" },
    //     { id: 1, name: "bulbasaur", types: ["grass", "poison"], hp: 45, sprite: "url" },
    //     { name: "invalid" }, // Missing required fields
    // ];


    // TODO: Validate each item using the schema
    // HINT: Use a function like validateItem(item, schema)


    // TODO: Separate valid and invalid items


    // TODO: Persist valid items to localStorage
    // HINT: localStorage.setItem('validPokemon', JSON.stringify(validItems));


    // TODO: Update counts


    // TODO: Render valid Pokemon

}

// TODO: Create validateItem function
function validateItem(item, schema) {
    // TODO: Check if all required fields exist in the item
    // HINT: return schema.requiredFields.every(field => item.hasOwnProperty(field));

}

// TODO: Create renderPokemon function
function renderPokemon(pokemonArray) {
    // TODO: Clear the grid


    // TODO: Create a card for each valid Pokemon
    // HINT: Create div with class 'pokemon-card'
    // HINT: Include image, name, types, and HP

}

// TODO: Create clearData function
function clearData() {
    // TODO: Clear localStorage


    // TODO: Reset display

}

// TODO: Create rehydrate function to load from localStorage
function rehydrateFromStorage() {
    // TODO: Get data from localStorage


    // TODO: Parse and render if data exists

}
