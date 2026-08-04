'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { mockStudents, mockAcademicPerformance, mockAttendanceMonthly } from '@/data/mock';
import { getAttendanceColor } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, ScatterChart, Scatter, ZAxis } from 'recharts';

export default function FacultyAnalyticsPage() {
  const lowAttendance = mockStudents.filter(s => s.attendance < 75);
  const topStudents = [...mockStudents].sort((a, b) => b.cgpa - a.cgpa).slice(0, 5);

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Student Analytics</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Insights on student performance and attendance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Subject Performance</CardTitle><Badge variant="indigo">Average</Badge></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockAcademicPerformance} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Bar dataKey="avg" fill="#6366f1" radius={[4,4,0,0]} name="Class Avg" />
              <Bar dataKey="highest" fill="#10b981" radius={[4,4,0,0]} name="Highest" />
              <Bar dataKey="lowest" fill="#ef4444" radius={[4,4,0,0]} name="Lowest" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Attendance Trend</CardTitle></CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockAttendanceMonthly} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60,100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Low attendance */}
        {lowAttendance.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>⚠️ Low Attendance Students</CardTitle>
              <Badge variant="danger">{lowAttendance.length} students</Badge>
            </CardHeader>
            <div className="space-y-3">
              {lowAttendance.map(s => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                  <Avatar name={s.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{s.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.rollNumber}</p>
                    <ProgressBar value={s.attendance} max={100} size="sm" className="mt-1" />
                  </div>
                  <span className="text-sm font-bold text-red-400 flex-shrink-0">{s.attendance}%</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Top students */}
        <Card>
          <CardHeader><CardTitle>🏆 Top Performers</CardTitle><Badge variant="success">By CGPA</Badge></CardHeader>
          <div className="space-y-3">
            {topStudents.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: i === 0 ? '#f59e0b40' : i === 1 ? '#94a3b840' : '#cd7c4040', color: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : '#cd7c40' }}>
                  {i + 1}
                </div>
                <Avatar name={s.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{s.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{s.rollNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">{s.cgpa}</p>
                  <p className="text-xs text-[var(--text-muted)]">CGPA</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
