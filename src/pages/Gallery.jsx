import { useState, useEffect } from 'react'
import DesignCard from '../components/DesignCard'
import DesignModal from '../components/DesignModal'
import { getDesigns } from '../utils/supabaseUtils'
import { Filter, SlidersHorizontal } from 'lucide-react' // Add these icons
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = designs
    if (categoryFilter !== 'All') filtered = filtered.filter((d) => d.category === categoryFilter)
    if (genderFilter !== 'All') filtered = filtered.filter((d) => d.gender === genderFilter)
    setFilteredDesigns(filtered)
  }, [categoryFilter, genderFilter, designs])

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <span className="est-text">The Lookbook</span>
        <h1>Curated Designs</h1>
        <div className="accent-line"></div>
      </div>

      <div className="gallery-controls">
        <div className="filter-pill-wrapper">
          <Filter size={14} className="gold-text" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option>All Categories</option>
            <option>Native</option>
            <option>English</option>
          </select>
        </div>

        <div className="filter-pill-wrapper">
          <SlidersHorizontal size={14} className="gold-text" />
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option>All Genders</option>
            <option>Male</option>
            <option>Female</option>
            <option>Unisex</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Curating Collection...</p>
        </div>
      ) : (
        <div className="designs-grid">
          {filteredDesigns.map((design) => (
            <DesignCard 
              key={design.id} 
              design={design} 
              onCardClick={setSelectedDesign} 
            />
          ))}
        </div>
      )}

      {!loading && filteredDesigns.length === 0 && (
        <div className="no-designs-box">
          <p>No pieces match your current filters.</p>
          <button onClick={() => {setCategoryFilter('All'); setGenderFilter('All')}}>Reset Filters</button>
        </div>
      )}

      {selectedDesign && (
        <DesignModal design={selectedDesign} onClose={() => setSelectedDesign(null)} />
      )}
    </div>
  )
}