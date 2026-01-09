// script.js
// validateForm will be completed by students.
// Goals:
// 1) Prevent default submission
// 2) Check required fields (name, email, trainer)
// 3) Show helpful messages near fields or via alert()
function validateForm(e) {
  e.preventDefault(); // Stop the form from submitting to let us validate first
  alert('validation goes here'); // TODO: Replace with real checks and messages

  // Example plan:
  // const name = document.getElementById('name').value.trim();
  // const email = document.getElementById('email').value.trim();
  // const trainer = document.getElementById('trainer').value;
  // if (!name) { /* show message */ }
  // if (!email) { /* check format with a simple regex */ }
  // if (!trainer) { /* ensure a selection */ }
}

// Wire up the submit handler after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  form.addEventListener('submit', validateForm);
});
