import { useState, useEffect } from 'react'
import { getDesigns } from '../utils/supabaseUtils'
import DesignCard from './DesignCard'

export default function Gallery({ onDesignSelect }) { // Pass selection handler to parent
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getDesigns()
        setDesigns(data || [])
      } catch (err) {
        console.error("Failed to load gallery:", err)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [])

  if (loading) return (
    <div className="loader-container">
      <div className="minimal-loader"></div>
      <p>Consulting Archives...</p>
    </div>
  )

  return (
    <section className="gallery-section">
      <div className="design-grid">
        {designs.map((item) => (
          <DesignCard 
            key={item.id} 
            design={item} 
            onCardClick={onDesignSelect} 
          />
        ))}
      </div>
      
      {designs.length === 0 && (
        <div className="empty-gallery">
          <p>The collection is currently being curated. Please check back shortly.</p>
        </div>
      )}
    </section>
  )
}