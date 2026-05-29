import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, label, icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/5 rounded-xl text-primary text-2xl">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
};
