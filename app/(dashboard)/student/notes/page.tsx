'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { mockNotes } from '@/data/mock';
import { Note } from '@/types';
import { BookOpen, Download, Heart, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [showFavs, setShowFavs] = useState(false);

  const subjects = ['all', ...new Set(mockNotes.map(n => n.subjectCode))];

  const filtered = notes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.tags.some(t => t.includes(search.toLowerCase()));
    const matchSubject = subjectFilter === 'all' || n.subjectCode === subjectFilter;
    const matchFav = !showFavs || n.isFavorited;
    return matchSearch && matchSubject && matchFav;
  });

  const toggleFav = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isFavorited: !n.isFavorited } : n));
  };

  const handleDownload = (note: Note) => {
    setNotes(prev => prev.map(n => n.id === note.id ? { ...n, downloads: n.downloads + 1 } : n));
    toast.success(`Downloading "${note.title}"...`);
  };

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Notes Repository</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Browse and download study materials</p>
      </motion.div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 glass px-3 py-2.5 rounded-xl">
          <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
          <input type="text" placeholder="Search notes, tags…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-full p-0 shadow-none" />
        </div>
        <div className="flex gap-2">
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="glass text-sm rounded-xl px-3 py-2 w-auto cursor-pointer">
            {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
          </select>
          <button onClick={() => setShowFavs(!showFavs)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${showFavs ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'glass text-[var(--text-secondary)] border-[var(--border)]'}`}>
            <Heart size={14} fill={showFavs ? 'currentColor' : 'none'} /> Favorites
          </button>
        </div>
      </div>

      {/* Notes grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={<BookOpen />} title="No notes found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((note, i) => (
              <motion.div key={note.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={18} className="text-indigo-400" />
                    </div>
                    <button onClick={() => toggleFav(note.id)} className="p-1.5 rounded-lg hover:bg-white/8 transition-colors cursor-pointer">
                      <Heart size={16} className={note.isFavorited ? 'text-amber-400 fill-current' : 'text-[var(--text-muted)]'} />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 leading-snug">{note.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-3 flex-1 line-clamp-2">{note.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {note.tags.map(tag => (
                      <Badge key={tag} variant="indigo" size="sm">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                    <div>
                      <p className="text-xs font-medium text-[var(--text-secondary)]">{note.subjectCode}</p>
                      <p className="text-xs text-[var(--text-muted)]">{note.fileSize} • {note.downloads} downloads</p>
                    </div>
                    <Button size="sm" variant="outline" icon={<Download size={13} />} onClick={() => handleDownload(note)}>
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
