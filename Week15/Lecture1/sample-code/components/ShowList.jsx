import { Link } from "react-router-dom";
import { shows } from "../data/shows";

function ShowList() {
  return (
    <div>
      <h1>Shows</h1>
      <div className="card-grid">
        {shows.map((show) => (
          <div key={show.id} className="card">
            <h3>{show.title}</h3>
            <p>{show.genre} · ★ {show.rating}</p>
            <Link to={`/shows/${show.id}`}>Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
