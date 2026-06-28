import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Button } from '../../components/common/Button'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // For now navigate to login — wire up signUp from AuthContext when needed
      navigate('/login')
    } catch (err: any) {
      setError(err?.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 items-center justify-center mb-4">
            <Sparkles size={24} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Get started with DataMagic Lite</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={submit} className="flex flex-col gap-4">
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
            {([['name','Full name','text','Jane Doe'], ['email','Email','email','you@example.com'], ['company','Company (optional)','text','Acme Inc.'], ['password','Password','password','••••••••']] as const).map(([k, label, type, ph]) => (
              <div key={k}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input type={type} value={form[k]} onChange={set(k)} required={k !== 'company'}
                  placeholder={ph}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
            ))}
            <Button type="submit" loading={loading} className="mt-1">Create account</Button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
