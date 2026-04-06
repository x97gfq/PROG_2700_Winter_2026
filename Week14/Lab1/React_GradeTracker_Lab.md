# Week 14 — Lab 1: Grade Tracker

## What You're Building

A live grade tracker that combines form validation (Lecture 1) with Recharts (Lecture 2):

- Enter a **subject name** and **grade (%)** into a validated form
- The **bar chart updates instantly** as you add entries
- Delete an entry → chart removes that bar immediately
- A **reference line** shows the running class average

This is the payoff of the week: data from a validated form flows directly into a chart.

---

## Setup

```bash
npm create vite@latest grade-tracker -- --template react
cd grade-tracker
npm install recharts
npm install
npm run dev
```

Copy in the files from `sample-code/` and verify the app starts with three pre-loaded subjects.

---

## File Structure

```
src/
├── App.jsx               ← manages the grades array, passes it down
├── App.css
└── components/
    ├── GradeForm.jsx     ← validated form (Lecture 1 pattern)
    └── GradeChart.jsx    ← bar chart with reference line (Lecture 2 pattern)
```

---

## Part 1 — Trace the Data Flow (10 min)

Open `App.jsx`. Find:

```jsx
const [grades, setGrades] = useState(initial);
```

`grades` is an array of `{ subject, grade }` objects. It is passed to both child components:

```jsx
<GradeForm onAdd={handleAdd} />
<GradeChart grades={grades} />
```

**Questions to answer before moving on:**
1. When `handleAdd` is called, what does it do to `grades`?
2. Why does the chart update automatically when a new grade is added?
3. What does `handleRemove` do, and why does it use `.filter()` instead of `.splice()`?

> Answer to #3: React state must not be mutated directly. `.filter()` returns a new array.

---

## Part 2 — The Form Validation (15 min)

Open `GradeForm.jsx`. This is the same pattern from Lecture 1.

1. Submit the form empty → both errors appear.
2. Enter a grade of `105` → range error (`Grade must be 0–100`).
3. Enter a valid subject and grade → entry appears in the list AND the chart updates.
4. Click the ✕ next to an entry → it disappears from both the list and the chart.

**Study this block in `handleSubmit`:**

```jsx
if (Object.keys(errs).length === 0) {
  onAdd({ subject: subject.trim(), grade: parseInt(grade) });
  setSubject("");   // ← reset the form after successful add
  setGrade("");
  setErrors({});
}
```

Why do we `parseInt(grade)` here? What type does an `<input type="number">` value give us?

> Input values are always strings. `parseInt` converts to a number so the chart
> and average calculation work correctly.

---

## Part 3 — The Chart (15 min)

Open `GradeChart.jsx`. Find the `<ReferenceLine>` component:

```jsx
const avg = Math.round(
  grades.reduce((sum, g) => sum + g.grade, 0) / grades.length
);

<ReferenceLine y={avg} stroke="#f59e0b" strokeDasharray="4 2"
  label={{ value: `Avg ${avg}%`, position: "right" }} />
```

And the `<Cell>` logic that colours bars differently:

```jsx
<Cell fill={g.grade >= avg ? "#4f46e5" : "#a5b4fc"} />
```

1. Add 3–4 more subjects and watch the average line move.
2. Change the `fill` colours to something else — confirm they update.
3. What happens to the chart when `grades` is an empty array? Find the guard.

---

## Mini Challenges

### Challenge 1 — Letter Grade Display
In the grade list in `App.jsx`, show a letter grade beside each percentage:

```jsx
function letterGrade(g) {
  if (g >= 90) return "A";
  if (g >= 80) return "B";
  if (g >= 70) return "C";
  if (g >= 60) return "D";
  return "F";
}
```

Display: `Math — 84% (B)`

### Challenge 2 — Highest / Lowest
Below the chart, show which subject has the highest and lowest grade.

**Hint:**
```jsx
const best  = grades.reduce((a, b) => a.grade > b.grade ? a : b);
const worst = grades.reduce((a, b) => a.grade < b.grade ? a : b);
```

### Challenge 3 — Line Chart Toggle
Add a button that toggles between `<BarChart>` and `<LineChart>` views.

**Hint:** `const [chartType, setChartType] = useState("bar")` — conditionally render
one of the two chart components based on this state.

---

## Checklist

- [ ] Three pre-loaded grades appear in the list and on the chart
- [ ] Empty form submit → two error messages appear
- [ ] Grade outside 0–100 → range error
- [ ] Valid entry → appears in list, chart gains a new bar, average line moves
- [ ] Deleting an entry → removed from list and chart immediately
- [ ] Average reference line shows the correct calculated average
- [ ] Empty grades array → chart shows a placeholder message instead of crashing
