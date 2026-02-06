// Get DOM elements
const loginSection = document.getElementById('loginSection');
const welcomeSection = document.getElementById('welcomeSection');
const nameInput = document.getElementById('nameInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const displayName = document.getElementById('displayName');

// Check login status on page load
window.addEventListener('DOMContentLoaded', checkLoginStatus);

// Add event listeners
loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);

// Allow Enter key to login
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

// Check if user is logged in
function checkLoginStatus() {
    const username = localStorage.getItem('username');

    if (username) {
        // User is logged in - show welcome section
        showWelcome(username);
    } else {
        // User is not logged in - show login section
        showLogin();
    }
}

// Show login section
function showLogin() {
    loginSection.classList.remove('hidden');
    welcomeSection.classList.add('hidden');
    nameInput.focus();
    console.log('📝 Showing login form');
}

// Show welcome section
function showWelcome(username) {
    loginSection.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
    displayName.textContent = username;
    console.log(`👋 Welcome back, ${username}!`);
}

// Login function
function login() {
    const username = nameInput.value.trim();

    // Validate input
    if (!username) {
        alert('Please enter your name');
        nameInput.focus();
        return;
    }

    // Save to localStorage
    localStorage.setItem('username', username);
    console.log(`✓ Logged in as: ${username}`);

    // Clear input
    nameInput.value = '';

    // Show welcome section
    showWelcome(username);
}

// Logout function
function logout() {
    const username = localStorage.getItem('username');

    // Clear localStorage
    localStorage.removeItem('username');
    console.log(`👋 Logged out: ${username}`);

    // Refresh the page
    location.reload();
}
