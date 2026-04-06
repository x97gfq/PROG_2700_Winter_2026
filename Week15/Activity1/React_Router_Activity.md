# Week 14 — Activity 2: Game Shelf

## What You're Building

A simple game catalogue with three routes:

| Route | Page |
|-------|------|
| `/` | Home — welcome + link to list |
| `/games` | Game list — all games as cards |
| `/games/:id` | Game detail — one game's full info |

The structure is **identical** to the Watchlist demo from class — your job is to wire it
up yourself for a different dataset.

---

## Setup

```bash
npm create vite@latest game-shelf -- --template react
cd game-shelf && npm install react-router-dom && npm install
```

Copy in the files from `sample-code/` and run `npm run dev`.

---

## Key Things to Wire Up

### 1. Wrap the App in `<BrowserRouter>`

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/"          element={<Home />}       />
          <Route path="/games"     element={<GameList />}   />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="*"          element={<NotFound />}   />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
```

### 2. `NavLink` in the NavBar

```jsx
<NavLink to="/" end>Home</NavLink>
<NavLink to="/games">Games</NavLink>
```

The CSS class `active` is added automatically by React Router.

### 3. `useParams` in GameDetail

```jsx
const { id } = useParams();                          // always a string
const game = games.find((g) => g.id === parseInt(id)); // parseInt required
```

### 4. `useNavigate(-1)` for the Back button

```jsx
const navigate = useNavigate();
<button onClick={() => navigate(-1)}>← Back</button>
```

---

## Mini Challenges

### Challenge 1 — Game Count Badge
Show the number of games next to the "Games" NavLink: `Games (4)`

**Hint:** Import `games` into `NavBar.jsx` and use `games.length`.

### Challenge 2 — Previous / Next Game
In `GameDetail`, add Previous and Next links that navigate to `/games/:prevId` and `/games/:nextId`.

**Hint:** `games.find(g => g.id === game.id - 1)` to check if a neighbour exists.

### Challenge 3 — Add Your Own Games
Add two games to `data/games.js` that you'd actually recommend. Confirm they show up
in the list and their detail pages work.

---

## Wrap-Up

- `<BrowserRouter>` wraps everything once at the top level
- `<Routes>` picks the first matching route
- `<NavLink>` gets `.active` class automatically — just style it in CSS
- `useParams` gives you the `:id` — always a string, always `parseInt()`
- `useNavigate(-1)` = the back button
