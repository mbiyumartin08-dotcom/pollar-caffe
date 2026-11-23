
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "./Icons";
import logo from "../assets/logo.png";

const LINKS = [
  { to: "/menu", label: "Menu" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu} aria-label="Polar home">
        <img src={logo} alt="Polar" />
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
        {LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} onClick={closeMenu}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
