import { Link } from 'react-router-dom'
import { useSelection } from '../contexts/SelectionContext'
import './Navbar.css'

export default function Navbar() {
  const { selectedDesigns } = useSelection()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          PDSS
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        <Link to="/gallery" className="selection-button">
          Speak to Designer ({selectedDesigns.length})
        </Link>
      </div>
    </nav>
  )
}
