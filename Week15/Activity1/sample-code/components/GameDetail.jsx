import { useParams, useNavigate } from "react-router-dom";
import { games } from "../data/games";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find((g) => g.id === parseInt(id));

  if (!game) {
    return <p>Game not found. <button onClick={() => navigate("/games")}>Back</button></p>;
  }

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-card">
        <div className="card-genre">{game.genre}</div>
        <h1>{game.title}</h1>
        <p><strong>Platform:</strong> {game.platform}</p>
        <p><strong>Time to beat:</strong> {game.hours} hours</p>
        <p>{game.blurb}</p>
      </div>
    </div>
  );
}

export default GameDetail;
