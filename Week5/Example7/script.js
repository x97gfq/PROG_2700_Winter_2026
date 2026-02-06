// Get DOM elements
const keyInput = document.getElementById('keyInput');
const valueInput = document.getElementById('valueInput');
const addBtn = document.getElementById('addBtn');
const storageList = document.getElementById('storageList');

// Add event listener for add button
addBtn.addEventListener('click', addItem);

// Allow Enter key to add item
keyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

valueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

// Load and display items on page load
window.addEventListener('DOMContentLoaded', displayItems);

// Add item to localStorage
function addItem() {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    // Validate inputs
    if (!key) {
        alert('Please enter a key name');
        keyInput.focus();
        return;
    }

    if (!value) {
        alert('Please enter a value');
        valueInput.focus();
        return;
    }

    // Add to localStorage
    localStorage.setItem(key, value);
    console.log(`✓ Added: ${key} = ${value}`);

    // Clear inputs
    keyInput.value = '';
    valueInput.value = '';
    keyInput.focus();

    // Refresh display
    displayItems();
}

// Display all localStorage items
function displayItems() {
    storageList.innerHTML = '';

    // Get all localStorage keys
    const keys = Object.keys(localStorage);

    // Check if localStorage is empty
    if (keys.length === 0) {
        storageList.innerHTML = '<p class="empty-message">No items in localStorage</p>';
        return;
    }

    // Sort keys alphabetically
    keys.sort();

    // Create item card for each key-value pair
    keys.forEach(key => {
        const value = localStorage.getItem(key);

        const itemDiv = document.createElement('div');
        itemDiv.className = 'storage-item';

        itemDiv.innerHTML = `
            <div class="storage-item-info">
                <div class="storage-item-key">${key}</div>
                <div class="storage-item-value">${value}</div>
            </div>
            <button class="delete-btn" onclick="deleteItem('${key}')">Delete</button>
        `;

        storageList.appendChild(itemDiv);
    });

    console.log(`📋 Displaying ${keys.length} items`);
}

// Delete item from localStorage
function deleteItem(key) {
    if (confirm(`Delete "${key}"?`)) {
        localStorage.removeItem(key);
        console.log(`🗑️ Deleted: ${key}`);
        displayItems();
    }
}
