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
import { Link } from 'react-router-dom'
import { useSelection } from '../contexts/SelectionContext'
import { ShoppingBag, Menu } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const { selectedDesigns } = useSelection()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          PDSS<span>.</span>
        </Link>

        <div className="nav-main">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin" className="admin-link">Admin</Link></li>
          </ul>
        </div>

        <div className="nav-actions">
          <Link to="/contact" className="selection-pill">
            <ShoppingBag size={18} />
            <span className="count-badge">{selectedDesigns.length}</span>
            <span className="pill-text">Inquiry List</span>
          </Link>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  )
}