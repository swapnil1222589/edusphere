'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockNotifications } from '@/data/mock';
import { Notification } from '@/types';
import { getRelativeTime } from '@/lib/utils';
import { Bell, CheckCheck, Trash2, CalendarCheck, ClipboardList, Briefcase, Ticket, Megaphone, Star } from 'lucide-react';

const typeConfig: Record<string, { icon: React.ElementType; color: string; variant: 'indigo' | 'success' | 'warning' | 'danger' | 'info' | 'purple' }> = {
  attendance: { icon: CalendarCheck, color: '#10b981', variant: 'success' },
  assignment: { icon: ClipboardList, color: '#f59e0b', variant: 'warning' },
  placement: { icon: Briefcase, color: '#6366f1', variant: 'indigo' },
  event: { icon: Ticket, color: '#06b6d4', variant: 'info' },
  announcement: { icon: Megaphone, color: '#8b5cf6', variant: 'purple' },
  grade: { icon: Star, color: '#f59e0b', variant: 'warning' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.isRead);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Notifications</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {unread.length > 0 ? `${unread.length} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unread.length > 0 && (
          <Button variant="secondary" size="sm" icon={<CheckCheck size={14} />} onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </motion.div>

      <div className="space-y-3">
        {notifications.map((n, i) => {
          const cfg = typeConfig[n.type] || typeConfig.announcement;
          const Icon = cfg.icon;
          return (
            <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${!n.isRead ? 'bg-indigo-500/5 border-indigo-500/15' : 'glass border-[var(--border)]'}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}20` }}>
                <Icon size={18} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0" onClick={() => markRead(n.id)}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{n.title}</p>
                    {!n.isRead && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />}
                  </div>
                  <span className="text-xs text-[var(--text-muted)] flex-shrink-0 whitespace-nowrap">{getRelativeTime(n.createdAt)}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{n.message}</p>
                <Badge variant={cfg.variant} size="sm" className="mt-2">{n.type}</Badge>
              </div>
              <button onClick={() => deleteNotif(n.id)} className="p-1.5 rounded-lg hover:bg-red-500/15 text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </motion.div>
          );
        })}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Bell size={40} className="text-[var(--text-muted)] mb-4" />
            <p className="text-base font-semibold text-[var(--text-primary)]">No notifications</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">You&apos;re all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
