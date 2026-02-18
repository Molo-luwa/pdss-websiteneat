import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SelectionProvider } from './contexts/SelectionContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import './App.css'

function App() {
  return (
    <Router>
      <SelectionProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </SelectionProvider>
    </Router>
  )
}

export default App
