'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockNotes } from '@/data/mock';
import { Note } from '@/types';
import { formatDate } from '@/lib/utils';
import { BookOpen, Upload, Plus, Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyNotesPage() {
  const [notes, setNotes] = useState(mockNotes);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', subjectCode: 'CS301', tags: '' });

  const handleCreate = () => {
    if (!form.title) { toast.error('Title is required'); return; }
    const newNote: Note = {
      id: Date.now().toString(), title: form.title, description: form.description,
      subjectId: '1', subjectName: 'Data Structures', subjectCode: form.subjectCode,
      facultyId: 'f1', facultyName: 'Dr. Anjali Sharma',
      fileUrl: '#', fileName: `${form.title.replace(/\s+/g, '_')}.pdf`, fileSize: '1.2 MB',
      uploadedAt: new Date().toISOString(), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      downloads: 0, isFavorited: false,
    };
    setNotes(prev => [newNote, ...prev]);
    toast.success('Notes uploaded successfully!');
    setShowCreate(false);
    setForm({ title: '', description: '', subjectCode: 'CS301', tags: '' });
  };

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    toast('Note deleted', { icon: '🗑️' });
  };

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Notes Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Upload and manage study materials</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowCreate(true)}>Upload Notes</Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, i) => (
          <motion.div key={note.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card hover className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-indigo-400" />
                </div>
                <Badge variant="default" size="sm">{note.subjectCode}</Badge>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 flex-1">{note.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{note.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {note.tags.map(t => <Badge key={t} variant="indigo" size="sm">{t}</Badge>)}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">{note.fileSize} • {note.downloads} downloads</p>
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(note.uploadedAt)}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" icon={<Download size={13} />} onClick={() => toast.success('Downloading...')} />
                  <Button size="sm" variant="danger" icon={<Trash2 size={13} />} onClick={() => handleDelete(note.id)} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Upload Study Notes" size="md">
        <div className="space-y-3">
          <input placeholder="Notes title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <textarea rows={2} placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <select value={form.subjectCode} onChange={e => setForm(f => ({ ...f, subjectCode: e.target.value }))}>
            <option value="CS301">CS301 – Data Structures</option>
            <option value="CS306">CS306 – Machine Learning</option>
          </select>
          <input placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
          <div className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-[var(--border)] cursor-pointer hover:border-indigo-500/50 transition-colors">
            <div className="text-center">
              <Upload size={20} className="mx-auto mb-1 text-[var(--text-muted)]" />
              <p className="text-xs text-[var(--text-muted)]">Drop PDF here or click to browse</p>
            </div>
          </div>
          <Button className="w-full" onClick={handleCreate}>Upload Notes</Button>
        </div>
      </Modal>
    </div>
  );
}
