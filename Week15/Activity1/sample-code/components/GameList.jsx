import { Link } from "react-router-dom";
import { games } from "../data/games";

function GameList() {
  return (
    <div>
      <h1>Games ({games.length})</h1>
      <div className="card-grid">
        {games.map((game) => (
          <div key={game.id} className="card">
            <div className="card-genre">{game.genre}</div>
            <h3>{game.title}</h3>
            <p>{game.platform}</p>
            <Link to={`/games/${game.id}`}>Learn more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameList;
