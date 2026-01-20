// Declare variables (get references to elements)
const box = document.getElementById('box');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameOver = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');

// Set initial score and time
let score = 0;
let timeLeft = 30;
let timerInterval = null;

// Function declaration: increaseScore
function increaseScore() {
    score += 1;
    scoreEl.textContent = String(score);
}

// Function declaration: moveBox
function moveBox() {
    const maxX = Math.max(0, window.innerWidth - 100);
    const maxY = Math.max(0, window.innerHeight - 140);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    box.style.left = x + 'px';
    box.style.top = y + 'px';
    // Optional: change color for visual feedback
    box.style.background = `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`;
}

// Function declaration: updateTimer
function updateTimer() {
    timeLeft -= 1;
    timerEl.textContent = String(timeLeft);

    if (timeLeft <= 0) {
        endGame();
    }
}

// Function declaration: startGame
function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = '0';
    timerEl.textContent = '30';

    // Hide buttons and game over, show box
    startBtn.classList.add('hidden');
    gameOver.classList.add('hidden');
    box.classList.remove('hidden');

    // Position box initially
    moveBox();

    // Start the timer using setInterval
    timerInterval = setInterval(updateTimer, 1000);
}

// Function declaration: endGame
function endGame() {
    // Stop the timer using clearInterval
    clearInterval(timerInterval);

    // Hide the box
    box.classList.add('hidden');

    // Update and show game over screen
    finalScoreEl.textContent = String(score);
    gameOver.classList.remove('hidden');
}

// Function expression: handleClick
const handleClick = function () {
    increaseScore();
    moveBox();
};

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
box.addEventListener('click', handleClick);
