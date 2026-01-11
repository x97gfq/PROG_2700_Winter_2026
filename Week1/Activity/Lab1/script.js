
function validateForm(e) {
  let nameEl = document.getElementById("name");
  let emailEl = document.getElementById("email");
  let trainerEl = document.getElementById("trainer");

  let nameValue = (nameEl?.value || '').trim();
  let emailValue = (emailEl?.value || '').trim();
  let trainerValue = (trainerEl?.value || '').trim();

  let errors = [];

  if (nameValue.length == 0) {
    errors.push('You must enter a name');
  } else if (nameValue.length <= 3) {
    errors.push('Name must have at least 4 caracters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

  if (emailValue.length == 0) {
    errors.push('You must enter an email address.');
  } else if (!emailRegex.test(emailValue)) {
    errors.push('It looks like your email address is malformed.')
  }

  if (trainerValue.length == 0) {
    errors.push('You must selected a training level.')
  }

  if (errors.length != 0) {
    e.preventDefault();
    alert(errors.join('\n'));
  }
}

// Wire up the submit handler after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  form.addEventListener('submit', validateForm);
});
