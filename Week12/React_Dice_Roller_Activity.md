# React Dice Roller — Guided Classroom Activity

In this activity you will build a two-dice roller in React. The goal is to get comfortable with `useState`, event handlers, conditional rendering, and how to break UI into reusable components using props.

[React State Vs Props](https://www.youtube.com/watch?v=IYvD9oBCuJI)

---

## Learning Goals

By the end of this activity you will be able to:

- Add and update state with `useState`
- Trigger a state update from a button click
- Derive a value from state instead of storing extra state
- Conditionally render an element based on state
- Extract a piece of UI into its own component and pass data to it via props

---

## Part 1 — Project Setup

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Open `http://localhost:5173`. You should see the default Vite welcome page.

Clean up before we start — replace `src/App.jsx` with a blank shell:

```jsx
function App() {
  return <div className="app">Dice Roller</div>;
}

export default App;
```

And delete everything in `src/App.css` so we can start fresh.

---

## Part 2 — The Die Component

Create a new file: `src/components/Die.jsx`

This component is responsible for displaying a single die face. It receives one prop — the current face value — and renders the matching emoji.

```jsx
// src/components/Die.jsx

const FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function Die({ value }) {
  return <span className="die">{FACES[value]}</span>;
}

export default Die;
```

**Breaking this down:**

- `FACES` is a local array — index `0` maps to ⚀, index `5` maps to ⚅
- `value` is a prop passed in from the parent (`App`). It's a number between 0 and 5.
- The component has no state of its own — it just displays what it's given. This is called a **presentational component**.

> **What are props?**
> Props are how a parent component passes data down to a child. They're read-only — the `Die` component can use `value` but cannot change it. Only the parent that owns the state can update it.
>
> **Reference:** [React — Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)

---

## Part 3 — State and the Roll Button

Now build `App.jsx`. This is where all the state lives.

```jsx
// src/App.jsx

import { useState } from "react";
import Die from "./components/Die";
import "./App.css";

function rollDie() {
  return Math.floor(Math.random() * 6);
}

function App() {
  const [dice, setDice] = useState([0, 0]);
  const [rolls, setRolls] = useState(0);

  const handleRoll = () => {
    setDice([rollDie(), rollDie()]);
    setRolls((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>Dice Roller</h1>
      <div className="dice-container">
        <Die value={dice[0]} />
        <Die value={dice[1]} />
      </div>
      <button onClick={handleRoll}>Roll</button>
      <p>Total rolls: {rolls}</p>
    </div>
  );
}

export default App;
```

**State breakdown:**

| Variable  | Initial value | What it holds                               |
| --------- | ------------- | ------------------------------------------- |
| `dice`  | `[0, 0]`    | Indexes of the two current die faces (0–5) |
| `rolls` | `0`         | How many times the button has been clicked  |

**How the data flows:**

```
App  (owns state: dice, rolls)
 ├── Die  value={dice[0]}   ← receives a number, renders an emoji
 └── Die  value={dice[1]}   ← same component, different value
```

This is the core idea of React: **state lives in the parent, components receive data as props**.

> **Why `rollDie()` returns a number and not an emoji directly?**
> Keeping numbers in state makes logic easy — comparing two numbers (`dice[0] === dice[1]`) is simpler than comparing emoji strings. We only convert to an emoji at render time, inside `Die`.

> **Why `setRolls((prev) => prev + 1)` instead of `setRolls(rolls + 1)`?**
> The updater form `(prev) => prev + 1` always uses the latest value. React can batch state updates, so `rolls` in the closure might be stale. `prev` is guaranteed fresh.
>
> **Reference:** [React — useState updater function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state)

---

## Part 4 — Highlight Doubles

Add one derived value inside `App`, just below the state declarations:

```jsx
const isDoubles = dice[0] === dice[1];
```

Then add a conditional message in the JSX, between the dice and the button:

```jsx
{isDoubles && <p className="doubles">Doubles! 🎉</p>}
```

> **What is derived state?**
> `isDoubles` is computed from `dice` — we don't need a separate `useState` for it. Every time `dice` changes, React re-renders `App` and `isDoubles` is recalculated automatically. A good rule of thumb: if you can calculate it from existing state, don't store it.

> **What does `{isDoubles && <p>...</p>}` mean?**
> In JSX, `{condition && <Element />}` renders the element only when the condition is `true`. When `false`, nothing is rendered. This is the most common conditional rendering pattern in React.
>
> **Reference:** [React — Conditional Rendering](https://react.dev/learn/conditional-rendering)

---

## Complete File Reference

### `src/components/Die.jsx`

```jsx
const FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function Die({ value }) {
  return <span className="die">{FACES[value]}</span>;
}

export default Die;
```

### `src/App.jsx`

```jsx
import { useState } from "react";
import Die from "./components/Die";
import "./App.css";

function rollDie() {
  return Math.floor(Math.random() * 6);
}

function App() {
  const [dice, setDice] = useState([0, 0]);
  const [rolls, setRolls] = useState(0);

  const isDoubles = dice[0] === dice[1];

  const handleRoll = () => {
    setDice([rollDie(), rollDie()]);
    setRolls((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>Dice Roller</h1>
      <div className="dice-container">
        <Die value={dice[0]} />
        <Die value={dice[1]} />
      </div>
      {isDoubles && <p className="doubles">Doubles! 🎉</p>}
      <button onClick={handleRoll}>Roll</button>
      <p>Total rolls: {rolls}</p>
    </div>
  );
}

export default App;
```

---

## Part 5 — Styling

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
  padding: 3rem 2rem;
}

.dice-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0;
}

.die {
  font-size: 6rem;
  line-height: 1;
}

.doubles {
  font-size: 1.4rem;
  color: #e94560;
  margin-bottom: 1rem;
}

button {
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #c73652;
}

p {
  color: #aaa;
  margin-top: 1rem;
}
```

---

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   └── Die.jsx       ← presentational, no state
│   ├── App.jsx           ← owns all state, passes props down
│   └── App.css
└── package.json
```

---

## Stretch Challenges

1. **Total pip count** — display the sum of both dice (remember: `value` is 0-indexed, so add 1 to each).
2. **Snake eyes** — add a special message when both dice show ⚀.
3. **Roll history** — keep an array in state and show the last 5 rolls as a list below the button.
4. **Highlight on doubles** — pass an `isHighlighted` prop to `Die` and add a CSS class to make a matching die glow.
5. **Animate the roll** — briefly show a random face for 300ms before settling on the final result using `setTimeout` and a second piece of state.

---

## Key Concepts Recap

| Concept                  | Where it appears                                                   |
| ------------------------ | ------------------------------------------------------------------ |
| `useState`             | `dice` and `rolls` in `App`                                  |
| Array in state           | `dice` holds two indexes                                         |
| Updater function         | `setRolls((prev) => prev + 1)`                                   |
| Props                    | `App` passes `value` down to `Die`                           |
| Presentational component | `Die` has no state, only renders what it receives                |
| Derived state            | `isDoubles` computed from `dice`, no extra `useState` needed |
| Conditional rendering    | `{isDoubles && <p>...</p>}`                                      |
| Event handler            | `handleRoll` wired to `onClick`                                |

---

## References

- [React — useState](https://react.dev/reference/react/useState)
- [React — Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React — Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [React — Responding to Events](https://react.dev/learn/responding-to-events)
- [MDN — Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
