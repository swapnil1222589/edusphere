import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const COLORS = [
  'from-indigo-500 to-purple-600', 'from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600', 'from-rose-500 to-pink-600', 'from-violet-500 to-indigo-600',
];

function getColor(name: string) {
  return COLORS[name.charCodeAt(0) % COLORS.length];
}

export default function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover', sizes[size], className)} />;
  }
  return (
    <div className={cn('rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white flex-shrink-0', sizes[size], getColor(name), className)}>
      {getInitials(name)}
    </div>
  );
}
