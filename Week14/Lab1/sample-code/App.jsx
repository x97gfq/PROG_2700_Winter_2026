import { useState } from "react";
import GradeForm from "./components/GradeForm";
import GradeChart from "./components/GradeChart";
import "./App.css";

const initial = [
  { subject: "Math",    grade: 84 },
  { subject: "English", grade: 71 },
  { subject: "History", grade: 90 },
];

function App() {
  const [grades, setGrades] = useState(initial);

  function handleAdd(entry) {
    setGrades((prev) => [...prev, entry]);
  }

  function handleRemove(index) {
    setGrades((prev) => prev.filter((_, i) => i !== index));
  }

  const avg = grades.length
    ? Math.round(grades.reduce((sum, g) => sum + g.grade, 0) / grades.length)
    : 0;

  return (
    <div className="app">
      <header>
        <h1>Grade Tracker</h1>
        <p className="avg">
          {grades.length} subjects · Class average: <strong>{avg}%</strong>
        </p>
      </header>

      <div className="layout">
        <aside>
          <GradeForm onAdd={handleAdd} />

          <div className="grade-list">
            {grades.map((g, i) => (
              <div key={i} className="grade-row">
                <span>{g.subject}</span>
                <span className="grade-value">{g.grade}%</span>
                <button onClick={() => handleRemove(i)}>✕</button>
              </div>
            ))}
          </div>
        </aside>

        <main>
          <GradeChart grades={grades} />
        </main>
      </div>
    </div>
  );
}

export default App;
