# Week 14 — Lecture 1: Form Validation
# Slide Outline · PROG 2700

---

## SLIDE 1 — Title

**React Form Validation**
PROG 2700 — Week 14, Lecture 1

> Today: one new pattern — how to validate a form before submitting it.

---

## SLIDE 2 — The Problem

HTML `required` and `type="email"` are not enough:

- Can't check that passwords match
- Can't write your own error messages
- Can't control when errors appear
- Error styling is browser-specific (inconsistent)

Fix: add `noValidate` to your `<form>` and handle it yourself.

> Ask: who has filled out a form and been surprised by a random browser pop-up?
> That's exactly what noValidate turns off.

---

## SLIDE 3 — The Three Pieces

```jsx
const [name,   setName]   = useState("");  // the value the user typed
const [errors, setErrors] = useState({});  // { name: "Name is required." }
```

Then in JSX:

```jsx
<input value={name} onChange={(e) => setName(e.target.value)} />
{errors.name && <span className="error">{errors.name}</span>}
```

- If `errors.name` exists → show the message
- If it doesn't → render nothing

> The errors object is just a plain JavaScript object. An empty {} means "no errors, all good."

---

## SLIDE 4 — The `validate()` Function

```jsx
function validate() {
  const e = {};

  if (!name.trim())  e.name  = "Name is required.";

  if (!email.trim()) e.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";

  if (!message.trim()) e.message = "Message is required.";

  return e;  // empty object = valid form
}
```

- Returns an object — does NOT call `setErrors`
- Caller decides when to store the result

> Pure function: same input always gives same output. We can call it from handleSubmit
> without any side effects. Object.keys(e).length === 0 means "no errors".

---

## SLIDE 5 — The Submit Handler

```jsx
function handleSubmit(e) {
  e.preventDefault();           // stop the browser from reloading the page

  const errs = validate();
  setErrors(errs);

  if (Object.keys(errs).length === 0) {
    onSubmit(name);             // only runs if the form is clean
  }
}
```

And on the form element:

```jsx
<form onSubmit={handleSubmit} noValidate>
```

> e.preventDefault() is the most important line. Remove it and watch what happens
> (the page reloads and all state is lost). Demo this live.

---

## SLIDE 6 — Demo: Contact Form

> Open Week14/Lecture1/sample-code/  →  npm install && npm run dev
>
> 1. Click Send immediately — three red errors appear at once
> 2. Fill in the name and click Send again — name error gone, two remain
> 3. Type "bad-email" — email format error
> 4. Fix email — email error gone
> 5. Fill the message — all clean, success message appears
> 6. Click "Send another" — form resets

---

## SLIDE 7 — Activity 1

**Activity 1 — Sign-Up Form** (`Week14/Activity1/`)

Three fields: Email, Password, Confirm Password

- Email: required + valid format (same as demo)
- Password: required + min 6 characters
- Confirm Password: must match the Password field ← **new cross-field rule**

```jsx
else if (confirm !== password) e.confirm = "Passwords do not match.";
```

Mini challenges: real-time match indicator, show/hide password toggle

> ~20 min. The one new thing is the cross-field check — comparing two state values inside validate().

---

## SLIDE 8 — Summary

- `validate()` returns an errors object — empty = valid
- `setErrors(errs)` in the submit handler reveals all errors at once
- `e.preventDefault()` on every form submit — always
- Show errors: `{errors.name && <span>{errors.name}</span>}`
- Cross-field rule: compare two state values inside `validate()`

> Formik and React Hook Form use this exact same pattern internally —
> values, errors, and a validate function. You just built the core of those libraries by hand.

---

*End of Lecture 1*
