import { Link } from 'react-router-dom'
import { ArrowRight, Instagram, MessageCircle, Play } from 'lucide-react'
import './Home.css'

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="bg-glow"></div>
      
      <aside className="home-sidebar">
        <div className="brand-block">
          <span className="est-text">Haute Couture</span>
          <h1 className="logo-text">PDSS</h1>
          <div className="accent-line"></div>
        </div>
        
        <div className="sidebar-content">
          <p className="sidebar-desc">
            Bridging the gap between traditional heritage and contemporary high-fashion.
          </p>
          <div className="mini-stats">
            <div className="stat">
              <span>100%</span>
              <p>Handmade</p>
            </div>
            <div className="stat">
              <span>Bespoke</span>
              <p>Service</p>
            </div>
          </div>
        </div>

        <div className="sidebar-socials">
          <Instagram size={18} />
          <MessageCircle size={18} />
          <span className="scroll-hint">Scroll for more</span>
        </div>
      </aside>

      <main className="home-main">
        <section className="hero-viewport">
          <div className="hero-visual">
            <div className="image-overlay"></div>
            <img src="./pic2.jpg" alt="Boutique Hero" className="main-bg-img" />
            
            <div className="hero-content-box">
              <span className="collection-tag">New Collection 2026</span>
              <h2>Where Fashion <br/> Meets Culture</h2>
              <div className="hero-actions">
                <Link to="/gallery" className="checkout-btn">
                  Explore Designs <ArrowRight size={20} />
                </Link>
                <button className="watch-btn">
                  <div className="play-icon"><Play size={14} fill="currentColor" /></div>
                  The Process
                </button>
              </div>
            </div>
          </div>

          <div className="features-row">
            <div className="feature-item">
              <h3>Unique Designs</h3>
              <p>Every piece is a singular story of craftsmanship.</p>
            </div>
            <div className="feature-item">
              <h3>Custom Fit</h3>
              <p>Tailored specifically to your unique silhouette.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}