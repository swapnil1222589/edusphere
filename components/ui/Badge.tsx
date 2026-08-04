import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'indigo';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variants = {
  default: 'bg-white/8 text-[var(--text-secondary)] border-[var(--border)]',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  danger: 'bg-red-500/15 text-red-400 border-red-500/25',
  info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  indigo: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
};

const dotColors: Record<string, string> = {
  default: 'bg-[var(--text-muted)]',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger: 'bg-red-400',
  info: 'bg-cyan-400',
  purple: 'bg-purple-400',
  indigo: 'bg-indigo-400',
};

export default function Badge({ children, variant = 'default', size = 'md', dot, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium border rounded-full',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
      variants[variant], className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
