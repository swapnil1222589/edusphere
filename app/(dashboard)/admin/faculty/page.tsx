'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { mockFaculty } from '@/data/mock';
import { Search, Plus, MoreVertical, BookOpen } from 'lucide-react';

export default function AdminFacultyPage() {
  const [search, setSearch] = useState('');
  const filtered = mockFaculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) || f.employeeId.includes(search)
  );

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Faculty Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage faculty members and their assignments</p>
        </div>
        <Button icon={<Plus size={16} />}>Add Faculty</Button>
      </motion.div>

      <div className="flex items-center gap-2 glass px-3 py-2.5 rounded-xl">
        <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
        <input type="text" placeholder="Search faculty…" value={search} onChange={e => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full p-0 shadow-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((f, i) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card hover>
              <div className="flex items-start gap-3">
                <Avatar name={f.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[var(--text-primary)]">{f.name}</p>
                    <button className="p-1 rounded-lg hover:bg-white/8 text-[var(--text-muted)] cursor-pointer"><MoreVertical size={14} /></button>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{f.designation} • {f.employeeId}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="indigo" size="sm">{f.department.split(' ')[0]}</Badge>
                    <Badge variant={f.status === 'active' ? 'success' : 'default'} dot size="sm">{f.status}</Badge>
                    <Badge variant="default" size="sm">{f.experience}y exp</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {f.subjects.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-md">
                        <BookOpen size={9} />{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
