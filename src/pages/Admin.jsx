import { useState, useEffect } from 'react'
import supabase from '../utils/supabase'
import { addDesign, deleteDesign, updateDesign, getDesigns } from '../utils/supabaseUtils'
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

    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setIsLoggedIn(!!session)
  }

  const loadDesigns = async () => {
    try {
      const designs = await getDesigns()
      setDesigns(designs)
    } catch (err) {
      console.error('Error loading designs:', err)
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setError(
          'Sign up successful! Check your email to verify your account.'
        )
        setEmail('')
        setPassword('')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        setIsLoggedIn(true)
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setIsLoggedIn(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, imageFile: file })
  }

  const handleEditClick = (design) => {
    setEditingDesign(design)
    setEditFormData({
      name: design.name,
      category: design.category,
      gender: design.gender,
      image: null,
    })
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  const handleUpdateDesign = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const updateData = {
        name: editFormData.name,
        category: editFormData.category,
        gender: editFormData.gender,
      }

      
      if (editFormData.imageUrl) {
        updateData.imageUrl = editFormData.imageUrl
      }
      
      
      if (editFormData.altText) {
        updateData.altText = editFormData.altText
      }

      await updateDesign(editingDesign.id, updateData, null)

      
      const updatedDesigns = designs.map((d) =>
        d.id === editingDesign.id
          ? {
              ...d,
              ...updateData,
              imageUrl: editFormData.imageUrl || d.imageUrl,
            }
          : d
      )
      setDesigns(updatedDesigns)
      setEditingDesign(null)
      alert('Design updated successfully!')
    } catch (err) {
      setError('Error updating design: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDesign = async (e) => {
    e.preventDefault()
    if (!formData.imageUrl && !formData.imageFile) {
      setError('Please provide an image URL or upload a file')
      return
    }

    setLoading(true)
    setError('')

    try {
      
      const designPayload = {
        name: formData.name,
        category: formData.category,
        gender: formData.gender,
        altText: formData.altText,
      }

      if (formData.imageFile) {
        designPayload.imageFile = formData.imageFile
      } else if (formData.imageUrl) {
        designPayload.imageUrl = formData.imageUrl
      }

      const designId = await addDesign(designPayload)

      
      setDesigns([
        ...designs,
        {
          id: designId,
          ...formData,
        },
      ])

      
      setFormData({
        name: '',
        category: 'Native',
        gender: 'Unisex',
        altText: '',
        imageUrl: '',
        imageFile: null,
      })

      alert('Design added successfully!')
    } catch (err) {
      setError('Error adding design: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDesign = async (designId) => {
    if (!window.confirm('Are you sure you want to delete this design?')) {
      return
    }

    setLoading(true)
    setError('')

    try {
      await deleteDesign(designId)
      setDesigns(designs.filter((d) => d.id !== designId))
      alert('Design deleted successfully!')
    } catch (err) {
      setError('Error deleting design: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>Admin Login</h1>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleAuth} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="toggle-auth">
            {isSignUp
              ? 'Already have an account? '
              : "Don't have an account? "}
            <button
              type="button"
              className="toggle-button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="admin-content">
        <div className="upload-section">
          <h2>Upload New Design</h2>
          <form onSubmit={handleAddDesign} className="upload-form">
            <input
              type="text"
              name="name"
              placeholder="Design Name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            >
              <option value="Native">Native</option>
              <option value="English">English</option>
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>

            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="file-hint">Or paste an image URL below</p>

            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL (e.g., https://...)"
              value={formData.imageUrl}
              onChange={handleFormChange}
            />
            <p className="file-hint">
              If you uploaded a file, this field is optional. Use URL if you prefer.
            </p>

            <input
              type="text"
              name="altText"
              placeholder="Alt text (e.g., 'Native dress with red pattern')"
              value={formData.altText}
              onChange={handleFormChange}
              required
            />
            <p className="file-hint">
              Describe the design for accessibility and SEO
            </p>

            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Design'}
            </button>
          </form>
        </div>

        <div className="designs-section">
          <h2>Manage Designs</h2>
          {designs.length === 0 ? (
            <p>No designs yet. Add one using the form above.</p>
          ) : (
            <div className="designs-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {designs.map((design) => (
                    <tr key={design.id}>
                      <td>{design.name}</td>
                      <td>{design.category}</td>
                      <td>{design.gender}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEditClick(design)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteDesign(design.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {editingDesign && (
        <div className="modal-overlay" onClick={() => setEditingDesign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setEditingDesign(null)}
            >
              ✕
            </button>
            <h2>Edit Design</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleUpdateDesign} className="edit-form">
              <input
                type="text"
                name="name"
                placeholder="Design Name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                required
              />

              <select
                name="category"
                value={editFormData.category}
                onChange={handleEditFormChange}
              >
                <option value="Native">Native</option>
                <option value="English">English</option>
              </select>

              <select
                name="gender"
                value={editFormData.gender}
                onChange={handleEditFormChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>

              <input
                type="url"
                name="imageUrl"
                placeholder="New image URL (optional)"
                value={editFormData.imageUrl}
                onChange={handleEditFormChange}
              />
              <p className="file-hint">Leave empty to keep current image</p>

              <input
                type="text"
                name="altText"
                placeholder="Alt text (optional)"
                value={editFormData.altText}
                onChange={handleEditFormChange}
              />
              <p className="file-hint">Leave empty to keep current alt text</p>

              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Design'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
