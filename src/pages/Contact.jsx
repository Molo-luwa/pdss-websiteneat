import { useSelection } from '../contexts/SelectionContext'
import './Contact.css'

export default function Contact() {
  const { selectedDesigns, clearSelection } = useSelection()

  const generateWhatsAppMessage = () => {
    const baseUrl = window.location.origin
    let message = 'Hello! I am interested in the following designs:\n\n'

    selectedDesigns.forEach((design) => {
      const productLink = `${baseUrl}/gallery#design-${design.id}`
      message += `• ${design.name} (${design.category}, ${design.gender})\n  ${productLink}\n\n`
    })

    message += `Please help me with more information. Thank you!`
    return encodeURIComponent(message)
  }

  const whatsappLink = `https://wa.me/?text=${generateWhatsAppMessage()}`

  const handleWhatsAppClick = () => {
    if (selectedDesigns.length === 0) {
      alert('Please select at least one design before contacting us.')
      return
    }
    window.open(whatsappLink, '_blank')
    clearSelection()
  }

  return (
    <div className="contact">
      <h1>Get In Touch</h1>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Have questions about our designs? Want to place a custom order?
            Reach out to us through any of these channels:
          </p>

          <div className="contact-methods">
            <a
              href="https://wa.me/234XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link whatsapp"
            >
              💬 WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link instagram"
            >
              📸 Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link tiktok"
            >
              🎵 TikTok
            </a>
            <a href="mailto:info@pdss.com" className="contact-link email">
              📧 Email
            </a>
          </div>
        </div>

        <div className="selection-section">
          <h2>Your Selection</h2>
          {selectedDesigns.length > 0 ? (
            <>
              <ul className="selection-list">
                {selectedDesigns.map((design) => (
                  <li key={design.id}>
                    <strong>{design.name}</strong>
                    <span className="design-details">
                      {design.category} • {design.gender}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="whatsapp-button" onClick={handleWhatsAppClick}>
                Speak to Designer on WhatsApp
              </button>
            </>
          ) : (
            <p className="empty-selection">
              No designs selected yet. Visit the gallery to add designs!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
