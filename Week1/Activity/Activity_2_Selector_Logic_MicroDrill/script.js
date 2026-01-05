
// ===== Selector & Logic Micro‑Drill =====
// Goal: Declare variables and use a simple conditional to toggle `.error`.

// Variables
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const msg = document.getElementById('msg');

// Helper: very simple email check (for demo only)
function isEmailLike(value) {
  return value.includes('@') && value.includes('.');
}

// On blur: toggle error class based on a simple conditional
emailInput.addEventListener('blur', () => {
  if (isEmailLike(emailInput.value)) {
    emailInput.classList.remove('error');
    msg.textContent = '';
  } else {
    emailInput.classList.add('error');
    msg.textContent = 'Please enter a valid email (demo check).';
  }
});

// On submit: prevent default and run same logic
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailOk = isEmailLike(emailInput.value);
  const passOk = passwordInput.value.length >= 6;

  if (emailOk && passOk) {
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    msg.textContent = '✅ Looks good (demo).';
  } else {
    if (!emailOk) emailInput.classList.add('error');
    if (!passOk) passwordInput.classList.add('error');
    msg.textContent = '⚠️ Check your inputs.';
  }
});

// TODO: Discuss: When to validate — on blur or on submit?
