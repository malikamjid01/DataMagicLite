import React from 'react';
import { LoadingSpinner } from './Loading';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning' | 'ghost' | 'google';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 active:bg-blue-800 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 active:bg-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 active:bg-red-800 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 active:bg-green-800 shadow-sm hover:shadow-md',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400 active:bg-yellow-700 shadow-sm hover:shadow-md',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-300 active:bg-gray-200',
    // Google style - matches input fields
    google: 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-300 focus:ring-blue-500 active:bg-gray-200',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px] rounded-lg',
    md: 'px-4 py-2 text-base min-h-[40px] rounded-lg',
    lg: 'px-6 py-3 text-lg min-h-[48px] rounded-lg',
    xl: 'px-8 py-4 text-xl min-h-[56px] rounded-lg',
  };

  // Google variant uses same size but with slightly different padding to match inputs
  const getSizeClass = () => {
    if (variant === 'google') {
      return 'px-4 py-2.5 text-sm min-h-[44px] rounded-lg';
    }
    return sizeStyles[size];
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed hover:!bg-opacity-100 hover:!shadow-none';

  return (
    <button
      type={type}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${getSizeClass()}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? disabledStyles : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <LoadingSpinner size="sm" color={variant === 'primary' || variant === 'danger' || variant === 'success' ? 'white' : 'blue'} />}
      {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};