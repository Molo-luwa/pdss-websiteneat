import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelection } from '../contexts/SelectionContext'
import { ShoppingBag, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const { selectedDesigns } = useSelection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          PDSS<span>.</span>
        </Link>

        {/* Desktop and Mobile Drawer Links */}
        <div className={`nav-wrapper ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/gallery" onClick={closeMenu}>Gallery</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            <li><Link to="/admin" className="admin-link" onClick={closeMenu}>Admin</Link></li>
          </ul>
        </div>

        <div className="nav-actions">
          <Link to="/contact" className="selection-pill">
            <ShoppingBag size={18} />
            <span className="count-badge">{selectedDesigns.length}</span>
            <span className="pill-text">Inquiry</span>
          </Link>
          
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}