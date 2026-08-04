'use client';
import React, { useState } from 'react';
import { Bell, Sun, Moon, Menu, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { mockNotifications } from '@/data/mock';

interface TopNavProps {
  onMenuClick: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = mockNotifications.filter(n => !n.isRead).length;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
    localStorage.setItem('edusphere_theme', isDark ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 md:px-6 h-16 border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl">
      {/* Mobile menu button */}
      <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-white/8 text-[var(--text-secondary)] cursor-pointer transition-colors">
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 glass px-3 py-2 rounded-xl">
        <Search size={15} className="text-[var(--text-muted)] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-full p-0 shadow-none"
        />
        <span className="text-xs text-[var(--text-muted)] flex-shrink-0 hidden lg:block">⌘K</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-white/8 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl hover:bg-white/8 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 glass glass-strong rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-primary)]">Notifications</span>
                <Badge variant="danger" size="sm">{unread} new</Badge>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {mockNotifications.slice(0, 5).map(n => (
                  <div key={n.id} className={`px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-white/4 transition-colors cursor-pointer ${!n.isRead ? 'bg-indigo-500/5' : ''}`}>
                    <div className="flex items-start gap-3">
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />}
                      <div className={!n.isRead ? '' : 'ml-5'}>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">{n.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[var(--border)]">
                <a href="/notifications" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View all notifications →</a>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        {user && (
          <div className="flex items-center gap-2 pl-2">
            <Avatar name={user.name} size="sm" />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-[var(--text-primary)] leading-none mb-0.5">{user.name.split(' ')[0]}</p>
              <p className="text-xs text-[var(--text-muted)] capitalize">{user.role}</p>
            </div>
            <ChevronDown size={14} className="text-[var(--text-muted)] hidden sm:block" />
          </div>
        )}
      </div>
    </header>
  );
}
