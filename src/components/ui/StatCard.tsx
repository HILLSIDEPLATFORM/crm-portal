import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-hillside-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-hillside-gray uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 flex items-center gap-1 font-medium ${
              trend.isPositive ? 'text-primary' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </p>
          )}
        </div>
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={28} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
