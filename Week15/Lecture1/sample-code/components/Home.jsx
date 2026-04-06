import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to My Watchlist</h1>
      <p>Keep track of shows you&apos;re watching or want to watch.</p>
      <Link to="/shows" className="btn">Browse Shows →</Link>
    </div>
  );
}

export default Home;
