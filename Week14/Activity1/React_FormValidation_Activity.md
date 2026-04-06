# Week 14 — Activity 1: Sign-Up Form Validation

## What You're Building

A sign-up form with three fields: **Email**, **Password**, and **Confirm Password**.
The one new concept from the lecture: **passwords must match** — a cross-field validation rule.

---

## Setup

```bash
npm create vite@latest signup-app -- --template react
cd signup-app && npm install
```

Copy in the files from `sample-code/` and run `npm run dev`.

---

## File Structure

```
src/
├── App.jsx
├── App.css
└── components/
    └── SignUpForm.jsx
```

---

## Step 1 — App.jsx

`App` holds one piece of state: the account object (or `null` if not yet created).

```jsx
const [account, setAccount] = useState(null);
```

If `account` is set, show a success message. Otherwise, show `<SignUpForm onSignUp={setAccount} />`.

---

## Step 2 — The `validate()` Function

Three rules — the first two are the same as the lecture, the third is new:

```jsx
function validate() {
  const e = {};

  if (!email.trim())   e.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";

  if (!password)       e.password = "Password is required.";
  else if (password.length < 6) e.password = "Min. 6 characters.";

  if (!confirm)        e.confirm = "Please confirm your password.";
  else if (confirm !== password) e.confirm = "Passwords do not match.";  // ← new!

  return e;
}
```

The `confirm !== password` check is a **cross-field** rule — it needs to look at two fields at once.

---

## Step 3 — The Submit Handler

Same pattern as the lecture:

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const errs = validate();
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    onSignUp({ email, password });
  }
}
```

---

## Step 4 — Displaying Errors

For each field, show the error below the input:

```jsx
<div className="field">
  <label htmlFor="confirm">Confirm Password</label>
  <input id="confirm" type="password" value={confirm}
    onChange={(e) => setConfirm(e.target.value)} />
  {errors.confirm && <span className="error">{errors.confirm}</span>}
</div>
```

---

## Mini Challenges

### Challenge 1 — Real-Time Match Indicator
Show a small `✓ Passwords match` or `✗ Passwords don't match` message below Confirm Password
while the user types — before they even submit.

**Hint:** `{confirm && (confirm === password ? "✓ match" : "✗ no match")}`

### Challenge 2 — Show/Hide Password
Add a toggle button next to the Password field that switches the `type` between `"password"`
and `"text"`.

**Hint:** `const [show, setShow] = useState(false)` — then `type={show ? "text" : "password"}`

---

## Wrap-Up

- `validate()` returns an object — empty means valid
- Cross-field rules check two state values at once (`confirm !== password`)
- The pattern is the same as the lecture — `validate()`, `setErrors()`, submit only when clean
