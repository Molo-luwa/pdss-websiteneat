import { useEffect, useState } from 'react'
import supabase from '../utils/supabase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const checkAuth = async () => {
    await supabase.auth.getSession()
    setLoading(false)
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
  }

  return children
}
