'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockEvents } from '@/data/mock';
import { Event } from '@/types';
import { formatDate, getDaysUntil } from '@/lib/utils';
import { Ticket, Calendar, MapPin, Users, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const categoryConfig: Record<string, { label: string; color: string; variant: 'indigo' | 'success' | 'warning' | 'purple' | 'danger' | 'info' }> = {
  hackathon: { label: 'Hackathon', color: '#6366f1', variant: 'indigo' },
  workshop: { label: 'Workshop', color: '#10b981', variant: 'success' },
  seminar: { label: 'Seminar', color: '#f59e0b', variant: 'warning' },
  cultural: { label: 'Cultural', color: '#8b5cf6', variant: 'purple' },
  sports: { label: 'Sports', color: '#ef4444', variant: 'danger' },
  placement: { label: 'Placement', color: '#06b6d4', variant: 'info' },
};

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [selected, setSelected] = useState<Event | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'hackathon', 'workshop', 'seminar', 'cultural'];
  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);

  const toggleRegister = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id !== id) return e;
      const registered = !e.isRegistered;
      if (registered) toast.success('Successfully registered!');
      else toast('Registration cancelled', { icon: '❌' });
      return { ...e, isRegistered: registered, registeredCount: e.registeredCount + (registered ? 1 : -1) };
    }));
  };

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Events</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Hackathons, workshops, cultural events & more</p>
      </motion.div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all cursor-pointer ${filter === c ? 'bg-indigo-600 text-white' : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{c === 'all' ? 'All Events' : c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((event, i) => {
          const cat = categoryConfig[event.category];
          const days = getDaysUntil(event.startDate);
          const pct = (event.registeredCount / event.maxParticipants) * 100;
          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card hover className="cursor-pointer" onClick={() => setSelected(event)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={cat.variant}>{cat.label}</Badge>
                    {event.hasCertificate && <Badge variant="success" size="sm"><Award size={10} className="mr-0.5" />Certificate</Badge>}
                  </div>
                  {event.isRegistered && <Badge variant="success" dot>Registered</Badge>}
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{event.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{event.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><Calendar size={12} />{formatDate(event.startDate)}</div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><MapPin size={12} />{event.venue}</div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><Users size={12} />{event.registeredCount}/{event.maxParticipants}</div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: days <= 3 ? '#ef4444' : 'var(--text-muted)' }}><Ticket size={12} />{days > 0 ? `${days}d to go` : 'Today!'}</div>
                </div>
                {/* Capacity bar */}
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-3">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : '#6366f1' }} />
                </div>
                <Button
                  variant={event.isRegistered ? 'ghost' : 'primary'}
                  size="sm"
                  className="w-full"
                  onClick={e => { e.stopPropagation(); toggleRegister(event.id); }}
                >
                  {event.isRegistered ? 'Cancel Registration' : 'Register Now'}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={categoryConfig[selected.category].variant}>{categoryConfig[selected.category].label}</Badge>
              {selected.hasCertificate && <Badge variant="success"><Award size={11} className="mr-0.5" />Certificate Provided</Badge>}
              {selected.isRegistered && <Badge variant="success" dot>You are registered</Badge>}
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Start Date', val: formatDate(selected.startDate) },
                { label: 'End Date', val: formatDate(selected.endDate) },
                { label: 'Venue', val: selected.venue },
                { label: 'Organizer', val: selected.organizer },
                { label: 'Capacity', val: `${selected.registeredCount}/${selected.maxParticipants}` },
                { label: 'Registration Deadline', val: formatDate(selected.registrationDeadline) },
              ].map(({ label, val }) => (
                <div key={label} className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-[var(--text-muted)]">{label}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {selected.tags.map(t => <Badge key={t} variant="default" size="sm">{t}</Badge>)}
            </div>
            <Button variant={selected.isRegistered ? 'ghost' : 'primary'} className="w-full" onClick={() => { toggleRegister(selected.id); setSelected(null); }}>
              {selected.isRegistered ? 'Cancel Registration' : 'Register for Event'}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
