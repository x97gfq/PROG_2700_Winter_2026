# Week 14 — Lab 1: Grade Tracker
# Slide Outline · PROG 2700

---

## SLIDE 1 — Title

**Lab 1: Grade Tracker**
Form Validation + Live Charts
PROG 2700 — Week 14

> Today's lab is the payoff of the week. Data from a validated form feeds
> directly into a live chart — no page reload, no manual chart.update() call.

---

## SLIDE 2 — What You're Building

A grade tracker with three components working together:

```
App.jsx
  ├── grades state  [ { subject: "Math", grade: 84 }, ... ]
  │
  ├── <GradeForm onAdd={handleAdd} />      ← form with validation
  └── <GradeChart grades={grades} />       ← bar chart + reference line
```

Add a valid entry → `grades` array grows → chart re-renders automatically.

> The magic: React's state update triggers a re-render of GradeChart.
> No manual chart.update() call. No DOM manipulation. Just state.

---

## SLIDE 3 — The Data Flow

```jsx
// App.jsx — the single source of truth
const [grades, setGrades] = useState(initial);

function handleAdd(entry) {
  setGrades((prev) => [...prev, entry]);  // new array → React re-renders chart
}

function handleRemove(index) {
  setGrades((prev) => prev.filter((_, i) => i !== index));
}
```

- `grades` flows **down** to both `GradeForm` (as a callback) and `GradeChart` (as data)
- Validation happens in `GradeForm` before `onAdd` is ever called
- Chart gets a fresh `grades` prop on every state change

> Same lifting-state-up pattern from Week 13. App owns the data,
> children receive it as props.

---

## SLIDE 4 — The Chart Highlights

```jsx
// Running average as a dashed reference line
const avg = Math.round(grades.reduce((sum, g) => sum + g.grade, 0) / grades.length);

<ReferenceLine y={avg} stroke="#f59e0b" strokeDasharray="4 2"
  label={{ value: `Avg ${avg}%` }} />

// Bars above average: dark blue. Below: light blue.
<Cell fill={g.grade >= avg ? "#4f46e5" : "#a5b4fc"} />
```

The average line **moves** as you add or remove entries.

---

## SLIDE 5 — Lab Parts

| Part | Focus | Time |
|------|-------|------|
| 1 | Trace the data flow in App.jsx | 10 min |
| 2 | Test and understand the form validation | 15 min |
| 3 | Explore the chart — reference line, Cell colours | 15 min |
| Mini challenges | Letter grades, best/worst, chart type toggle | + time |

Full instructions in `React_GradeTracker_Lab.md`.

---

## SLIDE 6 — Setup

```bash
npm create vite@latest grade-tracker -- --template react
cd grade-tracker
npm install recharts
npm install
npm run dev
```

Copy `sample-code/` into `src/`. Three subjects should appear immediately.

---

## SLIDE 7 — Checklist

- [ ] Three pre-loaded grades show in list and chart
- [ ] Empty submit → two errors appear
- [ ] Grade > 100 → range error
- [ ] Valid entry → list grows, chart gains a bar, average line moves
- [ ] Delete entry → removed from both list and chart instantly
- [ ] Empty state → placeholder message instead of a crash

---

*End of Lab 1 Slides*
