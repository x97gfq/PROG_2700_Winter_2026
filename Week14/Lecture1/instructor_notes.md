# Instructor Notes — React Form Validation

## Core Mental Model for Students

The hardest concept in this lecture is understanding **why three separate state objects** are needed.

Use this framing:

> "Think of a job application on paper. You have three things:
> - The form fields you've filled in (**values**)
> - The list of mistakes a reviewer found (**errors**)
> - A checkmark next to each field you've already looked at (**touched**)
>
> You only point out a mistake after the person has looked at that section.
> That's why we have touched — it tells us 'has the user visited this field yet?'"

---

## Why `validate()` is a Pure Function

This is worth 5 minutes to explain clearly, because it is a foundational software design concept.

A pure function:
1. Given the same inputs, always returns the same output
2. Has no side effects (doesn't change any external state)

Our `validate()` is pure:
- Input: `fieldValues` object
- Output: `errors` object
- No `setErrors` call inside it

Why does this matter?
- We can call it from `handleBlur`, `handleChange`, and `handleSubmit`
- We can call it with the current state OR with a just-updated object
- We could easily unit test it: `expect(validate({ email: "bad" })).toHaveProperty("email")`

If `validate()` called `setErrors` internally, we'd have a function that does two things
and couldn't be called safely from multiple places.

---

## The Async State Problem — Most Common Student Bug

This trips up almost every student the first time:

```jsx
function handleChange(e) {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });  // state update queued, not immediate

  setErrors(validate());  // BUG: validate() reads values, which is still the OLD value
}
```

The fix:

```jsx
const updated = { ...values, [name]: value };  // build new object first
setValues(updated);                             // queue state update
setErrors(validate(updated));                   // validate the new object immediately
```

Draw this on the board:
```
setValues({...})   → schedules a re-render with new values NEXT render
validate(values)   → reads values NOW → still has the old string
validate(updated)  → reads the object we just built → has the new string ✓
```

---

## The `reduce()` on Submit — Explain or Simplify

The `allTouched` creation:

```jsx
const allTouched = Object.keys(values).reduce(
  (acc, key) => ({ ...acc, [key]: true }),
  {}
);
```

If students are unfamiliar with `reduce`, offer this simpler alternative:

```jsx
const allTouched = {};
Object.keys(values).forEach(key => {
  allTouched[key] = true;
});
```

Both produce `{ firstName: true, lastName: true, email: true, ... }`.

The `reduce` version is more "functional" but not essential to understand right now.
Prioritise understanding the outcome (all fields marked as touched) over the mechanism.

---

## Checkbox Handling

Checkboxes are slightly different from text inputs because their value is `checked`, not `value`:

```jsx
function handleChange(e) {
  const { name, value, type, checked } = e.target;
  const fieldValue = type === "checkbox" ? checked : value;
  setValues({ ...values, [name]: fieldValue });
}
```

Emphasise: `type === "checkbox"` is how we distinguish checkboxes from text/email/select inputs.
This single generic handler works for all of them.

---

## Common Questions

### "Why use `noValidate` on the form?"

HTML5 browsers have their own validation for `type="email"`, `required`, etc. Their error messages
are styled by the browser (often ugly, inconsistent across browsers) and appear at different times
than our custom messages. `noValidate` turns off the browser validation entirely, giving us full control.

### "Can I just use the HTML `required` attribute?"

For simple forms with basic messages, yes. But the moment you need:
- Cross-field validation (password confirmation)
- Custom error message text that matches your design
- Different validation timing (blur vs submit)
- Validation in a test suite

...you need the JavaScript approach. Professional apps always use it.

### "What about async validation (checking if email is already taken)?"

Great question — save for Week 15 or a future unit. Async validation (calling an API from validate)
requires either making validate `async` or using a separate `useEffect` to watch the email field.
The foundation they're learning now is the prerequisite.

---

## Demo Tips

When running the live demo, this sequence reliably generates good discussion:

1. **Submit immediately** — all errors at once. Ask "why do all errors appear at once?" → because `handleSubmit` force-touches all fields
2. **Fix the email while it shows an error** — the error clears letter by letter. Ask "how does React know to re-run validation?" → `handleChange` calls `validate(updated)` if the field is touched
3. **Show the `validate` function in VS Code** — point out it just returns an object, nothing else
4. **Show how `errors.email` maps to the JSX** — trace from `setErrors` → `errors.email` → the span

---

## Timing

| Section | Estimated Time |
|---------|---------------|
| Why validate in React | 5 min |
| Controlled forms recap | 5 min |
| Multi-field state | 10 min |
| validate() function | 10 min |
| touched + blur pattern | 10 min |
| submit handler | 8 min |
| Demo walkthrough | 12 min |
| Activity 1 intro + work time | 30 min |
| **Total** | **~90 min** |

---

## Connection to Industry

Mention that React Hook Form (the most downloaded React library after React itself) implements
the exact same three-state pattern internally. Understanding the manual version means students
can read the RHF source code and understand exactly what it is doing.

Formik (used heavily at Shopify, Airbnb, and others) explicitly names its state objects
`values`, `errors`, and `touched` — the same names we use.

> "You've just learned how the internals of the two most popular form libraries in the
> world work. That's not an accident — we taught you the pattern first so the libraries
> feel obvious instead of magical."
