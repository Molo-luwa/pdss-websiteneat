import React, { useState } from 'react';
import { useSelection } from '../contexts/SelectionContext';
import { 
  MessageCircle, 
  Instagram, 
  Mail, 
  Trash2, 
  ArrowRight, 
  Music2, 
  MapPin, 
  CheckCircle2, 
  X, 
  Send, 
  ArrowLeft 
} from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { selectedDesigns, clearSelection, removeFromSelection } = useSelection();
  const [view, setView] = useState('list'); 
  const [showSuccess, setShowSuccess] = useState(false);
  
  const WHATSAPP_NUMBER = "2348119224876";

  const handleWhatsAppClick = () => {
    if (selectedDesigns.length === 0) return;
    
    let message = `*PDSS Boutique Inquiry*\n---\n`;
    selectedDesigns.forEach((d, i) => {
      message += `▫️ *${d.name}*\n   Category: ${d.category}\n`;
    });
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setShowSuccess(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setView('list');
  };

  return (
    <div className="contact-wrapper">
      <div className="bg-glow"></div>

      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <button className="close-modal" onClick={() => setShowSuccess(false)}>
              <X size={20}/>
            </button>
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} color="#bfa37e" />
            </div>
            <h3>Inquiry Sent</h3>
            <p>Your request has been processed. Our design team will be in touch shortly to discuss your bespoke pieces.</p>
            <button className="modal-btn" onClick={() => setShowSuccess(false)}>
              Back to Selection
            </button>
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
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="s-link-premium">
            <div className="icon-box"><MessageCircle size={18} /></div>
            <span>WhatsApp Official</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="s-link-premium">
            <div className="icon-box"><Instagram size={18} /></div>
            <span>Instagram Direct</span>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="s-link-premium">
            <div className="icon-box"><Music2 size={18} /></div>
            <span>TikTok Studio</span>
          </a>
          <button onClick={() => setView('email')} className="s-link-premium" style={{background: 'none', border: 'none', width: '100%', cursor: 'pointer'}}>
            <div className="icon-box"><Mail size={18} /></div>
            <span>Email Inquiry</span>
          </button>
        </div>

        <div className="location-footer">
          <MapPin size={14} />
          <span>Lagos, Nigeria | Worldwide Shipping</span>
        </div>
      </aside>

      <main className="contact-main">
        <header className="main-header">
          <div className="header-text">
            <h2>{view === 'list' ? 'Your Curated Selection' : 'Bespoke Email Inquiry'}</h2>
            <p>
              {view === 'list' 
                ? 'Review your selected pieces before connecting with our tailors.' 
                : 'Provide your details for a formal consultation and measurement guide.'}
            </p>
          </div>
          <div className="selection-count">
            {selectedDesigns.length} <span>Items</span>
          </div>
        </header>

        <div className="inquiry-flow">
          {view === 'list' ? (
            <div className="list-wrapper">
              <div className="scroll-area">
                {selectedDesigns.length > 0 ? (
                  selectedDesigns.map((design) => (
                    <div key={design.id} className="glass-card">
                      <div className="card-content">
                        <span className="item-number">REF_00{design.id}</span>
                        <div className="item-info">
                          <h3>{design.name}</h3>
                          <p>{design.category} — {design.gender}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromSelection(design.id)}
                        className="remove-btn"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state-luxury" style={{textAlign: 'center', padding: '4rem 0'}}>
                    <p style={{color: '#444', marginBottom: '1.5rem'}}>Your inquiry list is empty.</p>
                    <a href="/gallery" className="checkout-btn" style={{textDecoration: 'none', display: 'inline-flex'}}>
                      Browse Gallery
                    </a>
                  </div>
                )}
              </div>

              {selectedDesigns.length > 0 && (
                <footer className="sticky-footer">
                  <button className="clear-all" onClick={clearSelection}>Reset All</button>
                  <div style={{display: 'flex', gap: '1rem'}}>
                    <button className="mode-switch-btn" onClick={() => setView('email')}>
                      <Mail size={18} /> Email
                    </button>
                    <button className="checkout-btn" onClick={handleWhatsAppClick}>
                      WhatsApp <MessageCircle size={20} />
                    </button>
                  </div>
                </footer>
              )}
            </div>
          ) : (
            <div className="email-form-container">
              <button className="back-btn" onClick={() => setView('list')}>
                <ArrowLeft size={16} /> Back to Selection
              </button>
              
              <form className="luxury-form" onSubmit={handleEmailSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="email@address.com" required />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Message / Custom Measurements</label>
                  <textarea 
                    rows="5" 
                    placeholder="Provide details about your preferred fit or event date..."
                    defaultValue={selectedDesigns.length > 0 
                      ? `I am inquiring about the following pieces: ${selectedDesigns.map(d => d.name).join(', ')}` 
                      : ''}
                  ></textarea>
                </div>

                <button type="submit" className="checkout-btn">
                  Submit Inquiry <Send size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}