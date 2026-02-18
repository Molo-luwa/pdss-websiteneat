import { useSelection } from '../contexts/SelectionContext'
import './DesignCard.css'

export default function DesignCard({ design, onCardClick }) {
  const { isSelected, addDesign, removeDesign } = useSelection()
  const selected = isSelected(design.id)

  const handleAddClick = (e) => {
    e.stopPropagation()
    if (selected) {
      removeDesign(design.id)
    } else {
      addDesign(design)
    }
  }

  return (
    <div className="design-card" onClick={() => onCardClick(design)}>
      <img src={design.imageUrl} alt={design.altText || design.name} className="design-image" />
      <div className="design-info">
        <h3>{design.name}</h3>
        <p className="design-meta">{design.category} | {design.gender}</p>
        <button
          className={`add-button ${selected ? 'selected' : ''}`}
          onClick={handleAddClick}
        >
          {selected ? '✓ Selected' : 'Add to Selection'}
        </button>
      </div>
    </div>
  )
}
