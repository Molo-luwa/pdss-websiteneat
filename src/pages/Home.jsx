import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>PDSS Boutique</h1>
        <p className="slogan">Where Fashion Meets Culture</p>
        <Link to="/gallery" className="cta-button">
          Explore Our Designs
        </Link>
      </div>

      <section className="features">
        <div className="feature">
          <h3>Unique Designs</h3>
          <p>Handcrafted fashion pieces that blend tradition with modern style</p>
        </div>
        <div className="feature">
          <h3>Quality Craftsmanship</h3>
          <p>Every design is carefully created with attention to detail</p>
        </div>
        <div className="feature">
          <h3>Custom Orders</h3>
          <p>Speak to our designers to customize your perfect outfit</p>
        </div>
      </section>
    </div>
  )
}
