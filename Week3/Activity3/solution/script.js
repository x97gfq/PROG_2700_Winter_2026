// Define a class for Attendee
class Attendee {
    constructor(name, email, favoritePokemon) {
        this.name = name;
        this.email = email;
        this.favoritePokemon = favoritePokemon;
    }
}

// Array to store attendees
let attendees = [];

// Get DOM elements
const form = document.getElementById('registrationForm');
const attendeesList = document.getElementById('attendeesList');
const attendeeCount = document.getElementById('attendeeCount');

// Utility function: Update the attendees list display
function updateAttendeesList() {
    // Clear current list
    attendeesList.innerHTML = '';

    // If no attendees, show message
    if (attendees.length === 0) {
        attendeesList.innerHTML = '<p class="text-muted">No attendees registered yet.</p>';
        attendeeCount.textContent = '0';
        return;
    }

    // Display each attendee
    attendees.forEach(function (attendee) {
        const attendeeCard = document.createElement('div');
        attendeeCard.className = 'attendee-card';

        attendeeCard.innerHTML = `
            <div class="attendee-name">${attendee.name}</div>
            <div class="attendee-info">Email: ${attendee.email}</div>
            <div class="attendee-info">Favorite Pokemon: ${attendee.favoritePokemon}</div>
        `;

        attendeesList.appendChild(attendeeCard);
    });

    // Update count
    attendeeCount.textContent = attendees.length;
}

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
    const newAttendee = new Attendee(name, email, favoritePokemon);

    // Add to the array
    attendees.push(newAttendee);

    // Update the display
    updateAttendeesList();

    // Clear the form
    form.reset();

    // Focus back on name field
    nameInput.focus();
};

// Attach event listener to form
form.addEventListener('submit', handleFormSubmit);
