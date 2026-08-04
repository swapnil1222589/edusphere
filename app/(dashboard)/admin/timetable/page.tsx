'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockTimetable } from '@/data/mock';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatTime } from '@/lib/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export default function AdminTimetablePage() {
  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Timetable Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage class schedules across all departments</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => toast.success('Add slot form coming soon!')}>Add Slot</Button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Slots', value: mockTimetable.length, color: '#6366f1' },
          { label: 'Days Active', value: DAYS.length, color: '#10b981' },
          { label: 'Subjects', value: new Set(mockTimetable.map(s => s.subjectId)).size, color: '#f59e0b' },
          { label: 'Rooms Used', value: new Set(mockTimetable.map(s => s.room)).size, color: '#06b6d4' },
        ].map((s, i) => (
          <Card key={i} padding="sm" className="text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DAYS.map(day => {
          const daySlots = mockTimetable.filter(s => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle>{day}</CardTitle>
                <Badge variant="default" size="sm">{daySlots.length} slots</Badge>
              </CardHeader>
              <div className="space-y-2">
                {daySlots.map(slot => (
                  <div key={slot.id} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/4 transition-colors group" style={{ borderLeft: `3px solid ${slot.color}` }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{slot.subjectCode}</p>
                      <p className="text-xs text-[var(--text-muted)]">{formatTime(slot.startTime)} – {formatTime(slot.endTime)}</p>
                      <p className="text-xs text-[var(--text-muted)]">{slot.room} • {slot.faculty.split(' ').slice(-1)[0]}</p>
                    </div>
                    <button onClick={() => toast.success('Editing slot...')} className="opacity-0 group-hover:opacity-100 text-xs text-indigo-400 cursor-pointer transition-opacity">Edit</button>
                  </div>
                ))}
                {daySlots.length === 0 && <p className="text-xs text-[var(--text-muted)] text-center py-4">No classes</p>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
