import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarWidth = collapsed ? 64 : 224

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <Header sidebarWidth={sidebarWidth} />
      <main
        className="transition-all duration-200 pt-16 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
