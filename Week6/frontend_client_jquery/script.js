$(document).ready(function () {
    const $container = $('#pokemon-container');
    const API_URL = 'http://localhost:3000/pokemon';

    $.ajax({
        url: API_URL,
        method: 'GET',
        dataType: 'json',
        success: function (pokemons) {
            // Clear loading text
            $container.empty();

            $.each(pokemons, function (index, pokemon) {
                const $card = createPokemonCard(pokemon);
                $container.append($card);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching Pokemon:', error);
            $container.html('<p class="error">Failed to load Pokemon data. Is the backend running?</p>');
        }
    });
});

function createPokemonCard(pokemon) {
    // Create element with jQuery
    const $card = $('<div>').addClass('card');

    const cardContent = `
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

    $card.html(cardContent);

    return $card;
}
