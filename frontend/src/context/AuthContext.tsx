import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage on page load
    const token = localStorage.getItem('auth_token')
    const stored = localStorage.getItem('auth_user')
    if (token && stored) {
      try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const data = await authApi.login({ email, password })
      localStorage.setItem('auth_token', data.access_token)
      const u: User = { id: data.user.email, email: data.user.email, full_name: data.user.name, role: data.user.role }
      localStorage.setItem('auth_user', JSON.stringify(u))
      setUser(u)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
