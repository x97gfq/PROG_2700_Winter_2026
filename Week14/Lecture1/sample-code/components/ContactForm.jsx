import { useState } from "react";

function ContactForm({ onSubmit }) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [errors,  setErrors]  = useState({});

  function validate() {
    const e = {};
    if (!name.trim())    e.name    = "Name is required.";
    if (!email.trim())   e.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if (!message.trim()) e.message = "Message is required.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(name);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactForm;
