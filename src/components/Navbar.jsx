import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">
      <div className="logo">AnimalWiki</div>
      </Link>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/About" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/CreateNewAnimal" onClick={() => setIsOpen(false)}>Add Your Animal</Link>
        <Link to="/WikkiDictionary" onClick={() => setIsOpen(false)}>Wiki Dictionary</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}