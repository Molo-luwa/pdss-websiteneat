import { useState, useEffect } from 'react'
import DesignCard from '../components/DesignCard'
import DesignModal from '../components/DesignModal'
import { getDesigns } from '../utils/supabaseUtils'
import './Gallery.css'

export default function Gallery() {
  const [designs, setDesigns] = useState([])
  const [filteredDesigns, setFilteredDesigns] = useState([])
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [genderFilter, setGenderFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    loadDesigns()
  }, [])

  const loadDesigns = async () => {
    try {
      setLoading(true)
      const data = await getDesigns()
      setDesigns(data || [])
      setFilteredDesigns(data || [])
    } catch (error) {
      console.error('Error fetching designs:', error)
      setDesigns([])
      setFilteredDesigns([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = designs

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((d) => d.category === categoryFilter)
    }

    if (genderFilter !== 'All') {
      filtered = filtered.filter((d) => d.gender === genderFilter)
    }

    setFilteredDesigns(filtered)
  }, [categoryFilter, genderFilter, designs])

  return (
    <div className="gallery">
      <h1>Our Designs</h1>

      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Native</option>
            <option>English</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Gender:</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
            <option>Unisex</option>
          </select>
        </div>
      </div>

      <div className="designs-grid">
        {filteredDesigns.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onCardClick={setSelectedDesign}
          />
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <p className="no-designs">
          No designs found. Try adjusting your filters.
        </p>
      )}

      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}
    </div>
  )
}
