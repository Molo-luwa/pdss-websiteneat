import { useState } from 'react'
import { useSelection } from '../contexts/SelectionContext'
import { MessageCircle, Instagram, Mail, Trash2, ArrowRight, Music2, MapPin, CheckCircle2, X } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const { selectedDesigns, clearSelection, removeFromSelection } = useSelection()
  const [showSuccess, setShowSuccess] = useState(false)
  const WHATSAPP_NUMBER = "2348119224876"

  const handleWhatsAppClick = () => {
    if (selectedDesigns.length === 0) return
    
    let message = `*PDSS Boutique Inquiry*\n---\n`
    selectedDesigns.forEach((d, i) => {
      message += `▫️ *${d.name}*\n   Category: ${d.category}\n`
    })

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
    
    setShowSuccess(true)
  }

  return (
    <div className="contact-wrapper">
      <div className="bg-glow"></div>
      
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <button className="close-modal" onClick={() => setShowSuccess(false)}><X size={20}/></button>
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} color="#bfa37e" />
            </div>
            <h3>Inquiry Sent</h3>
            <p>Your selection has been prepared. Please continue the conversation in WhatsApp to finalize your bespoke order.</p>
            <button className="modal-btn" onClick={() => setShowSuccess(false)}>Return to Selection</button>
          </div>
        </div>
      )}

      <aside className="contact-sidebar">
        <div className="brand-block">
          <span className="est-text">Haute Couture</span>
          <h1 className="logo-text">PDSS</h1>
          <div className="accent-line"></div>
        </div>
        
        <div className="social-stack">
          <p className="stack-label">Direct Channels</p>
          <a href="#" className="s-link-premium">
            <div className="icon-box"><MessageCircle size={18} /></div>
            <span>WhatsApp Official</span>
          </a>
          <a href="#" className="s-link-premium">
            <div className="icon-box"><Instagram size={18} /></div>
            <span>Instagram Direct</span>
          </a>
          <a href="#" className="s-link-premium">
            <div className="icon-box"><Mail size={18} /></div>
            <span>Email Inquiry</span>
          </a>
        </div>

        <div className="location-footer">
          <MapPin size={14} />
          <span>Lagos, Nigeria | Worldwide Shipping</span>
        </div>
      </aside>

      <main className="contact-main">
        <header className="main-header">
          <div className="header-text">
            <h2>Your Curated Selection</h2>
            <p>Review your selected pieces before connecting with our tailors.</p>
          </div>
          <div className="selection-count">
            {selectedDesigns.length} <span>Items</span>
          </div>
        </header>

        <div className="inquiry-flow">
          {selectedDesigns.length > 0 ? (
            <div className="list-wrapper">
              <div className="scroll-area">
                {selectedDesigns.map((design) => (
                  <div key={design.id} className="glass-card">
                    <div className="card-content">
                      <span className="item-number">#{design.id}</span>
                      <div className="item-info">
                        <h3>{design.name}</h3>
                        <p>{design.category} / {design.gender}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromSelection(design.id)}
                      className="remove-btn"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <footer className="sticky-footer">
                <button className="clear-all" onClick={clearSelection}>Reset Selection</button>
                <button className="checkout-btn" onClick={handleWhatsAppClick}>
                  Send Selection <ArrowRight size={20} />
                </button>
              </footer>
            </div>
          ) : (
            <div className="empty-state-luxury">
              <p>Your inquiry list is currently empty.</p>
              <a href="/gallery" className="gold-link">Explore the Collection</a>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}