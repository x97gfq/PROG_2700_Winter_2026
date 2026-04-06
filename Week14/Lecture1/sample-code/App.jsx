import { useState } from "react";
import ContactForm from "./components/ContactForm";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(name) {
    setSubmittedName(name);
    setSubmitted(true);
  }

  return (
    <div className="app">
      <h1>Contact Us</h1>

      {submitted ? (
        <div className="success-box">
          <p>✓ Thanks, <strong>{submittedName}</strong>! We&apos;ll be in touch.</p>
          <button onClick={() => setSubmitted(false)}>Send another</button>
        </div>
      ) : (
        <ContactForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;
