import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <span className="brand">Game Shelf</span>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/games">Games</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
