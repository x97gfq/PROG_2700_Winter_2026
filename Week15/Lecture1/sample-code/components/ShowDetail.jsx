import { useParams, useNavigate } from "react-router-dom";
import { shows } from "../data/shows";

function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const show = shows.find((s) => s.id === parseInt(id));

  if (!show) {
    return <p>Show not found. <button onClick={() => navigate("/shows")}>Back</button></p>;
  }

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h1>{show.title}</h1>
      <p><strong>Genre:</strong> {show.genre}</p>
      <p><strong>Seasons:</strong> {show.seasons}</p>
      <p><strong>Rating:</strong> ★ {show.rating}</p>
      <p>{show.blurb}</p>
    </div>
  );
}

export default ShowDetail;
