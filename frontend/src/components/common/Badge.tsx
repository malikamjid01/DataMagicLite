import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
  rounded?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dot = false,
  rounded = false,
}) => {
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
    gray: 'bg-gray-100 text-gray-600',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${rounded ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'primary' ? 'bg-blue-500' :
          variant === 'success' ? 'bg-green-500' :
          variant === 'danger' ? 'bg-red-500' :
          variant === 'warning' ? 'bg-yellow-500' :
          variant === 'info' ? 'bg-cyan-500' :
          'bg-gray-500'
        }`} />
      )}
      {children}
    </span>
  );
};