// Define a class for Attendee
class Attendee {
    constructor(name, email, favoritePokemon) {
        this.name = name;
        this.email = email;
        this.favoritePokemon = favoritePokemon;
    }
}

// Array to store attendees


// Get DOM elements


// Utility function: Update the attendees list display



// Event handler: Form submission
const handleFormSubmit = function (event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const pokemonInput = document.getElementById('favoritePokemon');

    const name = nameInput.value;
    const email = emailInput.value;
    const favoritePokemon = pokemonInput.value;

    // Create a new Attendee object
    //
    //

    // Add to the array
    //
    //

    // Update the display
    //
    //
    
    // Clear the form
    form.reset();

    // Focus back on name field
    nameInput.focus();
};

// Attach event listener to form
form.addEventListener('submit', handleFormSubmit);
