function Main({ user, setUser }) {
  return (
    <div className="app">
      <h1>Welcome, {user}!</h1>
      <p>You're signed in.</p>
      <button onClick={() => setUser(null)}>Sign Out</button>
    </div>
  );
}

export default Main;
