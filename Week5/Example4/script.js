// Get form and output elements
const form = document.getElementById('trainerForm');
const jsonOutput = document.getElementById('jsonOutput');
const jsonDisplay = document.getElementById('jsonDisplay');

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Collect form data and convert to JSON object
    const trainerData = {
        name: document.getElementById('trainerName').value,
        age: parseInt(document.getElementById('age').value),
        hometown: document.getElementById('hometown').value,
        favoritePokemon: document.getElementById('favoritePokemon').value,
        isChampion: document.getElementById('isChampion').checked,
        createdAt: new Date().toISOString()
    };

    // Convert to JSON string (formatted for readability)
    const jsonString = JSON.stringify(trainerData, null, 2);

    // Display the JSON
    jsonDisplay.textContent = jsonString;
    jsonOutput.classList.remove('hidden');

    // Log to console (normally you'd send this to an API)
    console.log('Trainer Profile JSON:', jsonString);
    console.log('Ready to POST to API:', trainerData);

    // Simulate API call (commented out)
    // fetch('https://api.example.com/trainers', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: jsonString
    // });
});
