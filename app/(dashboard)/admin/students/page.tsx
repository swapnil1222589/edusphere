'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { mockStudents } from '@/data/mock';
import { StudentRecord } from '@/types';
import { Search, Plus, GraduationCap, Mail, MoreVertical } from 'lucide-react';
import { getAttendanceColor } from '@/lib/utils';

export default function AdminStudentsPage() {
  const [students] = useState(mockStudents);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const depts = ['all', ...new Set(mockStudents.map(s => s.department))];
  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.includes(search);
    const matchDept = deptFilter === 'all' || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Student Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">View and manage all enrolled students</p>
        </div>
        <Button icon={<Plus size={16} />}>Add Student</Button>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Students', value: students.length, color: '#6366f1' },
          { label: 'Active', value: students.filter(s => s.status === 'active').length, color: '#10b981' },
          { label: 'Avg CGPA', value: (students.reduce((s, st) => s + st.cgpa, 0) / students.length).toFixed(2), color: '#f59e0b' },
        ].map((s, i) => (
          <Card key={i} padding="sm" className="text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 glass px-3 py-2.5 rounded-xl">
          <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
          <input type="text" placeholder="Search by name or roll number…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full p-0 shadow-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="glass text-sm rounded-xl px-3 py-2 w-auto cursor-pointer">
          {depts.map(d => <option key={d} value={d}>{d === 'all' ? 'All Departments' : d}</option>)}
        </select>
      </div>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Student', 'Roll No', 'Department', 'Sem/Year', 'CGPA', 'Attendance', 'Status', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[var(--text-muted)] px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.name} size="sm" />
                      <div>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">{s.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)] whitespace-nowrap">{s.rollNumber}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{s.department.split(' ')[0]}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">Sem {s.semester} / Year {s.year}</td>
                  <td className="px-4 py-3 text-xs font-bold text-emerald-400">{s.cgpa}</td>
                  <td className="px-4 py-3 text-xs font-bold whitespace-nowrap" style={{ color: s.attendance >= 75 ? '#10b981' : '#ef4444' }}>{s.attendance}%</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.status === 'active' ? 'success' : 'default'} dot size="sm">{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 rounded-lg hover:bg-white/8 text-[var(--text-muted)] cursor-pointer"><MoreVertical size={14} /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
