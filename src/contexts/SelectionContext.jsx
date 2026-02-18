import React, { createContext, useState, useContext } from 'react'

const SelectionContext = createContext()

export function SelectionProvider({ children }) {
  const [selectedDesigns, setSelectedDesigns] = useState([])

  const addDesign = (design) => {
    
    const exists = selectedDesigns.find(d => d.id === design.id)
    if (!exists) {
      setSelectedDesigns([...selectedDesigns, design])
    }
  }

  const removeDesign = (designId) => {
    setSelectedDesigns(selectedDesigns.filter(d => d.id !== designId))
  }

  const clearSelection = () => {
    setSelectedDesigns([])
  }

  const isSelected = (designId) => {
    return selectedDesigns.some(d => d.id === designId)
  }

  return (
    <SelectionContext.Provider value={{
      selectedDesigns,
      addDesign,
      removeDesign,
      clearSelection,
      isSelected,
    }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider')
  }
  return context
}
