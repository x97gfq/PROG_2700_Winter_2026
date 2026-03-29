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
        onKeyDown={(e) => e.key === "Enter" && setUser(name)}
      />
      <button onClick={() => setUser(name)}>Go</button>
    </div>
  );
}

export default SignIn;
