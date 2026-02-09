$(document).ready(function () {
    $('#get-random-btn').click(function () {
        // 1. Pick a random number 1-5 (since we know our seed data has these IDs)
        const randomId = Math.floor(Math.random() * 5) + 1;

        // 2. Use the SPECIFIC endpoint with the ID
        $.get(`http://localhost:3000/pokemon/${randomId}`, function (pokemon) {

            // 3. Build HTML
            const html = `
                <div class="pokemon-card">
                    <h2>${pokemon.name}</h2>
                    <p><strong>Type:</strong> ${pokemon.type}</p>
                    <p>HP: ${pokemon.hp} | ATK: ${pokemon.attack}</p>
                </div>
            `;

            // 4. Display
            $('#result-area').hide().html(html).fadeIn();

        }).fail(function () {
            $('#result-area').html('<p style="color:red">Error connecting to server!</p>');
        });
    });
});
