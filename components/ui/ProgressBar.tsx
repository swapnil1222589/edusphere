import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
}

const sizes = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };

export default function ProgressBar({ value, max = 100, color, size = 'md', showLabel, className, animated = true }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const defaultColor = pct >= 75 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';
  const barColor = color || defaultColor;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full rounded-full overflow-hidden', sizes[size], 'bg-white/8')}>
        <div
          className={cn('h-full rounded-full transition-all duration-1000', animated && 'ease-out')}
          style={{ width: `${pct}%`, backgroundColor: barColor, boxShadow: `0 0 8px ${barColor}60` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[var(--text-muted)]">{value}/{max}</span>
          <span className="text-xs font-medium" style={{ color: barColor }}>{pct.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}
