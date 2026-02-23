import './DesignCard.css'

export default function DesignCard({ design, onCardClick }) {
  if (!design) return null

  return (
    <div className="design-card" onClick={() => onCardClick && onCardClick(design)}>

      <div className="image-container">
        <img src={design.imageUrl} alt={design.name} className="design-image" />
      </div>

      <div className="design-info">
        <h3>{design.name}</h3>
        <div className="design-meta">{design.category} · {design.gender}</div>
        <button className="add-button">View</button>
      </div>
      
    </div>
  )
} 