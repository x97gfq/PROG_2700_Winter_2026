# React State & Components — Sign-In Activity

This activity introduces `useState` in React. You will build a simple sign-in screen where a user enters their first name and clicks **Go** to see a personalized welcome message. You will practice creating multiple components and passing state down via props.

---

## Activity Goals

By the end of this guided activity, you will be able to:

- Use `useState` to track user state.
- Handle form input with a controlled component.
- Pass state and state setters down to child components as props.
- Conditionally render different components based on state.

---

## Project Setup

In your terminal, run:

```
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Then open the project in VS Code.

---

## Step 1 — Clean Up the Default Files

### `src/App.css`

Delete **all** the default content and leave the file empty (or just keep a comment):

```css
/* App styles — we'll add our own later */
```

### `src/App.jsx`

Replace everything with a minimal shell:

```jsx
import "./App.css";

function App() {
  return (
    <div>
      <h1>Hello React</h1>
    </div>
  );
}

export default App;
```

Run the dev server and confirm you see **Hello React** in the browser before moving on.

---

## Step 2 — Create the `SignIn` Component

Create a new folder `src/components/` and inside it create `SignIn.jsx`:

```jsx
import { useState } from "react";

function SignIn({ setUser }) {
  const [name, setName] = useState("");

  return (
    <div className="signin">
      <h2>Welcome! What's your name?</h2>
      <input
        type="text"
        placeholder="Enter your first name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setUser(name)}>Go</button>
    </div>
  );
}

export default SignIn;
```

**Teaching moments:**
- `useState("")` — the input starts empty.
- `value={name}` + `onChange` = a **controlled input**: React owns the value.
- `setUser` is passed in as a prop from `App`. Clicking **Go** calls it directly.

---

## Step 3 — Create the `Main` Component

Create `src/components/Main.jsx`:

```jsx
function Main({ user, setUser }) {
  return (
    <div className="app">
      <h1>Welcome, {user}!</h1>
      <p>You're signed in.</p>
      <button onClick={() => setUser(null)}>Sign Out</button>
    </div>
  );
}

export default Main;
```

**Teaching moments:**
- `user` is the name string — passed down so `Main` can display it.
- `setUser(null)` resets the state back in `App`, returning to the sign-in screen.

---

## Step 4 — Wire It Together in `App.jsx`

`App` holds the `user` state and decides which component to show:

```jsx
import { useState } from "react";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  if (user === null) {
    return <SignIn setUser={setUser} />;
  }

  return <Main user={user} setUser={setUser} />;
}

export default App;
```

**Teaching moments:**
- `App` owns the state — child components just receive what they need.
- `user === null` → show sign-in; otherwise → show main screen.
- `setUser` flows down as a prop so children can update the state they don't own.

---

## Step 5 — Add Some Styling

In `src/App.css`:

```css
body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f0f2f5;
}

.signin,
.app {
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 320px;
}

input {
  display: block;
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 1rem 0;
  box-sizing: border-box;
}

button {
  padding: 0.6rem 1.6rem;
  font-size: 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #4338ca;
}
```

---

## Mini Challenges

### Challenge 1 — Submit on Enter
Make pressing **Enter** in the input field trigger the same action as clicking **Go**.

> Hint: use the `onKeyDown` event on the `<input>`.

### Challenge 2 — Validate the Name
Show an error message below the input if the user clicks **Go** without entering a name.

### Challenge 3 — Greeting Variety
Show a different greeting depending on the time of day in `Main.jsx`:
- Before noon → "Good morning, [name]!"
- Afternoon → "Good afternoon, [name]!"
- Evening → "Good evening, [name]!"

> Hint: use `new Date().getHours()`.

---

## Wrap-Up

You have now:

- Built a controlled input with `useState`.
- Created two components — `SignIn` and `Main`.
- Passed state and state setters down as props.
- Used conditional rendering to swap between screens.

This is the core pattern of React: **one parent owns the state, children receive what they need via props.**

---
