import { useState } from "react";

function GradeForm({ onAdd }) {
  const [subject, setSubject] = useState("");
  const [grade,   setGrade]   = useState("");
  const [errors,  setErrors]  = useState({});

  function validate() {
    const e = {};
    if (!subject.trim()) e.subject = "Subject is required.";
    if (!grade)          e.grade   = "Grade is required.";
    else if (parseInt(grade) < 0 || parseInt(grade) > 100)
      e.grade = "Grade must be 0–100.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onAdd({ subject: subject.trim(), grade: parseInt(grade) });
      setSubject("");
      setGrade("");
      setErrors({});
    }
  }

  return (
    <form className="grade-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Chemistry"
        />
        {errors.subject && <span className="error">{errors.subject}</span>}
      </div>

      <div className="field">
        <label htmlFor="grade">Grade (%)</label>
        <input
          id="grade"
          type="number"
          min="0"
          max="100"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="0–100"
        />
        {errors.grade && <span className="error">{errors.grade}</span>}
      </div>

      <button type="submit">Add Subject</button>
    </form>
  );
}

export default GradeForm;
