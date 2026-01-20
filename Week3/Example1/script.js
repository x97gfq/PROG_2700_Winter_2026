// Utility function (declared function)
function displayMessage(message) {
    const outputDiv = document.getElementById('output');
    const timestamp = new Date().toLocaleTimeString();
    outputDiv.textContent = `${message} (at ${timestamp})`;
}

// Function expression to bind to onclick handler
const handleButtonClick = function() {
    displayMessage('Button was clicked! Function expression called the utility function.');
};

// Bind the function expression to the button's onclick event
document.getElementById('myButton').onclick = handleButtonClick;
