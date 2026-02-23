import { useSelection } from '../contexts/SelectionContext'
import { X, Plus, Check, Info } from 'lucide-react'
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
      <div className="modal-content-premium" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-panel">
            <img src={design.imageUrl} alt={design.name} className="modal-img-fluid" />
          </div>

          <div className="modal-details-panel">
            <div className="details-header">
              <span className="detail-tag">{design.category}</span>
              <h2>{design.name}</h2>
              <p className="gender-label">{design.gender} Collection</p>
            </div>

            <div className="details-body">
              <div className="info-row">
                <Info size={16} />
                <p>Bespoke tailoring available for this piece. Hand-crafted with premium materials.</p>
              </div>
            </div>

            <div className="details-footer">
              <button
                className={`modal-action-btn ${selected ? 'is-selected' : ''}`}
                onClick={handleAddClick}
              >
                {selected ? (
                  <><Check size={18} /> Added to Selection</>
                ) : (
                  <><Plus size={18} /> Add to Selection</>
                )}
              </button>
              <p className="modal-hint">Add pieces to your list to discuss with our designer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}