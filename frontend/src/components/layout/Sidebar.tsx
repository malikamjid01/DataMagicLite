import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Upload,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  User,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import useAuth from '../../hooks/useAuth';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload', path: '/upload', icon: Upload },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

const Sidebar = ({ mobileOpen, setMobileOpen, collapsed, setCollapsed }: SidebarProps) => {
  const { user, logoutUser } = useAuth();
  const { isDark } = useTheme();
 

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`flex items-center justify-between px-4 py-5 border-b ${
        isDark ? 'border-white/5' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          {(!collapsed || mobileOpen) && (
            <span className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              DataAI
            </span>
          )}
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className={`lg:hidden p-1 rounded-lg ${isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <X size={18} />
        </button>

        {/* Desktop collapse button */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className={`hidden lg:block p-1 rounded-lg transition-colors ${
              isDark ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className={`hidden lg:flex mx-auto mt-2 p-2 rounded-lg transition-colors ${
            isDark ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? 'text-indigo-400'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className={`absolute inset-0 rounded-xl border ${
                      isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200'
                    }`} />
                  )}
                  <Icon size={18} className="shrink-0 relative z-10" />
                  {(!collapsed || mobileOpen) && (
                    <span className="text-sm font-medium relative z-10 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className={`px-2 py-4 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 ${collapsed && !mobileOpen ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <User size={14} className="text-white" />
          </div>
          {(!collapsed || mobileOpen) && (
            <p className={`text-xs truncate flex-1 min-w-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {user?.email}
            </p>
          )}
        </div>

        <button
          onClick={logoutUser}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full ${
            collapsed && !mobileOpen ? 'justify-center' : ''
          } ${isDark ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'}`}
        >
          <LogOut size={18} className="shrink-0" />
          {(!collapsed || mobileOpen) && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`hidden lg:flex h-screen backdrop-blur-xl border-r flex-col fixed left-0 top-0 z-50 overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-gray-950/95 border-white/5' : 'bg-white/95 border-gray-200'
        }`}
      >
        {sidebarContent}
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`fixed left-0 top-0 h-screen w-64 flex flex-col z-50 lg:hidden ${
                isDark ? 'bg-gray-950' : 'bg-white'
              }`}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;