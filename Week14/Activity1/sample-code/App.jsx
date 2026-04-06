import { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  if (account) {
    return (
      <div className="app">
        <div className="success-box">
          <p>🎉 Account created for <strong>{account.email}</strong>!</p>
          <button onClick={() => setAccount(null)}>Start over</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Create Account</h1>
      <SignUpForm onSignUp={setAccount} />
    </div>
  );
}

export default App;
