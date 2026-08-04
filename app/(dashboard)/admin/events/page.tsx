'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockEvents } from '@/data/mock';
import { formatDate, getDaysUntil } from '@/lib/utils';
import { Ticket, Calendar, MapPin, Users, Plus, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminEventsPage() {
  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Event Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Create and manage all campus events</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => toast.success('Event creation form coming soon!')}>Create Event</Button>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Events', value: mockEvents.length, color: '#6366f1' },
          { label: 'Registered Participants', value: mockEvents.reduce((s, e) => s + e.registeredCount, 0).toLocaleString(), color: '#10b981' },
          { label: 'With Certificates', value: mockEvents.filter(e => e.hasCertificate).length, color: '#f59e0b' },
        ].map((s, i) => (
          <Card key={i} padding="sm" className="text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {mockEvents.map((event, i) => {
          const days = getDaysUntil(event.startDate);
          const pct = Math.round((event.registeredCount / event.maxParticipants) * 100);
          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0 text-2xl">
                    🎫
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">{event.title}</h3>
                      {event.hasCertificate && <Badge variant="success" size="sm"><Award size={10} className="mr-0.5" />Cert</Badge>}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-1">{event.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><Calendar size={11} />{formatDate(event.startDate)}</span>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><MapPin size={11} />{event.venue}</span>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><Users size={11} />{event.registeredCount}/{event.maxParticipants} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mt-2 max-w-48">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : '#6366f1' }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <Badge variant="indigo" size="sm" className="capitalize">{event.category}</Badge>
                    <span className="text-xs text-[var(--text-muted)]">{days > 0 ? `${days}d to go` : 'Past'}</span>
                    <Button size="sm" variant="ghost" onClick={() => toast.success('Editing event...')}>Edit</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
