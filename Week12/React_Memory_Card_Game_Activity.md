# React Memory Card Game — Guided Classroom Activity

In this activity you will build a classic memory card matching game using React and Vite. You'll manage component state, handle user events, implement game logic with timers, and track a click counter — all core React patterns you'll use in real projects.

---

## Learning Goals

By the end of this activity you will be able to:

- Manage multiple pieces of state with `useState`
- Conditionally render UI based on state
- Use `useEffect` to trigger side effects (timers)
- Lift state up to a parent component
- Apply CSS classes conditionally

---

## Part 1 — Project Setup

Open a terminal and run:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. You should see the default Vite + React welcome page.

> **Reference:** [Vite Getting Started](https://vitejs.dev/guide/)

Clean up the boilerplate before continuing:

- Delete the contents of `src/App.css` (or leave it — we'll add our own styles)
- Delete `src/assets/react.svg` and `public/vite.svg` (optional)
- Replace `src/App.jsx` with a blank component for now:

```jsx
function App() {
  return <div className="app">Memory Card Game</div>;
}

export default App;
```

---

## Part 2 — Card Data

Create a new file: `src/data/cards.js`

This file exports an array of card objects. We have **6 unique emojis**, each appearing **twice**, giving us **12 cards** total. Each card has:

| Property    | Purpose                                      |
| ----------- | -------------------------------------------- |
| `id`        | Unique identifier for each card instance     |
| `emoji`     | The value we'll compare to find matches      |
| `isFlipped` | Whether the card is currently showing its face |
| `isMatched` | Whether this card has already been matched   |

```js
// src/data/cards.js

const CARD_DATA = [
  { id: 1,  emoji: "🐶", isFlipped: false, isMatched: false },
  { id: 2,  emoji: "🐱", isFlipped: false, isMatched: false },
  { id: 3,  emoji: "🦊", isFlipped: false, isMatched: false },
  { id: 4,  emoji: "🐸", isFlipped: false, isMatched: false },
  { id: 5,  emoji: "🦁", isFlipped: false, isMatched: false },
  { id: 6,  emoji: "🐼", isFlipped: false, isMatched: false },
  { id: 7,  emoji: "🐶", isFlipped: false, isMatched: false },
  { id: 8,  emoji: "🐱", isFlipped: false, isMatched: false },
  { id: 9,  emoji: "🦊", isFlipped: false, isMatched: false },
  { id: 10, emoji: "🐸", isFlipped: false, isMatched: false },
  { id: 11, emoji: "🦁", isFlipped: false, isMatched: false },
  { id: 12, emoji: "🐼", isFlipped: false, isMatched: false },
];

export default CARD_DATA;
```

> **Note:** Notice that the emoji values repeat (cards 1 and 7 are both `"🐶"`, etc.). That shared emoji value is what we'll compare when checking for a match.

---

## Part 3 — Shuffle the Cards

A memory game isn't much fun if the cards are always in the same order. Add a shuffle helper at the bottom of `cards.js`:

```js
// Add this to the bottom of src/data/cards.js

export function shuffleCards(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}
```

> **How does this work?** `Array.sort()` takes a comparator function. When it randomly returns a positive or negative number, elements end up in a random order. `[...cards]` creates a copy so we don't mutate the original array.
>
> **Reference:** [MDN — Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

---

## Part 4 — The Card Component

Create a new file: `src/components/Card.jsx`

This component renders a single card. It receives props from `App` and calls a handler when clicked.

```jsx
// src/components/Card.jsx

function Card({ card, onClick }) {
  const handleClick = () => {
    // Don't allow clicking already-matched or already-flipped cards
    if (card.isMatched || card.isFlipped) return;
    onClick(card.id);
  };

  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">{card.emoji}</div>
        <div className="card-back">?</div>
      </div>
    </div>
  );
}

export default Card;
```

**What are these props?**

| Prop      | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `card`    | object   | The card data object from our array      |
| `onClick` | function | Called with the card's `id` when clicked |

> **Why guard against clicking matched/flipped cards?**
> A matched card shouldn't be re-selected. A currently face-up card (while waiting for a second pick) shouldn't be re-clickable either.

---

## Part 5 — App State and Game Logic

Now the meat of the activity. Open `src/App.jsx` and build the game logic step by step.

### 5a — Imports and Initial State

```jsx
// src/App.jsx

import { useState, useEffect } from "react";
import CARD_DATA, { shuffleCards } from "./data/cards";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [cards, setCards] = useState(() => shuffleCards(CARD_DATA));
  const [flippedIds, setFlippedIds] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // ...game logic goes here

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <p>Clicks: {clicks}</p>
      <div className="grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

**State breakdown:**

| State variable | Purpose |
| -------------- | ------- |
| `cards`        | The full array of 12 card objects. We update `isFlipped` and `isMatched` here. |
| `flippedIds`   | Tracks the `id`s of cards currently face-up but not yet matched (max 2). |
| `clicks`       | Total number of card clicks the player has made. |
| `isLocked`     | Prevents the user from clicking more cards while a mismatch is being evaluated. |

> **Why `useState(() => shuffleCards(CARD_DATA))` with a function?**
> Passing a function (lazy initializer) means the shuffle only runs once when the component first mounts, not on every re-render.
>
> **Reference:** [React — useState lazy initializer](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)

---

### 5b — Handle a Card Click

Add this function inside `App`, above the `return`:

```jsx
const handleCardClick = (id) => {
  if (isLocked) return; // board is locked, ignore clicks

  setClicks((prev) => prev + 1);

  // Flip this card face-up in the cards array
  setCards((prev) =>
    prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
  );

  setFlippedIds((prev) => [...prev, id]);
};
```

**What is `...card`?**
The spread operator copies all existing properties of `card`, and then we override just `isFlipped`. This is how you update a single property of an object in React state without mutating it directly.

> **Reference:** [MDN — Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

---

### 5c — Check for a Match with useEffect

After every render, check whether two cards are face-up. If so, compare them.

```jsx
useEffect(() => {
  if (flippedIds.length !== 2) return; // wait until exactly 2 cards are flipped

  setIsLocked(true); // lock the board while we evaluate

  const [firstId, secondId] = flippedIds;
  const firstCard  = cards.find((c) => c.id === firstId);
  const secondCard = cards.find((c) => c.id === secondId);

  if (firstCard.emoji === secondCard.emoji) {
    // It's a match — mark both cards as matched
    setCards((prev) =>
      prev.map((card) =>
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card
      )
    );
    setFlippedIds([]);
    setIsLocked(false);
  } else {
    // No match — wait 3 seconds then flip both back
    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card
        )
      );
      setFlippedIds([]);
      setIsLocked(false);
    }, 3000);
  }
}, [flippedIds]);
```

**Why `useEffect` and not just logic in the click handler?**

`useEffect` runs *after* React has finished rendering. By the time it runs, the state update from `handleCardClick` (flipping the second card face-up) has already been applied, so the player actually sees the card flip before we evaluate the match. If we checked immediately in the click handler, the second card wouldn't visually flip first.

> **Reference:** [React — useEffect](https://react.dev/reference/react/useEffect)

**Why the dependency array `[flippedIds]`?**

This tells React to re-run the effect only when `flippedIds` changes — not on every render. Without it, the effect would run constantly.

---

### 5d — Win Detection (Bonus)

Add a derived value to check if the game is over (all cards matched):

```jsx
const isWon = cards.every((card) => card.isMatched);
```

Then show a message conditionally in the JSX:

```jsx
{isWon && <p className="win-message">You won in {clicks} clicks! 🎉</p>}
```

And a reset button:

```jsx
<button onClick={() => {
  setCards(shuffleCards(CARD_DATA));
  setFlippedIds([]);
  setClicks(0);
  setIsLocked(false);
}}>
  New Game
</button>
```

---

## Part 6 — Styling

Add this to `src/App.css`. Feel free to adjust colours and sizes:

```css
/* src/App.css */

body {
  margin: 0;
  font-family: sans-serif;
  background: #1a1a2e;
  color: #eee;
  display: flex;
  justify-content: center;
}

.app {
  text-align: center;
  padding: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 1rem;
  margin: 2rem auto;
  width: fit-content;
}

/* ---- Card flip effect ---- */

.card {
  width: 100px;
  height: 100px;
  cursor: pointer;
  perspective: 600px; /* enables 3D depth for children */
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}

/* When .flipped or .matched is on the outer .card, rotate the inner element */
.card.flipped .card-inner,
.card.matched .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* hide the back side when facing away */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.card-back {
  background: #16213e;
  border: 2px solid #0f3460;
  color: #e94560;
  font-size: 2rem;
}

.card-front {
  background: #0f3460;
  border: 2px solid #e94560;
  transform: rotateY(180deg); /* pre-rotated so it shows when card is flipped */
}

.card.matched .card-inner {
  opacity: 0.5;
}

.win-message {
  font-size: 1.5rem;
  color: #e94560;
  margin-top: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #c73652;
}
```

**The CSS flip trick explained:**

1. The outer `.card` has `perspective` set — this gives child elements a sense of 3D depth.
2. `.card-inner` has `transform-style: preserve-3d` — this tells the browser to keep child elements in 3D space rather than flattening them.
3. `.card-front` starts at `rotateY(180deg)` — it faces away from you initially.
4. `.card-back` starts at `rotateY(0deg)` — it faces you initially (showing `?`).
5. When `.flipped` is added to `.card`, the `.card-inner` rotates 180°. Now the front faces you and the back faces away.
6. `backface-visibility: hidden` makes each side invisible when it's facing away.

> **Reference:** [MDN — CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms)

---

## Complete File Reference

```
my-app/
├── src/
│   ├── components/
│   │   └── Card.jsx
│   ├── data/
│   │   └── cards.js
│   ├── App.jsx
│   └── App.css
├── index.html
└── package.json
```

---

## Stretch Challenges

Once the base game works, try these on your own:

1. **Best score** — store the lowest click count in `localStorage` and display it.
2. **Timer** — add a countdown or elapsed-time display using `useEffect` and `setInterval`.
3. **Difficulty** — add a selector that changes the grid size (e.g., 4×4 vs 6×4).
4. **Animations** — add a brief "shake" CSS animation on mismatch instead of just flipping back silently.
5. **Sound** — play a short sound on match using the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

---

## Key Concepts Review

| Concept | Where it appears |
| ------- | ---------------- |
| `useState` | Tracking cards, flipped IDs, click count, and lock state |
| Lazy initializer | `useState(() => shuffleCards(...))` — run once on mount |
| Immutable state updates | Spread operator to update a single card property |
| `useEffect` + dependency array | Running match-check logic after render |
| `setTimeout` | Delaying the flip-back on mismatch |
| Conditional CSS classes | `.flipped`, `.matched` applied based on state |
| Lifting state up | Card click logic lives in `App`, passed down as a prop |
| Derived state | `isWon` computed from `cards` — no extra state variable needed |

---

## References

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [MDN — useState](https://react.dev/reference/react/useState)
- [MDN — useEffect](https://react.dev/reference/react/useEffect)
- [MDN — Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN — Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN — Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN — CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms)
- [MDN — setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
