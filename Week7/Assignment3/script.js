// Reference: https://www.w3schools.com/jquery/default.asp
// Array to store jokes
let jokes = [];

// Load quotes from local storage on page load
$(document).ready(function () {
    loadFromLocalStorage();
    renderJokes();

    // Event listener for fetch quote button
    $('#fetchJoke').on('click', fetchRandomJoke);
});
 
// Fetch a random quote from the API
function fetchRandomJoke() {
    $.ajax({
        url: 'https://official-joke-api.appspot.com/jokes/random',
        method: 'GET',
        success: function (data) {
            // Create quote object
            const joke = {
                id: data.id, // Use joke ID as unique ID
                setup: data.setup,
                punchline: data.punchline
            };

            // Add to array
            jokes.push(joke);

            // Re-render the quotes
            renderJokes();

            // Update local storage
            saveToLocalStorage();
        },
        error: function (error) {
            console.error('Error fetching joke:', error);
            alert('Failed to fetch joke. Please try again.');
        }
    });
}

// Render all quotes to the DOM
function renderJokes() {
    const container = $('#jokesContainer');

    // Clear existing content
    container.empty();

    // Check if there are no quotes
    if (jokes.length === 0) {
        container.html('<p class="text-center text-white">No jookes yet. Click the button to get started!</p>');
        return;
    }

    // Render each quote
    $.each(jokes, function (index, joke) {
        const jokeCard = $(`
            <div class="card quote-card">
                <div class="card-body">
                    <p class="quote-text">"${joke.setup}"</p>
                    <p class="quote-author">— ${joke.punchline}</p>
                    <button class="btn btn-danger btn-sm btn-dismiss" data-id="${joke.id}">
                        Dismiss
                    </button>
                </div>
            </div>
        `);

        container.append(jokeCard);
    });

    // Add event listeners to dismiss buttons
    $('.btn-dismiss').on('click', function () {
        const jokeId = $(this).data('id');
        dismissJoke(jokeId);
    });
}

// Remove a quote from the array
function dismissJoke(jokeId) {
    // Filter out the quote with the matching ID
    jokes = jokes.filter(function (joke) {
        return joke.id !== jokeId;
    });

    // Re-render the quotes
    renderJokes();

    // Update local storage
    saveToLocalStorage();
}

// BONUS: Save quotes to local storage
function saveToLocalStorage() {
    localStorage.setItem('jokes', JSON.stringify(jokes));
}

// BONUS: Load quotes from local storage
function loadFromLocalStorage() {
    const storedJokes = localStorage.getItem('jokes');
    if (storedJokes) {
        jokes = JSON.parse(storedJokes);
    }
}
