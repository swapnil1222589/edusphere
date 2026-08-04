'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import { mockAssignments } from '@/data/mock';
import { formatDate, getDaysUntil } from '@/lib/utils';
import { ClipboardList, Upload, Download, ChevronRight, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Assignment } from '@/types';

type Filter = 'all' | 'pending' | 'submitted' | 'graded' | 'late';

const statusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const },
  submitted: { label: 'Submitted', variant: 'info' as const },
  graded: { label: 'Graded', variant: 'success' as const },
  late: { label: 'Late', variant: 'danger' as const },
};

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [assignments, setAssignments] = useState(mockAssignments);

  const filtered = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  const handleSubmit = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted' as const, submittedAt: new Date().toISOString() } : a));
    toast.success('Assignment submitted successfully!');
    setSelectedAssignment(null);
  };

  const filters: { label: string; value: Filter; count: number }[] = [
    { label: 'All', value: 'all', count: assignments.length },
    { label: 'Pending', value: 'pending', count: assignments.filter(a => a.status === 'pending').length },
    { label: 'Submitted', value: 'submitted', count: assignments.filter(a => a.status === 'submitted').length },
    { label: 'Graded', value: 'graded', count: assignments.filter(a => a.status === 'graded').length },
    { label: 'Late', value: 'late', count: assignments.filter(a => a.status === 'late').length },
  ];

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Assignments</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">View, submit, and track your assignments</p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${filter === f.value ? 'bg-indigo-600 text-white' : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            {f.label}
            <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${filter === f.value ? 'bg-white/20' : 'bg-white/10'}`}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* Assignment list */}
      {filtered.length === 0 ? (
        <EmptyState icon={<ClipboardList />} title="No assignments here" description="You're all caught up! Nothing in this category." />
      ) : (
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => {
              const days = getDaysUntil(a.dueDate);
              const isUrgent = days <= 2 && a.status === 'pending';
              return (
                <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.04 }}>
                  <Card hover className={`cursor-pointer ${isUrgent ? 'border-red-500/30' : ''}`} onClick={() => setSelectedAssignment(a)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isUrgent ? 'bg-red-500/15' : 'bg-indigo-500/15'}`}>
                        <ClipboardList size={18} className={isUrgent ? 'text-red-400' : 'text-indigo-400'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{a.title}</p>
                          {isUrgent && <Badge variant="danger" size="sm">Urgent!</Badge>}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{a.subjectCode} • {a.facultyName}</p>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <Clock size={11} />
                            {a.status === 'pending' ? `Due ${days > 0 ? `in ${days}d` : 'today'}` : `Due ${formatDate(a.dueDate)}`}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">{a.maxMarks} marks</span>
                          {a.marks !== undefined && (
                            <span className="text-xs font-semibold text-emerald-400">{a.marks}/{a.maxMarks}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={statusConfig[a.status].variant} dot>{statusConfig[a.status].label}</Badge>
                        <ChevronRight size={16} className="text-[var(--text-muted)]" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Assignment Detail Modal */}
      <Modal isOpen={!!selectedAssignment} onClose={() => setSelectedAssignment(null)} title={selectedAssignment?.title || ''} size="lg">
        {selectedAssignment && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="indigo">{selectedAssignment.subjectCode}</Badge>
              <Badge variant={statusConfig[selectedAssignment.status].variant} dot>{statusConfig[selectedAssignment.status].label}</Badge>
              <Badge variant="default">{selectedAssignment.maxMarks} marks</Badge>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedAssignment.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-[var(--text-muted)]">Faculty</p>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{selectedAssignment.facultyName}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-[var(--text-muted)]">Due Date</p>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{formatDate(selectedAssignment.dueDate)}</p>
              </div>
            </div>
            {selectedAssignment.feedback && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs font-semibold text-emerald-400 mb-1">Faculty Feedback</p>
                <p className="text-sm text-[var(--text-secondary)]">{selectedAssignment.feedback}</p>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              {selectedAssignment.fileUrl && (
                <Button variant="secondary" size="sm" icon={<Download size={14} />}>Download Question</Button>
              )}
              {selectedAssignment.status === 'pending' && (
                <Button size="sm" icon={<Upload size={14} />} onClick={() => handleSubmit(selectedAssignment.id)}>
                  Submit Assignment
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
