// TODO: Add event listener to the search button
// HINT: Use document.getElementById('searchBtn').addEventListener('click', searchPokemon);


// TODO: BONUS - Add Enter key support for the input field
// HINT: document.getElementById('pokemonInput').addEventListener('keypress', (e) => { ... });


// TODO: Create the searchPokemon function
async function searchPokemon() {
    // TODO: Get the input value
    // HINT: const pokemonName = document.getElementById('pokemonInput').value;


    // TODO: Validate input - check if it's empty
    // HINT: if (!pokemonName.trim()) { show error message }


    // TODO: Get references to loading, error, and result elements


    // TODO: Show loading, hide error and result


    try {
        // TODO: Fetch data from the Pokemon API
        // HINT: const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);


        // TODO: Check if response is ok (status 200)
        // HINT: if (!response.ok) { throw new Error('Pokemon not found!'); }


        // TODO: Parse the JSON response
        // HINT: const data = await response.json();


        // TODO: Hide loading


        // TODO: Display the result
        // Call the displayPokemon function with the data
        // HINT: displayPokemon(data);

    } catch (error) {
        // TODO: Handle errors
        // Hide loading, show error message

    }
}


// TODO: Create the displayPokemon function
function displayPokemon(data) {
    // TODO: Get the result element


    // TODO: Show the result element


    // TODO: Create HTML to display Pokemon information
    // Include: image, name, height, weight, types, and abilities
    // HINT: Use data.sprites.front_default for image
    // HINT: Use data.types.map(t => t.type.name).join(', ') for types
    // HINT: Use data.abilities.map(a => a.ability.name).join(', ') for abilities

}
