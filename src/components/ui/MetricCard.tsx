import React from 'react';

export type MetricColor = 'primary' | 'indigo' | 'purple' | 'emerald' | 'rose' | 'amber' | 'pink' | 'secondary' | 'tertiary';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string | React.ReactNode;
  color?: MetricColor;
  variant?: 'default' | 'small';
}

const colorMap = {
  primary: { bg: 'bg-primary/10', border: 'border-primary/20', text: 'text-primary' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400' },
  secondary: { bg: 'bg-secondary/10', border: 'border-secondary/20', text: 'text-secondary' },
  tertiary: { bg: 'bg-tertiary/10', border: 'border-tertiary/20', text: 'text-tertiary' },
};

export function MetricCard({ title, value, icon, color = 'primary', variant = 'default' }: MetricCardProps) {
  const styles = colorMap[color] || colorMap.primary;
  
  if (variant === 'small') {
    return (
      <div className="bg-surface-container-low border border-surface-container-high/80 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[92px]">
        <div className="flex items-center gap-2 text-outline">
          {typeof icon === 'string' ? (
            <span className={`material-symbols-outlined text-[17px] ${styles.text}`}>{icon}</span>
          ) : (
            icon
          )}
          <span className="font-body-sm text-xs font-medium">{title}</span>
        </div>
        <div className="mt-2 text-2xl font-bold text-on-surface leading-none">{value}</div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-outline-variant transition">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${styles.bg} ${styles.border} ${styles.text}`}>
        {typeof icon === 'string' ? (
          <span className="material-symbols-outlined">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <div>
        <div className="text-xs text-on-surface-variant font-medium">{title}</div>
        <div className="text-xl font-bold text-on-surface mt-0.5">{value}</div>
      </div>
    </div>
  );
}
