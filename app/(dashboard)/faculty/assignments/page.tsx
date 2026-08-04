'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockAssignments, mockStudents } from '@/data/mock';
import { Assignment } from '@/types';
import { formatDate } from '@/lib/utils';
import { ClipboardList, Plus, Star, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyAssignmentsPage() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [grading, setGrading] = useState<Assignment | null>(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', subjectCode: 'CS301', maxMarks: '20', dueDate: '' });

  const handleGrade = () => {
    if (!grading) return;
    setAssignments(prev => prev.map(a => a.id === grading.id ? { ...a, status: 'graded' as const, marks: Number(marks), feedback } : a));
    toast.success('Marks saved!');
    setGrading(null);
    setMarks('');
    setFeedback('');
  };

  const handleCreate = () => {
    if (!form.title || !form.dueDate) { toast.error('Please fill required fields'); return; }
    const newA: Assignment = {
      id: Date.now().toString(), title: form.title, description: form.description,
      subjectId: '1', subjectName: 'Data Structures', subjectCode: form.subjectCode,
      facultyId: 'f1', facultyName: 'Dr. Anjali Sharma',
      dueDate: form.dueDate, createdAt: new Date().toISOString(),
      maxMarks: Number(form.maxMarks), status: 'pending',
    };
    setAssignments(prev => [newA, ...prev]);
    toast.success('Assignment created!');
    setShowCreate(false);
  };

  const stats = [
    { label: 'Total', value: assignments.length, color: '#6366f1' },
    { label: 'Pending Review', value: assignments.filter(a => a.status === 'submitted').length, color: '#f59e0b' },
    { label: 'Graded', value: assignments.filter(a => a.status === 'graded').length, color: '#10b981' },
  ];

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Assignments</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Create, review, and grade assignments</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowCreate(true)}>Create Assignment</Button>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <Card key={i} padding="sm" className="text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {assignments.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                  <ClipboardList size={16} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{a.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{a.subjectCode} • Due: {formatDate(a.dueDate)} • {a.maxMarks} marks</p>
                  {a.marks !== undefined && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={11} className="text-amber-400 fill-current" />
                      <span className="text-xs text-amber-400 font-semibold">{a.marks}/{a.maxMarks} awarded</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={a.status === 'graded' ? 'success' : a.status === 'submitted' ? 'warning' : a.status === 'pending' ? 'default' : 'danger'} dot>{a.status}</Badge>
                  {a.status === 'submitted' && (
                    <Button size="sm" variant="outline" onClick={() => { setGrading(a); setMarks(String(a.marks || '')); setFeedback(a.feedback || ''); }}>
                      Grade
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grade modal */}
      <Modal isOpen={!!grading} onClose={() => setGrading(null)} title={`Grade: ${grading?.title}`} size="md">
        {grading && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5">
              <p className="text-xs text-[var(--text-muted)]">Subject & Max Marks</p>
              <p className="text-sm font-medium text-[var(--text-primary)]">{grading.subjectCode} • {grading.maxMarks} marks</p>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Marks Awarded (out of {grading.maxMarks})</label>
              <input type="number" min="0" max={grading.maxMarks} value={marks} onChange={e => setMarks(e.target.value)} placeholder="e.g. 18" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Feedback (optional)</label>
              <textarea rows={3} value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Write feedback for the student…" />
            </div>
            <Button className="w-full" icon={<Save size={14} />} onClick={handleGrade}>Save Marks</Button>
          </div>
        )}
      </Modal>

      {/* Create modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Assignment" size="md">
        <div className="space-y-3">
          <input placeholder="Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <textarea rows={3} placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.subjectCode} onChange={e => setForm(f => ({ ...f, subjectCode: e.target.value }))}>
              <option value="CS301">CS301</option><option value="CS306">CS306</option>
            </select>
            <input type="number" placeholder="Max Marks" value={form.maxMarks} onChange={e => setForm(f => ({ ...f, maxMarks: e.target.value }))} />
          </div>
          <input type="datetime-local" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          <Button className="w-full" onClick={handleCreate}>Create Assignment</Button>
        </div>
      </Modal>
    </div>
  );
}
