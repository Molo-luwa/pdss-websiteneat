import React, { createContext, useState, useContext, useEffect } from 'react';

const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  // Initialize state from localStorage
  const [selectedDesigns, setSelectedDesigns] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedDesigns');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load selection from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever selectedDesigns changes
  useEffect(() => {
    try {
      localStorage.setItem('selectedDesigns', JSON.stringify(selectedDesigns));
    } catch (error) {
      console.error('Failed to save selection to localStorage:', error);
    }
  }, [selectedDesigns]);

  const addDesign = (design) => {
    const exists = selectedDesigns.find(d => d.id === design.id);
    if (!exists) {
      setSelectedDesigns([...selectedDesigns, design]);
    }
  };

  const removeDesign = (designId) => {
    setSelectedDesigns(selectedDesigns.filter(d => d.id !== designId));
  };

  const clearSelection = () => {
    setSelectedDesigns([]);
  };

  const isSelected = (designId) => {
    return selectedDesigns.some(d => d.id === designId);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedDesigns,
        addDesign,
        removeDesign,
        clearSelection,
        isSelected,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
}