import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'white' | 'gray';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue',
  className = '',
  fullScreen = false,
  text,
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  const colorStyles = {
    blue: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`
          ${sizeStyles[size]}
          ${colorStyles[color]}
          rounded-full animate-spin
        `}
      />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-gray-500 text-sm animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
};

// Skeleton Loading Component
interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  count = 1,
  height = 'h-4'
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${height} bg-gray-200 rounded-lg mb-2`} />
      ))}
    </div>
  );
};

// Skeleton Card
export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-2/3 mt-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
    </div>
  );
};

// Skeleton Table
export const SkeletonTable: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded-t-lg mb-2"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b border-gray-100">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-gray-200 rounded flex-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
}; 