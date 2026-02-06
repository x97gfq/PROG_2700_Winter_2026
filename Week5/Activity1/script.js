// TODO: Add event listener to the search button
document.getElementById("searchBtn").addEventListener("click", searchPokemon);

// TODO: BONUS - Add Enter key support for the input field
document.getElementById("pokemonInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchPokemon();
    }
})

// TODO: Create the searchPokemon function
async function searchPokemon() {
    // TODO: Get the input value
    const pokemonName = document.getElementById('pokemonInput').value;

    // TODO: Get references to loading, error, and result elements
    const error = document.getElementById("error");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    // TODO: Validate input - check if it's empty
    if (!pokemonName.trim()) { 
        error.classList.remove("hidden");
        error.textContent = "Please enter a Pokemon name!";
        result.classList.add("hidden");
        return;
    }

    // TODO: Show loading, hide error and result
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    result.classList.add("hidden");

    try {
        // TODO: Fetch data from the Pokemon API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

        // TODO: Check if response is ok (status 200)
        if (!response.ok) { 
            throw new Error('Pokemon not found!'); 
        }

        // TODO: Parse the JSON response
        const data = await response.json();

        // TODO: Hide loading
        loading.classList.add("hidden");

        // TODO: Display the result
        // Call the displayPokemon function with the data
        displayPokemon(data);

    } catch (error) {
        // TODO: Handle errors
        // Hide loading, show error message
        loading.classList.add("hidden");
        error.classList.remove("hidden");
        error.textContent = error.message;
    }
}


// TODO: Create the displayPokemon function
function displayPokemon(data) {
    const result = document.getElementById("result");
    result.classList.remove("hidden");

    result.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h2>${data.name}</h2>
        <div class="info-grid">
            <div class="info-item">Height: ${data.height}</div>
            <div class="info-item">Weight: ${data.weight}</div>
        </div>
    `;
}
