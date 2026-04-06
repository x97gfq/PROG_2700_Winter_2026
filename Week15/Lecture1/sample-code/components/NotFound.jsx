import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#e0e7ff" }}>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}

export default NotFound;
