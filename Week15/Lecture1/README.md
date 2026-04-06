# Week 14 — Lecture 2: React Router
# Slide Outline · PROG 2700

---

## SLIDE 1 — Title

**Client-Side Routing with React Router**
PROG 2700 — Week 14, Lecture 2

> Today: how to give your React app multiple pages with real URLs.

---

## SLIDE 2 — The Problem

Every React app you've built so far has ONE URL. Click around, the address bar never changes.

- Can't bookmark a specific page
- Refresh always resets to the beginning
- Back button does nothing
- You can't share a link to a specific screen

React Router fixes this — without ever reloading the page.

> Ask: when we clicked between Sign-In and the main view last week — did the URL change?
> No. Today we fix that.

---

## SLIDE 3 — Install + Wrap

```bash
npm install react-router-dom
```

Then wrap your whole app:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"        element={<Home />}     />
        <Route path="/shows"   element={<ShowList />} />
        <Route path="/shows/:id" element={<ShowDetail />} />
        <Route path="*"        element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- `BrowserRouter` — wraps everything, provides URL context
- `Routes` — renders the **first** matching route
- `*` — catches anything that didn't match

> BrowserRouter gives every component in the tree access to the current URL.
> Components outside it can't use Link, NavLink, or any routing hooks.

---

## SLIDE 4 — Link and NavLink

Replace `<a href>` with `<Link to>`:

```jsx
import { Link, NavLink } from "react-router-dom";

// In content — just navigate
<Link to="/shows">Browse Shows</Link>

// In a NavBar — automatically gets .active CSS class on current page
<NavLink to="/shows">Shows</NavLink>
```

```css
/* React Router adds this class for you */
.navbar a.active {
  background: #4f46e5;
  color: white;
}
```

The `end` prop on a home link: `<NavLink to="/" end>` — only active on exact `/`.

> Without `end`, the Home link would be active on /shows too (prefix match).
> Show this live: remove `end` and navigate to /shows.

---

## SLIDE 5 — URL Parameters: `useParams`

Define a route with `:id`:

```jsx
<Route path="/shows/:id" element={<ShowDetail />} />
```

Read it in the component:

```jsx
import { useParams } from "react-router-dom";

function ShowDetail() {
  const { id } = useParams();   // always a string: "2"

  const show = shows.find((s) => s.id === parseInt(id));  // parseInt!
}
```

`useParams` values are **always strings** — even for numbers.
`parseInt()` is required when comparing to numeric IDs.

> The #1 student bug: s.id === id compares number to string (always false with ===).
> Demo this in the console: 2 === "2" → false.

---

## SLIDE 6 — Programmatic Navigation: `useNavigate`

When you need to navigate from an event (not a link):

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<button onClick={() => navigate(-1)}>← Back</button>
```

| Call | Effect |
|------|--------|
| `navigate("/shows")` | Go to /shows |
| `navigate(-1)` | Go back (browser history) |

> navigate(-1) is the same as clicking the browser back button.
> Use `<Link>` for links — use `useNavigate` when navigation is triggered by logic.

---

## SLIDE 7 — Demo: My Watchlist

> Open Week14/Lecture2/sample-code/ → npm install react-router-dom && npm install && npm run dev
>
> 1. Click Shows in the navbar — URL changes to /shows, link turns blue
> 2. Click Details on a show — URL changes to /shows/2
> 3. Click ← Back — returns to /shows
> 4. Type /shows/99 in the address bar — fallback message (no show with that ID)
> 5. Type /anything → 404 page
> 6. Walk through NavBar.jsx (NavLink), App.jsx (Routes), ShowDetail.jsx (useParams + useNavigate)

---

## SLIDE 8 — Activity 2

**Activity 2 — Game Shelf** (`Week14/Activity2/`)

Same structure as the demo — just a different dataset (indie games):

- `/` Home, `/games` Game list, `/games/:id` Game detail
- NavBar with `NavLink`, active state styling already in CSS
- `useParams` + `parseInt(id)` in GameDetail
- `useNavigate(-1)` back button

Mini challenges: game count badge in nav, previous/next game links, add your own games

> ~20 min. The pattern is identical to the demo — the goal is to build it themselves
> so the hooks become muscle memory.

---

## SLIDE 9 — Summary

- `npm install react-router-dom` once per project
- `<BrowserRouter>` wraps the app — provides URL context to everything inside
- `<Routes>` + `<Route path="..." element={...} />` — renders the first match
- `<Link>` for content links, `<NavLink>` for nav items (gets `.active` class)
- `useParams()` — reads `:id` from the URL (always a string — `parseInt()` it)
- `useNavigate(-1)` — goes back; `navigate("/path")` — goes to a specific path
- `<Route path="*">` — always add a 404 fallback

---

*End of Lecture 2*
