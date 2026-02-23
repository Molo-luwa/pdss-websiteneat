import { useSelection } from '../contexts/SelectionContext'
import { Plus, Check } from 'lucide-react'
import './DesignCard.css'

export default function DesignCard({ design, onCardClick }) {
  const { isSelected, addDesign, removeDesign } = useSelection()
  const selected = isSelected(design.id)

  const handleAddClick = (e) => {
    e.stopPropagation()
    selected ? removeDesign(design.id) : addDesign(design)
  }

  return (
    <div className="design-card" onClick={() => onCardClick(design)}>
      <div className="card-media">
        <img src={design.imageUrl} alt={design.name} className="design-image" />
        <div className="card-overlay">
          <button className={`quick-add ${selected ? 'is-selected' : ''}`} onClick={handleAddClick}>
            {selected ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3>{design.name}</h3>
        <p>{design.category} • {design.gender}</p>
      </div>
    </div>
  )
}