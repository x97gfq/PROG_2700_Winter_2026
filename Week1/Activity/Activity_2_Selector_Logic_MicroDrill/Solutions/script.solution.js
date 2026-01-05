
// Solution: variables + conditional toggling .error with simple checks
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const msg = document.getElementById('msg');

function isEmailLike(v){ 
  return v.includes('@') && v.includes('.'); 
}

function setError(el, on){ 
  el.classList.toggle('error', !!on); 
}

emailInput.addEventListener('blur', () => {
  const ok = isEmailLike(emailInput.value);
  setError(emailInput, !ok);
  msg.textContent = ok ? '' : 'Please enter a valid email (demo check).';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailOk = isEmailLike(emailInput.value);
  const passOk = passwordInput.value.length >= 6;
  setError(emailInput, !emailOk);
  setError(passwordInput, !passOk);
  msg.textContent = (emailOk && passOk) ? '✅ Looks good (demo).' : '⚠️ Check your inputs.';
});
