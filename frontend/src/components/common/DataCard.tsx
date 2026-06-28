import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  className?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo' | 'pink';
  subtitle?: string;
  loading?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  trend,
  icon,
  className = '',
  color = 'blue',
  subtitle,
  loading = false,
}) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    pink: 'bg-pink-50 text-pink-600',
  };

  const trendIcon = () => {
    if (trend === undefined) return null;
    if (trend > 0) return <TrendingUp size={16} className="text-green-600" />;
    if (trend < 0) return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  if (loading) {
    return (
      <Card className={className}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-2/3 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className} hoverable>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 truncate">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trendIcon()}
              <span className={`text-sm font-medium ${
                trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-400'
              }`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-xl flex-shrink-0 ${colorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};