import { useSelection } from '../contexts/SelectionContext'
import './DesignModal.css'

export default function DesignModal({ design, onClose }) {
  const { isSelected, addDesign, removeDesign } = useSelection()
  const selected = isSelected(design.id)

  const handleAddClick = () => {
    if (selected) {
      removeDesign(design.id)
    } else {
      addDesign(design)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-image-container">
          <img src={design.imageUrl} alt={design.altText || design.name} className="modal-image" />
        </div>

        <div className="modal-info">
          <h2>{design.name}</h2>
          <p className="modal-meta">
            <strong>Category:</strong> {design.category}
          </p>
          <p className="modal-meta">
            <strong>Gender:</strong> {design.gender}
          </p>

          <button
            className={`modal-button ${selected ? 'selected' : ''}`}
            onClick={handleAddClick}
          >
            {selected ? '✓ Added to Selection' : 'Add to Selection'}
          </button>
        </div>
      </div>
    </div>
  )
}
