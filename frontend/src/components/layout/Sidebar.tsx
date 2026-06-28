import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Upload, FolderOpen, BarChart3, Table2, Settings, Sparkles, ChevronLeft } from 'lucide-react'

const NAV = [
  { to: '/',         label: 'Dashboard',   icon: LayoutDashboard, exact: true },
  { to: '/upload',   label: 'Upload Data', icon: Upload },
  { to: '/datasets', label: 'Datasets',    icon: FolderOpen },
  { to: '/analyze',  label: 'Analyze',     icon: BarChart3 },
  { to: '/data',     label: 'Data View',   icon: Table2 },
  { to: '/settings', label: 'Settings',    icon: Settings },
]

interface SidebarProps { collapsed: boolean; onToggle: () => void }

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-30 transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Sparkles size={15} color="white" />
        </div>
        {!collapsed && <span className="font-bold text-gray-900">Data<span className="text-primary-600">Magic</span></span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
               ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="m-3 p-2 rounded-lg hover:bg-gray-100 text-gray-400 self-end transition-colors"
      >
        <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </aside>
  )
}
