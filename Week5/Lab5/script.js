// localStorage key for storing Pokemon data
const STORAGE_KEY = 'pikachuData';

// TODO: Get button references
// HINT: const loadApiBtn = document.getElementById('loadApiBtn');
// HINT: const saveBtn = document.getElementById('saveBtn');
// HINT: const clearBtn = document.getElementById('clearBtn');



// TODO: Create a variable to store current Pokemon data
// HINT: let currentPokemon = null;



// TODO: Add button event listeners
// HINT: loadApiBtn.addEventListener('click', loadFromAPI);
// HINT: saveBtn.addEventListener('click', savePokemon);
// HINT: clearBtn.addEventListener('click', clearStorage);



// TODO: Add DOMContentLoaded event listener
// HINT: window.addEventListener('DOMContentLoaded', () => { loadFromStorage(); });
// This will automatically load Pokemon from localStorage when the page loads



// TODO: Create loadFromAPI function
async function loadFromAPI() {
    // Step 1: Fetch Pikachu from PokeAPI
    // HINT: Use fetch('https://pokeapi.co/api/v2/pokemon/25')
    // HINT: Pikachu's ID is 25
    // HINT: Don't forget to await and use .json()



    // Step 2: Transform the data to our format
    // HINT: Store in currentPokemon variable
    // HINT: Create an object with: id, name, sprite, types, hp
    // HINT: sprite is at data.sprites.front_default
    // HINT: types: data.types.map(t => t.type.name)
    // HINT: hp: data.stats.find(s => s.stat.name === 'hp').base_stat



    // Step 3: Render the Pokemon card
    // HINT: Use renderPokemon(currentPokemon)



    // Step 4: Update button states
    // HINT: Use updateButtonStates()


}

// TODO: Create savePokemon function
function savePokemon() {
    // Save currentPokemon to localStorage
    // HINT: Check if currentPokemon exists
    // HINT: Use localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPokemon))
    // HINT: Call updateButtonStates() after saving


}

// TODO: Create loadFromStorage function
function loadFromStorage() {
    // Load Pokemon from localStorage
    // HINT: Use localStorage.getItem(STORAGE_KEY)
    // HINT: Check if data exists before parsing
    // HINT: Parse and store in currentPokemon: currentPokemon = JSON.parse(stored)
    // HINT: Call renderPokemon(currentPokemon) if data exists
    // HINT: Call updateButtonStates() at the end



}

// TODO: Create renderPokemon function
function renderPokemon(pokemon) {
    // Render the Pokemon card
    // HINT: Get the grid element: document.getElementById('pokemonGrid')
    // HINT: Clear existing content: grid.innerHTML = ''
    // HINT: Create a div with class 'pokemon-card'
    // HINT: Set innerHTML with: id, sprite image, name, types, and hp
    // HINT: Append the card to the grid



}

// TODO: Create clearStorage function
function clearStorage() {
    // Clear localStorage and reset display
    // HINT: Use localStorage.removeItem(STORAGE_KEY)
    // HINT: Clear the grid: document.getElementById('pokemonGrid').innerHTML = ''
    // HINT: Reset currentPokemon to null
    // HINT: Call updateButtonStates()


}

// TODO: Create updateButtonStates function
function updateButtonStates() {
    // Update button enabled/disabled states based on data
    // HINT: Check if localStorage has data: localStorage.getItem(STORAGE_KEY) !== null
    // HINT: Check if currentPokemon exists
    // HINT: Load API button: disabled when localStorage has data
    // HINT: Save button: enabled when currentPokemon exists but not saved yet
    // HINT: Clear button: enabled when localStorage has data



}