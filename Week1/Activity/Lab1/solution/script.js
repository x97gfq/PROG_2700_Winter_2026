
// script.js (bare bones validation with simple regex)

function validateForm(e) {
  const errors = [];

  // Grab values
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const trainerEl = document.getElementById('trainer');

  const name = (nameEl?.value || '').trim();
  const email = (emailEl?.value || '').trim();
  const trainer = (trainerEl?.value || '').trim();

  // Name: required, at least 2 characters
  if (!name) {
    errors.push('Name is required.');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  // Email: basic pattern (simple, not exhaustive)
  // Explanation: one or more non-whitespace before/after "@", then a dot and 2+ letters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  if (!email) {
    errors.push('Email is required.');
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address (e.g., ash@kanto.com).');
  }

  // Trainer level: ensure a value is selected
  if (!trainer) {
    errors.push('Please select your Trainer Level.');
  }

  // If invalid, prevent and alert; otherwise let the form submit
  if (errors.length > 0) {
    e.preventDefault();
    alert(errors.join('\n'));
  }
}

// Wire up after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  if (form) {
    form.addEventListener('submit', validateForm);
  }
});