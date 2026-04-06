# Week 14 — Lab 1: Halifax Eats (Book a Table)

## What You're Building

A restaurant reservation app that combines form validation (Lecture 1) with React Router (Lecture 2):

| Route | Page |
|-------|------|
| `/` | Restaurant list — pick one |
| `/book/:id` | Booking form — name, email, guests |
| `/confirmation` | Confirmation — reads submitted data from navigation state |

---

## Setup

```bash
npm create vite@latest halifax-eats -- --template react
cd halifax-eats && npm install react-router-dom && npm install
```

Copy `sample-code/` files into `src/`, then `npm run dev`.

---

## Part 1 — Routes (10 min)

Open `App.jsx`. You'll see three routes. Navigate the live app:
- Click **Book a Table** on any restaurant card → URL changes to `/book/1`
- Submit the form → URL changes to `/confirmation`
- Use the browser back button → goes back to `/book/1`, then `/`

**Question:** The BookingForm and the Confirmation page are on completely separate routes.
How does Confirmation know the name, email, and restaurant? (Answer: navigation state — see Part 3.)

---

## Part 2 — Form Validation in BookingForm (20 min)

Open `BookingForm.jsx`. Find the `validate()` function.

1. Submit the form empty — confirm all three error messages appear.
2. Type a badly formatted email (`hello@bad`) — confirm the error.
3. Enter 0 guests — confirm the guests error (`Must be 1–10 guests.`).
4. Fill everything correctly — confirm it navigates to `/confirmation`.

**Key line to study:**

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const errs = validate();
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    navigate("/confirmation", { state: { name, email, guests, restaurant: restaurant.name } });
  }
}
```

Two things happen on a valid submit:
1. `navigate()` sends the user to `/confirmation`
2. The `state` object rides along with the navigation

---

## Part 3 — Reading Navigation State (15 min)

Open `Confirmation.jsx`:

```jsx
import { useLocation } from "react-router-dom";

const { state } = useLocation();
const { name, email, guests, restaurant } = state;
```

`useLocation().state` is whatever was passed as the second argument to `navigate()`.

**Test it:** Navigate to `/confirmation` directly in the address bar (no state).
You should see the fallback message. That's the `if (!state)` guard.

---

## Part 4 — useParams (10 min)

`BookingForm` uses `useParams` to find the right restaurant:

```jsx
const { id } = useParams();
const restaurant = restaurants.find((r) => r.id === parseInt(id));
```

**Test it:** Bookmark `/book/2` and navigate there directly. Does it still show
the correct restaurant? (Yes — the ID comes from the URL, not from React state.)

---

## Mini Challenges

### Challenge 1 — Date Field
Add a `date` input to the booking form with validation (field must not be empty).
Show the selected date on the confirmation screen.

### Challenge 2 — Guests Display
On the confirmation page, display "1 guest" (singular) or "3 guests" (plural) using
a simple ternary.

**Hint:** The solution already uses this — find it in `Confirmation.jsx`.

### Challenge 3 — Home Link on Confirmation
Add a count of how many restaurants are available somewhere on the Home page.

---

## Checklist

- [ ] Restaurant list renders at `/`
- [ ] Booking form shows the correct restaurant name at `/book/:id`
- [ ] Empty submit → all 3 errors show
- [ ] Invalid email → email format error
- [ ] Valid submit → navigates to `/confirmation`
- [ ] Confirmation shows name, restaurant, and guest count
- [ ] Direct navigation to `/confirmation` shows the fallback message
