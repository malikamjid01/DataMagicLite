import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Reset password</h1>
        <p className="text-sm text-gray-400 mb-6">We'll send a reset link to your email.</p>
        {sent ? (
          <p className="text-sm text-green-600 font-medium">Check your inbox for a reset link.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
            <Button type="submit">Send reset link</Button>
          </form>
        )}
        <p className="text-center text-xs text-gray-400 mt-6">
          <Link to="/login" className="text-primary-600 hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
