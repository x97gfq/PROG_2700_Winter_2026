// Get references to DOM elements
const button = document.querySelector('.btn-primary');
const input = document.getElementById('word-output');

// Function to get a random word
function getRandomWord() {
    const words = ['rizz', 'skibidi', 'sigma', 'gyatt', 'fanum tax', 'bussin', 'no cap', 'slay', 'vibe check', 'sus'];
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    input.value = randomWord;
}

// Add event listener to button
button.addEventListener('click', getRandomWord);
