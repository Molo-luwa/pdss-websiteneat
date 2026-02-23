import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-fullscreen">
        <div className="hero-overlay"></div>
        <img src="./pic2.jpg" alt="Fashion Statement" className="hero-img" />
        
        <div className="hero-content">
          <span className="hero-subtitle">The 2026 Collection</span>
          <h1 className="hero-title">PDSS <br/> BOUTIQUE</h1>
          <p className="hero-tagline">Tradition redefined for the modern silhouette.</p>
          
          <div className="hero-cta-group">
            <Link to="/gallery" className="gold-btn">
              Explore Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <ChevronDown size={16} className="bounce" />
        </div>
      </section>

      {/* Modern Value Section */}
      <section className="value-section">
        <div className="value-card">
          <div className="card-line"></div>
          <h3>Bespoke Tailoring</h3>
          <p>Hand-stitched precision designed to fit your unique story.</p>
        </div>
        <div className="value-card">
          <div className="card-line"></div>
          <h3>Cultural Roots</h3>
          <p>Every pattern honors the rich heritage of African craftsmanship.</p>
        </div>
      </section>
    </div>
  )
}