// Reference: https://www.w3schools.com/jquery/default.asp
// Array to store quotes
let quotes = [];

// Load quotes from local storage on page load
$(document).ready(function () {
    loadFromLocalStorage();
    renderQuotes();

    // Event listener for fetch quote button
    $('#fetchQuote').on('click', fetchRandomQuote);
});

// Fetch a random quote from the API
function fetchRandomQuote() {
    $.ajax({
        url: 'https://api.quotable.io/random',
        method: 'GET',
        success: function (data) {
            // Create quote object
            const quote = {
                id: Date.now(), // Use timestamp as unique ID
                text: data.content,
                author: data.author
            };

            // Add to array
            quotes.push(quote);

            // Re-render the quotes
            renderQuotes();

            // Update local storage
            saveToLocalStorage();
        },
        error: function (error) {
            console.error('Error fetching quote:', error);
            alert('Failed to fetch quote. Please try again.');
        }
    });
}

// Render all quotes to the DOM
function renderQuotes() {
    const container = $('#quotesContainer');

    // Clear existing content
    container.empty();

    // Check if there are no quotes
    if (quotes.length === 0) {
        container.html('<p class="text-center text-white">No quotes yet. Click the button to get started!</p>');
        return;
    }

    // Render each quote
    $.each(quotes, function (index, quote) {
        const quoteCard = $(`
            <div class="card quote-card">
                <div class="card-body">
                    <p class="quote-text">"${quote.text}"</p>
                    <p class="quote-author">— ${quote.author}</p>
                    <button class="btn btn-danger btn-sm btn-dismiss" data-id="${quote.id}">
                        Dismiss
                    </button>
                </div>
            </div>
        `);

        container.append(quoteCard);
    });

    // Add event listeners to dismiss buttons
    $('.btn-dismiss').on('click', function () {
        const quoteId = $(this).data('id');
        dismissQuote(quoteId);
    });
}

// Remove a quote from the array
function dismissQuote(quoteId) {
    // Filter out the quote with the matching ID
    quotes = quotes.filter(function (quote) {
        return quote.id !== quoteId;
    });

    // Re-render the quotes
    renderQuotes();

    // Update local storage
    saveToLocalStorage();
}

// BONUS: Save quotes to local storage
function saveToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// BONUS: Load quotes from local storage
function loadFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}
