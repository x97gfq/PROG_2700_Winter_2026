// Counter state
let count = 0;

// Utility function to update the display (declared function)
function updateDisplay(newValue) {
    const display = document.getElementById('display');
    display.textContent = newValue;

    // Add pulse animation
    display.classList.add('pulse');
    setTimeout(() => {
        display.classList.remove('pulse');
    }, 200);
}

// Function expression for increment button
const handleIncrement = function () {
    count++;
    updateDisplay(count);
};

// Function expression for decrement button
const handleDecrement = function () {
    count--;
    updateDisplay(count);
};

// Function expression for reset button
const handleReset = function () {
    count = 0;
    updateDisplay(count);
};

// Bind function expressions to onclick handlers
document.getElementById('incrementBtn').onclick = handleIncrement;
document.getElementById('decrementBtn').onclick = handleDecrement;
document.getElementById('resetBtn').onclick = handleReset;
