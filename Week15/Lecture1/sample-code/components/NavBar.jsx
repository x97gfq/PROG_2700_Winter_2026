import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <span className="brand">My Watchlist</span>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/shows">Shows</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
