import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  className = '',
  status,
  onClick,
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
  };

  const statusStyles = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const getInitials = () => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div
        className={`
          ${sizeStyles[size]}
          rounded-full overflow-hidden flex items-center justify-center
          ${src ? '' : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'}
          font-medium
          ${className}
        `}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          getInitials()
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            w-2.5 h-2.5 rounded-full border-2 border-white
            ${statusStyles[status]}
          `}
        />
      )}
    </div>
  );
};