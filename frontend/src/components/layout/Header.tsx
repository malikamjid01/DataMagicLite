import { Sun, Moon, Bell, Search, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import useAuth from '../../hooks/useAuth';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header = ({ title, onMenuClick }: HeaderProps) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`h-16 backdrop-blur-xl border-b flex items-center justify-between px-4 sm:px-6 fixed top-0 right-0 left-0 lg:left-16 z-30 transition-all duration-300 ${
      isDark ? 'bg-gray-950/80 border-white/5' : 'bg-white/80 border-gray-200'
    }`}>
      {/* Left — Mobile menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className={`lg:hidden w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Menu size={18} />
        </button>
        <h1 className={`font-semibold text-base sm:text-lg tracking-tight truncate ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search — hidden on small mobile */}
        <button className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
          isDark
            ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            : 'bg-gray-100 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
        }`}>
          <Search size={14} />
          <span className="hidden md:block">Search...</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
            isDark
              ? 'bg-white/5 border-white/10 text-gray-400 hover:text-yellow-400 hover:bg-white/10'
              : 'bg-gray-100 border-gray-200 text-gray-500 hover:text-indigo-600 hover:bg-gray-200'
          }`}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notification — hidden on small mobile */}
        <button className={`hidden sm:flex w-8 h-8 rounded-lg border items-center justify-center transition-all ${
          isDark
            ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            : 'bg-gray-100 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
        }`}>
          <Bell size={15} />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer shrink-0">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;