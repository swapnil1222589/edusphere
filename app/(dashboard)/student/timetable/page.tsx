'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockTimetable } from '@/data/mock';
import { formatTime } from '@/lib/utils';
import { Clock, MapPin, User } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '11:30', '12:00', '12:30', '13:00', '14:00', '15:00', '16:00', '17:00'];

export default function TimetablePage() {
  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Monday');

  const todaySlots = mockTimetable.filter(s => s.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Timetable</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Your weekly class schedule</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl p-1">
          {(['week', 'day'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer ${view === v ? 'bg-indigo-600 text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{v}</button>
          ))}
        </div>
      </motion.div>

      {view === 'day' && (
        <div className="flex gap-2 flex-wrap">
          {DAYS.map(d => (
            <button key={d} onClick={() => setSelectedDay(d)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${selectedDay === d ? 'bg-indigo-600 text-white' : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{d}</button>
          ))}
        </div>
      )}

      {view === 'week' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DAYS.map(day => {
            const daySlots = mockTimetable.filter(s => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
            return (
              <motion.div key={day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>{day}</CardTitle>
                    <Badge variant="default" size="sm">{daySlots.length} classes</Badge>
                  </CardHeader>
                  {daySlots.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] text-center py-6">No classes</p>
                  ) : (
                    <div className="space-y-2">
                      {daySlots.map(slot => (
                        <div key={slot.id} className="flex gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors" style={{ borderLeft: `3px solid ${slot.color}` }}>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{slot.subjectName}</p>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{slot.subjectCode}</p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><Clock size={10} />{formatTime(slot.startTime)}–{formatTime(slot.endTime)}</span>
                              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><MapPin size={10} />{slot.room}</span>
                            </div>
                          </div>
                          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: slot.color }} />
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{selectedDay}&apos;s Schedule</CardTitle>
            <Badge variant="indigo">{todaySlots.length} classes</Badge>
          </CardHeader>
          {todaySlots.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] text-center py-12">No classes scheduled for {selectedDay}</p>
          ) : (
            <div className="space-y-3">
              {todaySlots.map(slot => (
                <motion.div key={slot.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-white/4 transition-colors border border-[var(--border)]"
                  style={{ borderLeftColor: slot.color, borderLeftWidth: 3 }}
                >
                  <div className="text-right min-w-24">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{formatTime(slot.startTime)}</p>
                    <p className="text-xs text-[var(--text-muted)]">{formatTime(slot.endTime)}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{slot.subjectName}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{slot.subjectCode}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"><User size={12} />{slot.faculty}</span>
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"><MapPin size={12} />{slot.room}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${slot.color}25` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: slot.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Legend */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-3">
          {[...new Set(mockTimetable.map(s => s.subjectName))].map((name, i) => {
            const slot = mockTimetable.find(s => s.subjectName === name)!;
            return (
              <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: slot.color }} />
                <span>{slot.subjectCode} – {name}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
