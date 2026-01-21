// Stopwatch state variables
let seconds = 0;
let intervalId = null;
let isRunning = false;

// Get DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');

// Utility function: Format time as HH:MM:SS
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    // Pad with leading zeros
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

// Utility function: Update the display
function updateDisplay() {
    display.textContent = formatTime(seconds);
}

// Utility function: Enable/disable buttons
function updateButtons(start, pause, stop) {
    startBtn.disabled = !start;
    pauseBtn.disabled = !pause;
    stopBtn.disabled = !stop;
}

// Event handler: Start button click
const handleStart = function () {
    if (!isRunning) {
        isRunning = true;

        // Use setInterval to increment every second
        intervalId = setInterval(function () {
            seconds++;
            updateDisplay();
        }, 1000);

        updateButtons(false, true, true);
    }
};

// Event handler: Pause button click
const handlePause = function () {
    if (isRunning) {
        isRunning = false;

        // Use clearInterval to stop the timer
        clearInterval(intervalId);
        intervalId = null;

        updateButtons(true, false, true);
    }
};

// Event handler: Stop button click
const handleStop = function () {
    isRunning = false;

    // Clear the interval if running
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }

    // Reset seconds and display
    seconds = 0;
    updateDisplay();

    updateButtons(true, false, false);
};

// Attach event listeners
startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
