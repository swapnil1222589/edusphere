'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { mockStudents } from '@/data/mock';
import { CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import toast from 'react-hot-toast';

type AttStatus = 'present' | 'absent' | 'late';

export default function FacultyAttendancePage() {
  const subjects = [
    { id: '1', name: 'Data Structures & Algorithms', code: 'CS301' },
    { id: '6', name: 'Machine Learning', code: 'CS306' },
  ];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [attendance, setAttendance] = useState<Record<string, AttStatus>>({});
  const [saved, setSaved] = useState(false);

  const markAll = (status: AttStatus) => {
    const all: Record<string, AttStatus> = {};
    mockStudents.forEach(s => { all[s.id] = status; });
    setAttendance(all);
  };

  const toggleStatus = (id: string) => {
    setAttendance(prev => {
      const current = prev[id] || 'present';
      const next: AttStatus = current === 'present' ? 'absent' : current === 'absent' ? 'late' : 'present';
      return { ...prev, [id]: next };
    });
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Attendance saved for ' + selectedSubject.code);
    setTimeout(() => setSaved(false), 3000);
  };

  const statusConfig = {
    present: { icon: CheckCircle, color: '#10b981', bg: 'bg-emerald-500/20 border-emerald-500/30', label: 'Present' },
    absent: { icon: XCircle, color: '#ef4444', bg: 'bg-red-500/20 border-red-500/30', label: 'Absent' },
    late: { icon: Clock, color: '#f59e0b', bg: 'bg-amber-500/20 border-amber-500/30', label: 'Late' },
  };

  const counts = { present: 0, absent: 0, late: 0 };
  Object.values(attendance).forEach(s => counts[s]++);
  const total = mockStudents.length;

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Attendance</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Mark and manage student attendance</p>
      </motion.div>

      <Card>
        <CardHeader><CardTitle>Select Subject</CardTitle></CardHeader>
        <div className="flex gap-2 flex-wrap">
          {subjects.map(s => (
            <button key={s.id} onClick={() => setSelectedSubject(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${selectedSubject.id === s.id ? 'bg-indigo-600 text-white border-indigo-500' : 'glass text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]'}`}>
              {s.code} – {s.name}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {(['present', 'absent', 'late'] as AttStatus[]).map(s => {
          const cfg = statusConfig[s];
          return (
            <Card key={s} padding="sm" className="text-center">
              <p className="text-2xl font-bold" style={{ color: cfg.color }}>{counts[s]}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{cfg.label}</p>
              <p className="text-xs text-[var(--text-muted)]">of {total}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students – {selectedSubject.code}</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="success" onClick={() => markAll('present')}>Mark All Present</Button>
            <Button size="sm" variant="danger" onClick={() => markAll('absent')}>Mark All Absent</Button>
          </div>
        </CardHeader>
        <p className="text-xs text-[var(--text-muted)] mb-4">Click to toggle: Present → Absent → Late → Present</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mockStudents.map(student => {
            const status = attendance[student.id] || 'present';
            const cfg = statusConfig[status];
            const Icon = cfg.icon;
            return (
              <button key={student.id} onClick={() => toggleStatus(student.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${cfg.bg} hover:opacity-90`}>
                <Avatar name={student.name} size="sm" />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{student.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{student.rollNumber}</p>
                </div>
                <Icon size={18} style={{ color: cfg.color }} />
              </button>
            );
          })}
        </div>
        <div className="flex justify-end mt-4">
          <Button icon={<Save size={14} />} onClick={handleSave} loading={saved}>
            {saved ? 'Saved!' : 'Save Attendance'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
