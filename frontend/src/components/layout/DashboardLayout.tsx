import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  const { isDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className="pt-16 transition-all duration-300"
        style={{ paddingLeft: 0 }}
      >
        <div
          className="hidden lg:block transition-all duration-300"
          style={{ marginLeft: collapsed ? 72 : 240 }}
        >
          <Header title={title} onMenuClick={() => setMobileOpen(true)} />
          <main className="p-4 sm:p-6 min-h-screen relative">
            {children}
          </main>
        </div>

        {/* Mobile view — no margin */}
        <div className="lg:hidden">
          <Header title={title} onMenuClick={() => setMobileOpen(true)} />
          <main className="p-4 min-h-screen relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;