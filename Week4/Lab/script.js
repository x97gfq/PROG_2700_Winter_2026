// Sample contact data
let contacts = [
    { id: 1, name: "Alice Johnson", email: "alice@gmail.com", phone: "555-0101" },
    { id: 2, name: "Bob Smith", email: "bob@yahoo.com", phone: "555-0102" },
    { id: 3, name: "Charlie Brown", email: "charlie@gmail.com", phone: "555-0103" },
    { id: 4, name: "Diana Prince", email: "diana@hotmail.com", phone: "555-0104" },
    { id: 5, name: "Eve Wilson", email: "eve@gmail.com", phone: "555-0105" }
];

// TODO: Step 1 - Refactor this function to use map()
function renderContacts(contactsToRender = contacts) {
    const container = document.getElementById('contactsList');

    // Current implementation uses a traditional loop
    // REFACTOR THIS to use map() method
    let html = '';
    for (let i = 0; i < contactsToRender.length; i++) {
        const contact = contactsToRender[i];
        html += `
            <div class="contact-card">
                <h3>${contact.name}</h3>
                <p>📧 ${contact.email}</p>
                <p>📱 ${contact.phone}</p>
            </div>
        `;
    }
    container.innerHTML = html;
}

// TODO: Step 2 - Implement filter functionality
function setupFilter() {
    const searchInput = document.getElementById('searchInput');

    // Add event listener here
    // Use filter() method to filter contacts by name
    // Call renderContacts() with filtered results
}

// TODO: Step 3 - Use reduce() to compute statistics
function updateStatistics() {
    // Update total contacts count
    document.getElementById('totalContacts').textContent = contacts.length;

    // TODO: Use reduce() to count unique email domains
    // Extract domain from email (text after @)
    // Count unique domains
    // Update the uniqueDomains element
}

// TODO: Step 4 - Add try/catch for error handling
function addContact(name, email, phone) {
    // TODO: Wrap in try/catch
    // Validate inputs (see Step 5)
    // Create new contact object
    // Add to contacts array
    // Re-render and update stats
    // Show success toast
}

// TODO: Step 5 - Add input validation
function validateEmail(email) {
    // TODO: Check if email matches basic email pattern
    // Return true if valid, false otherwise
    return true; // Placeholder
}

function validateName(name) {
    // TODO: Check if name is not empty and has reasonable length
    return true; // Placeholder
}

// TODO: Implement toast notification system
function showToast(message, type = 'info') {
    // TODO: Show toast message
    // type can be 'success', 'error', or 'info'
    // Auto-hide after 3 seconds
}

// Setup add contact button
document.getElementById('addButton').addEventListener('click', function () {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;

    // TODO: Call addContact function with validation
    // Clear inputs after successful add
});

// Initialize the application
function init() {
    renderContacts();
    updateStatistics();
    setupFilter();
}

// Run initialization when page loads
init();
