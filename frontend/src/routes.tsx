import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import type { ReactElement } from 'react'

// Auth pages (no layout)
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'

// App pages (with layout)
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import NotFound from './pages/NotFound'

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated, loading } = useAuthContext()
  const location = useLocation()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login"           element={<Login />} />
      <Route path="/signup"          element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected */}
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
