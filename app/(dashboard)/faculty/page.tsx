'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { mockStudents, mockAssignments, mockAttendanceSummary, mockAcademicPerformance, mockNotifications } from '@/data/mock';
import { useAuth } from '@/hooks/useAuth';
import { Users, ClipboardList, BookOpen, Bell, TrendingUp, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function FacultyDashboard() {
  const { user } = useAuth();
  const myStudents = mockStudents.slice(0, 6);
  const pendingGrading = mockAssignments.filter(a => a.status === 'submitted').length;
  const attendanceData = [{ name: 'CS301', present: 38, absent: 4 }, { name: 'CS306', present: 22, absent: 10 }];

  const stats = [
    { label: 'Total Students', value: 142, icon: Users, color: '#6366f1' },
    { label: 'Pending Grading', value: pendingGrading, icon: ClipboardList, color: '#f59e0b' },
    { label: 'Notes Uploaded', value: 24, icon: BookOpen, color: '#10b981' },
    { label: 'Announcements', value: 8, icon: Bell, color: '#06b6d4' },
  ];

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4">
          <Avatar name={user?.name || 'F'} size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Welcome, <span className="gradient-text">{user?.name?.split(' ').slice(0,2).join(' ')}</span>
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">{user?.department} • {user?.employeeId}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}20` }}>
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Class performance */}
        <Card>
          <CardHeader><CardTitle>Student Performance</CardTitle><Badge variant="indigo">CS Dept</Badge></CardHeader>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAcademicPerformance} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Bar dataKey="avg" fill="#6366f1" radius={[4,4,0,0]} name="Class Avg" />
              <Bar dataKey="highest" fill="#10b981" radius={[4,4,0,0]} name="Highest" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent students */}
        <Card>
          <CardHeader><CardTitle>Student Attendance</CardTitle><a href="/faculty/attendance" className="text-xs text-indigo-400">Manage →</a></CardHeader>
          <div className="space-y-3">
            {myStudents.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <Avatar name={s.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--text-primary)] truncate">{s.name}</p>
                  <ProgressBar value={s.attendance} max={100} size="sm" className="mt-1" />
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: s.attendance >= 75 ? '#10b981' : '#ef4444' }}>{s.attendance}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent submissions */}
      <Card>
        <CardHeader><CardTitle>Recent Assignment Submissions</CardTitle><a href="/faculty/assignments" className="text-xs text-indigo-400">Grade all →</a></CardHeader>
        <div className="space-y-3">
          {mockAssignments.filter(a => a.status === 'submitted' || a.status === 'graded').map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                <ClipboardList size={14} className="text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{a.title}</p>
                <p className="text-xs text-[var(--text-muted)]">{a.subjectCode} • Submitted</p>
              </div>
              <Badge variant={a.status === 'graded' ? 'success' : 'warning'} dot>{a.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
