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
