// Array to store quotes
let quotes = [];

// Load quotes from local storage on page load
$(document).ready(function () {

    // Event listener for fetch quote button
    $('#fetchQuote').on('click', fetchRandomQuote);

});

// Fetch a random quote from the API
function fetchRandomQuote() {

    $.ajax({
        url: 'https://api.quotable.io/random',
        method: 'GET',
        success: function (data) {
            //
            //
            console.log("data", data);
            //
            //
        },
        error: function (error) {
            console.error('Error fetching quote:', error);
            alert('Failed to fetch quote. Please try again.');
        }
    });
}

// Render all quotes to the DOM
function renderQuotes() {
    /*
    <div class="card quote-card">
        <div class="card-body">
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-author">— ${quote.author}</p>
            <button class="btn btn-danger btn-sm btn-dismiss" data-id="${quote.id}">
                Dismiss
            </button>
        </div>
    </div>
    */
    // Add event listeners to dismiss buttons
    //
    //
}

// Remove a quote from the array
function dismissQuote(quoteId) {
    //
    //
    //
}

