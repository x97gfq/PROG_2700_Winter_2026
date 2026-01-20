# Click Counter Arena — Mini Activity

A tiny browser game to practice **function declarations vs function expressions** in JavaScript.

## Learning Targets
- Write two **function declarations** and one **function expression**
- Wire a function to a **DOM event** and call other functions from it

## Files
- `index.html` — minimal HTML scaffold
- `style.css` — simple styles for the box
- `script.js` — the game logic
- `Function_Decl_vs_Expr_Mini_Lecture.pptx` — 6-slide mini deck

## Run
Just open `index.html` in your browser (or use VS Code Live Server).

## Steps (what we’ll do in class)
1. Open `script.js` and identify the three functions:
   - `increaseScore()` — **declaration**
   - `moveBox()` — **declaration**
   - `handleClick` — **function expression** assigned to `const`
2. Wire the event (already shown): `box.addEventListener('click', handleClick)`.
3. Test: clicking the box should increase score and reposition the box.

## Stretch Ideas (2–3 minutes if time allows)
- Change color each click (already included, tweak HSL range)
- Make the box shrink/grow a bit each click
- Convert `handleClick` into an **arrow function**:

```js
const handleClick = () => { increaseScore(); moveBox(); };
```

## Notes for Instructors
- Keep the talk short: Declarations are hoisted; expressions are values you assign to variables.
- Ask one check question: “Which of these could you call *before* its definition?” (Answer: the declarations.)
