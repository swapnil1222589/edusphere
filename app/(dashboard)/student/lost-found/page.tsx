'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import { mockLostFound } from '@/data/mock';
import { LostFoundItem } from '@/types';
import { formatDate } from '@/lib/utils';
import { Search, Plus, Phone, MapPin, Tag, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LostFoundPage() {
  const [items, setItems] = useState(mockLostFound);
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'lost', title: '', description: '', category: '', location: '' });

  const filtered = items.filter(i => {
    const matchFilter = filter === 'all' || i.type === filter;
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch && !i.isResolved;
  });

  const handleReport = () => {
    if (!form.title || !form.description) { toast.error('Please fill all required fields'); return; }
    const newItem: LostFoundItem = {
      id: Date.now().toString(), type: form.type as 'lost' | 'found',
      title: form.title, description: form.description, category: form.category,
      location: form.location, date: new Date().toISOString().split('T')[0],
      reportedBy: 'You', reporterContact: '9876543210', isResolved: false,
      createdAt: new Date().toISOString(),
    };
    setItems(prev => [newItem, ...prev]);
    toast.success('Report submitted!');
    setShowModal(false);
    setForm({ type: 'lost', title: '', description: '', category: '', location: '' });
  };

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Lost & Found</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Report and find lost items on campus</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={<Plus size={16} />}>Report Item</Button>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 glass px-3 py-2.5 rounded-xl">
          <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
          <input type="text" placeholder="Search items…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full p-0 shadow-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
        </div>
        <div className="flex items-center gap-2 glass rounded-xl p-1">
          {(['all', 'lost', 'found'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${filter === f ? 'bg-indigo-600 text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{f}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Search />} title="No items found" description="No matching reports. Help someone by reporting an item you found!" action={<Button size="sm" onClick={() => setShowModal(true)} icon={<Plus size={14} />}>Report Item</Button>} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={item.type === 'lost' ? 'danger' : 'success'} dot>{item.type === 'lost' ? 'Lost' : 'Found'}</Badge>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(item.createdAt)}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{item.description}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><Tag size={11} />{item.category}</div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><MapPin size={11} />{item.location}</div>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--border)]">
                  <div>
                    <p className="text-xs font-medium text-[var(--text-secondary)]">Reported by: {item.reportedBy}</p>
                  </div>
                  <Button size="sm" variant="outline" icon={<Phone size={12} />} onClick={() => toast.success(`Calling ${item.reporterContact}`)}>Contact</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Report an Item" size="md">
        <div className="space-y-3">
          <div className="flex items-center gap-2 glass rounded-xl p-1">
            {(['lost', 'found'] as const).map(t => (
              <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${form.type === t ? 'bg-indigo-600 text-white' : 'text-[var(--text-secondary)]'}`}>{t}</button>
            ))}
          </div>
          <input placeholder="Item title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <textarea placeholder="Description *" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
          <input placeholder="Category (e.g. Electronics, Books)" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <input placeholder="Location where lost/found" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          <Button className="w-full" onClick={handleReport}>Submit Report</Button>
        </div>
      </Modal>
    </div>
  );
}
