'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockStudents, mockFaculty, mockDepartments, mockPlacementStats, mockStudentGrowth, mockAcademicPerformance } from '@/data/mock';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Download, FileText, TrendingUp, Users, GraduationCap, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminReportsPage() {
  const reports = [
    { label: 'Student Enrollment Report', desc: 'Full breakdown of students by department, year, and status', icon: GraduationCap, color: '#6366f1' },
    { label: 'Faculty Performance Report', desc: 'Teaching load, student ratings, and subject analytics', icon: Users, color: '#06b6d4' },
    { label: 'Attendance Analytics', desc: 'College-wide attendance rates by department and semester', icon: TrendingUp, color: '#10b981' },
    { label: 'Placement Report', desc: 'Company-wise placement data, packages, and offer letters', icon: Award, color: '#f59e0b' },
  ];

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Reports & Analytics</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Generate and download institutional reports</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card hover className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${r.color}20` }}>
                  <Icon size={20} style={{ color: r.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{r.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{r.desc}</p>
                </div>
                <Button size="sm" variant="secondary" icon={<Download size={13} />} onClick={() => toast.success(`Downloading ${r.label}...`)}>
                  Export
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Placement Trend</CardTitle><Badge variant="success">5-Year</Badge></CardHeader>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockPlacementStats} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="placed" stroke="#6366f1" strokeWidth={2.5} name="Placed" dot={{ fill: '#6366f1', r: 3 }} />
              <Line type="monotone" dataKey="offers" stroke="#10b981" strokeWidth={2.5} name="Offers" dot={{ fill: '#10b981', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <CardHeader><CardTitle>Academic Performance</CardTitle><Badge variant="indigo">By Subject</Badge></CardHeader>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAcademicPerformance} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Bar dataKey="avg" fill="#6366f1" radius={[4,4,0,0]} name="Avg" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Department Summary</CardTitle></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Department', 'Code', 'HOD', 'Students', 'Faculty', 'Est.'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[var(--text-muted)] px-3 py-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockDepartments.map(d => (
                <tr key={d.id} className="border-b border-[var(--border)] last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-3 py-2.5 text-xs text-[var(--text-primary)] font-medium">{d.name}</td>
                  <td className="px-3 py-2.5"><Badge variant="indigo" size="sm">{d.code}</Badge></td>
                  <td className="px-3 py-2.5 text-xs text-[var(--text-secondary)]">{d.hodName}</td>
                  <td className="px-3 py-2.5 text-xs text-[var(--text-primary)] font-bold">{d.studentCount}</td>
                  <td className="px-3 py-2.5 text-xs text-[var(--text-primary)]">{d.facultyCount}</td>
                  <td className="px-3 py-2.5 text-xs text-[var(--text-muted)]">{d.established}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
