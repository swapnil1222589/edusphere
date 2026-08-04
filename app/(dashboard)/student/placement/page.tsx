'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockPlacementDrives } from '@/data/mock';
import { PlacementDrive } from '@/types';
import { formatDate, getDaysUntil } from '@/lib/utils';
import { Briefcase, Calendar, MapPin, CheckCircle, XCircle, Clock, TrendingUp, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const statusConfig = {
  upcoming: { label: 'Upcoming', variant: 'indigo' as const },
  ongoing: { label: 'Ongoing', variant: 'success' as const },
  completed: { label: 'Completed', variant: 'default' as const },
};

const appStatusConfig = {
  applied: { label: 'Applied', variant: 'info' as const },
  shortlisted: { label: 'Shortlisted 🎉', variant: 'success' as const },
  rejected: { label: 'Rejected', variant: 'danger' as const },
  selected: { label: 'Selected 🏆', variant: 'success' as const },
};

export default function PlacementPage() {
  const [drives, setDrives] = useState(mockPlacementDrives);
  const [selected, setSelected] = useState<PlacementDrive | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'applied'>('all');

  const filtered = drives.filter(d => {
    if (filter === 'upcoming') return d.status === 'upcoming';
    if (filter === 'applied') return d.isApplied;
    return true;
  });

  const handleApply = (id: string) => {
    setDrives(prev => prev.map(d => d.id === id ? { ...d, isApplied: true, applicationStatus: 'applied' as const } : d));
    toast.success('Application submitted successfully!');
    setSelected(null);
  };

  const stats = [
    { label: 'Applied', value: drives.filter(d => d.isApplied).length, icon: Briefcase, color: '#6366f1' },
    { label: 'Shortlisted', value: drives.filter(d => d.applicationStatus === 'shortlisted').length, icon: TrendingUp, color: '#10b981' },
    { label: 'Upcoming Drives', value: drives.filter(d => d.status === 'upcoming').length, icon: Calendar, color: '#f59e0b' },
    { label: 'Offers', value: drives.filter(d => d.applicationStatus === 'selected').length, icon: Award, color: '#06b6d4' },
  ];

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Placement Portal</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Companies, drives, and your application tracker</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}20` }}>
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{s.value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[{ label: 'All Drives', value: 'all' }, { label: 'Upcoming', value: 'upcoming' }, { label: 'Applied', value: 'applied' }].map(f => (
          <button key={f.value} onClick={() => setFilter(f.value as typeof filter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${filter === f.value ? 'bg-indigo-600 text-white' : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Drive cards */}
      <div className="grid gap-4">
        {filtered.map((drive, i) => (
          <motion.div key={drive.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card hover className="cursor-pointer" onClick={() => setSelected(drive)}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {drive.companyLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{drive.companyName}</h3>
                    <Badge variant={statusConfig[drive.status].variant}>{statusConfig[drive.status].label}</Badge>
                    {drive.applicationStatus && <Badge variant={appStatusConfig[drive.applicationStatus].variant} dot>{appStatusConfig[drive.applicationStatus].label}</Badge>}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{drive.role} • {drive.type === 'internship' ? 'Internship' : 'Full-Time'}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-semibold text-emerald-400">💰 {drive.package}</span>
                    <span className="text-xs text-[var(--text-muted)]">CGPA ≥ {drive.eligibilityCgpa}</span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><Calendar size={11} />Drive: {formatDate(drive.driveDate)}</span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><MapPin size={11} />{drive.venue}</span>
                  </div>
                </div>
                {!drive.isApplied && drive.status === 'upcoming' && (
                  <Button size="sm" onClick={e => { e.stopPropagation(); handleApply(drive.id); }}>Apply</Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.companyName} – ${selected.role}` : ''} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={statusConfig[selected.status].variant}>{statusConfig[selected.status].label}</Badge>
              <Badge variant={selected.type === 'internship' ? 'purple' : 'indigo'}>{selected.type === 'internship' ? 'Internship' : 'Full-Time'}</Badge>
              <Badge variant="success">💰 {selected.package}</Badge>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Registration Deadline', val: formatDate(selected.registrationDeadline) },
                { label: 'Drive Date', val: formatDate(selected.driveDate) },
                { label: 'Venue', val: selected.venue },
                { label: 'Eligibility CGPA', val: `≥ ${selected.eligibilityCgpa}` },
              ].map(({ label, val }) => (
                <div key={label} className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-[var(--text-muted)]">{label}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{val}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">{selected.skills.map(s => <Badge key={s} variant="indigo">{s}</Badge>)}</div>
            </div>
            {!selected.isApplied && selected.status === 'upcoming' && (
              <Button className="w-full" onClick={() => handleApply(selected.id)}>Apply Now</Button>
            )}
            {selected.applicationStatus && (
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-sm font-semibold" style={{ color: selected.applicationStatus === 'shortlisted' || selected.applicationStatus === 'selected' ? '#10b981' : selected.applicationStatus === 'rejected' ? '#ef4444' : '#06b6d4' }}>
                  Application Status: {appStatusConfig[selected.applicationStatus].label}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
