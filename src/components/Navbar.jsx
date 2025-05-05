import "../styles/Nav.css"
import { Link } from "react-router-dom"
export default function Navbar () {
    return (
        <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/CreateNewAnimal">Add Your annimal</Link>
      </nav>
    )
}

