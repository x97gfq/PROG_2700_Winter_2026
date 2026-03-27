# React Trivia Quiz — Friday Lab

Build a trivia quiz app that fetches real questions from the internet. The new concept today is using `useEffect` to **load data from an API** — a pattern you will use in almost every real React project.

---

## Learning Goals

- Use `useEffect` + `fetch` to load data when a component first mounts
- Handle a **loading state** while data arrives
- Build components that receive props and use them for conditional styling
- Reinforce `useState`, conditional rendering, and `.map()`

---

## Project Setup

```bash
npm create vite@latest my-app-xxx -- --template react
cd my-app
npm install
npm run dev
```

Replace `src/App.jsx` with a blank shell and delete everything in `src/App.css`. Create `src/components/` before you start.

```
src/
  App.jsx
  App.css
  components/
    QuestionCard.jsx
    AnswerButton.jsx
```

---

## Step 1 — CSS (copy and paste)

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #1e1e2e;
  color: #eee;
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.h1 { color: yellow; }
.app { max-width: 600px; width: 100%; }

.question-card {
  background: #2a2a3e;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.progress { font-size: 0.85rem; color: #aaa; margin: 0 0 0.5rem; }
.question-card h2 { margin: 0; line-height: 1.5; }

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.answer-btn {
  padding: 0.75rem;
  font-size: 1rem;
  background: #3a3a5e;
  color: #eee;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.answer-btn:hover { background: #4a4a7e; }

.next-btn {
  margin-top: 1.5rem;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  background: #7c5cbf;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.end-screen { text-align: center; margin-top: 4rem; }
```

---

## Step 2 — QuestionCard component

`src/components/QuestionCard.jsx` — displays the question text and a progress label.

```jsx
function QuestionCard({ question, index, total }) {
  return (
    <div className="question-card">
      <p className="progress">Question {index} of {total}</p>
      <h2>{question}</h2>
    </div>
  );
}

export default QuestionCard;
```

---

## Step 3 — AnswerButton component

`src/components/AnswerButton.jsx` — one answer button that turns green (correct) or red (wrong) after a pick.

```jsx
function AnswerButton({ answer, onClick, selected, correct }) {
  let bg = "";
  if (correct) bg = "#43a047";
  if (selected && !correct) bg = "#e53935";

  return (
    <button className="answer-btn" onClick={onClick} style={{ background: bg }}>
      {answer}
    </button>
  );
}

export default AnswerButton;
```

---

## Step 4 — App.jsx

```jsx
import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import AnswerButton from "./components/AnswerButton";
import "./App.css";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

// The API returns HTML entities (e.g. &) — this converts them to plain text
function decode(str) {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  // Empty [] = run once on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((q) => ({
            question: decode(q.question),
            correct: decode(q.correct_answer),
            answers: [...q.incorrect_answers, q.correct_answer]
              .sort(() => Math.random() - 0.5)
              .map(decode),
          }))
        )
      );
  }, []);

  if (questions.length === 0) return <p>Loading...</p>;

  if (index >= questions.length) {
    return (
      <div className="end-screen">
        <h1>Quiz Complete!</h1>
        <p>Score: {score} / {questions.length}</p>
        <button className="next-btn"
          onClick={() => { setIndex(0); setScore(0); setSelected(null); }}>
          Play Again
        </button>
      </div>
    );
  }

  const q = questions[index];

  const handleAnswer = (answer) => {
    if (selected) return;           // ignore clicks after one is chosen
    setSelected(answer);
    if (answer === q.correct) setScore((s) => s + 1);
  };

  return (
    <div className="app">
      <h1>Trivia Quiz — Score: {score}</h1>

      <QuestionCard question={q.question} index={index + 1} total={questions.length} />

      <div className="answers">
        {q.answers.map((answer) => (
          <AnswerButton
            key={answer}
            answer={answer}
            onClick={() => handleAnswer(answer)}
            selected={selected === answer}
            correct={selected !== null && answer === q.correct}
          />
        ))}
      </div>

      {selected && (
        <button className="next-btn"
          onClick={() => { setSelected(null); setIndex((i) => i + 1); }}>
          Next →
        </button>
      )}
    </div>
  );
}

export default App;
```

---

## Stretch Challenges

1. **Feedback text** — show "Correct!" or "Wrong!" after the player picks
2. **Category picker** — add a `<select>` before the quiz starts and append `&category=9` to the URL
3. **Difficulty** — add `&difficulty=easy` (or `medium` / `hard`) to the URL
4. **Best score** — save the highest score to `localStorage` and display it on the end screen
