import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl font-black text-gray-200 mb-4">404</p>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Page not found</h1>
        <p className="text-sm text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/"><Button>Go to Dashboard</Button></Link>
      </div>
    </div>
  )
}
