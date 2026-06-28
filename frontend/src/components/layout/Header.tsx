import { Bell, Sun, Moon } from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'

interface HeaderProps { sidebarWidth: number }

export function Header({ sidebarWidth }: HeaderProps) {
  const { user, signOut } = useAuthContext()

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 transition-all duration-200"
      style={{ left: sidebarWidth }}
    >
      <h1 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">DataMagic Lite</h1>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
            {user?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-800 leading-none">{user?.full_name ?? 'User'}</p>
            <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
          </div>
          <button onClick={signOut} className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
