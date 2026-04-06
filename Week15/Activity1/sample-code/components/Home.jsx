import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Game Shelf</h1>
      <p>A collection of indie games worth your time.</p>
      <Link to="/games" className="btn">Browse Games →</Link>
    </div>
  );
}

export default Home;
