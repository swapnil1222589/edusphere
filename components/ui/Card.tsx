import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  gradient?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' };

export default function Card({ glow, gradient, hover = true, padding = 'md', children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        hover && 'glass-hover',
        gradient && 'gradient-card',
        glow && 'glow-indigo',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-base font-semibold text-[var(--text-primary)]', className)}>{children}</h3>;
}
