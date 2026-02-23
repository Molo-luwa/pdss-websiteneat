import { useState, useEffect } from 'react'
import supabase from '../utils/supabase'
import { addDesign, deleteDesign, updateDesign, getDesigns } from '../utils/supabaseUtils'
import { LogOut, Plus, Edit2, Trash2, Image as ImageIcon, Check, X } from 'lucide-react'
import './Admin.css'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [designs, setDesigns] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    category: 'Native',
    gender: 'Unisex',
    imageUrl: '',
    imageFile: null,
    altText: '',
  })
  
  const [editingDesign, setEditingDesign] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: 'Native',
    gender: 'Unisex',
    imageUrl: '',
    altText: '',
  })

  useEffect(() => {
    loadDesigns()
    checkAuth()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })
    return () => subscription?.unsubscribe()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsLoggedIn(!!session)
  }

  const loadDesigns = async () => {
    try {
      const data = await getDesigns()
      setDesigns(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setError('Verification email sent.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDesign = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDesign(formData)
      await loadDesigns()
      setFormData({ name: '', category: 'Native', gender: 'Unisex', altText: '', imageUrl: '', imageFile: null })
      alert('Design published.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateDesign = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateDesign(editingDesign.id, editFormData)
      await loadDesigns()
      setEditingDesign(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDesign = async (id) => {
    if (!window.confirm('Delete this design?')) return
    try {
      await deleteDesign(id)
      setDesigns(designs.filter(d => d.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <ImageIcon className="gold-text" size={32} />
          <h1>Atelier Access</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleAuth} className="login-form">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>{isSignUp ? 'Create' : 'Enter'}</button>
          </form>
          <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-button">
            {isSignUp ? 'Back to Login' : 'Request Access'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>PDSS<span>.</span> Control</h1>
        <button className="logout-button" onClick={() => supabase.auth.signOut()}>
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="admin-grid">
        <section className="admin-card">
          <div className="card-header"><Plus size={18} /> <h2>Add New Piece</h2></div>
          <form onSubmit={handleAddDesign} className="admin-form">
            <input type="text" placeholder="Design Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <div className="form-row">
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Native">Native</option>
                <option value="English">English</option>
              </select>
              <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <input type="file" onChange={(e) => setFormData({...formData, imageFile: e.target.files[0]})} />
            <input type="url" placeholder="Or Image URL" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
            <input type="text" placeholder="Alt Description" value={formData.altText} onChange={(e) => setFormData({...formData, altText: e.target.value})} required />
            <button type="submit" disabled={loading} className="gold-btn">Publish Piece</button>
          </form>
        </section>

        <section className="admin-card">
          <div className="card-header"><Edit2 size={18} /> <h2>Inventory</h2></div>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {designs.map((design) => (
                  <tr key={design.id}>
                    <td><img src={design.imageUrl} className="mini-thumb" alt="" /></td>
                    <td><div className="name-cell">{design.name}<span>{design.category}</span></div></td>
                    <td className="action-btns">
                      <button onClick={() => {setEditingDesign(design); setEditFormData(design)}} className="edit-btn"><Edit2 size={14}/></button>
                      <button onClick={() => handleDeleteDesign(design.id)} className="del-btn"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

        <button
          className="logout-floating"
          onClick={() => supabase.auth.signOut()}
          aria-label="Logout"
          title="Logout"
        >
          Logout
        </button>

      {editingDesign && (
        <div className="modal-overlay">
          <div className="modal-content-premium admin-modal">
            <button className="modal-close-btn" onClick={() => setEditingDesign(null)}><X size={24}/></button>
            <h2>Edit {editingDesign.name}</h2>
            <form onSubmit={handleUpdateDesign} className="admin-form">
              <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} required />
              <div className="form-row">
                <select value={editFormData.category} onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}>
                  <option value="Native">Native</option>
                  <option value="English">English</option>
                </select>
                <select value={editFormData.gender} onChange={(e) => setEditFormData({...editFormData, gender: e.target.value})}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <input type="url" value={editFormData.imageUrl} onChange={(e) => setEditFormData({...editFormData, imageUrl: e.target.value})} />
              <button type="submit" className="gold-btn">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}