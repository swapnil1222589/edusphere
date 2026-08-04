'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { mockStudents, mockFaculty, mockDepartments, mockStudentGrowth, mockPlacementStats, mockAcademicPerformance, mockEventParticipation } from '@/data/mock';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Users, Building2, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const totalStudents = mockDepartments.reduce((s, d) => s + d.studentCount, 0);
  const totalFaculty = mockDepartments.reduce((s, d) => s + d.facultyCount, 0);

  const stats = [
    { label: 'Total Students', value: totalStudents.toLocaleString(), icon: GraduationCap, color: '#6366f1', sub: '+12% from last year' },
    { label: 'Total Faculty', value: totalFaculty, icon: Users, color: '#06b6d4', sub: `${mockFaculty.length} active` },
    { label: 'Departments', value: mockDepartments.length, icon: Building2, color: '#10b981', sub: '6 active departments' },
    { label: 'Placement Rate', value: '89%', icon: Award, color: '#f59e0b', sub: '312 placed this year' },
  ];

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4">
          <Avatar name={user?.name || 'A'} size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Admin Dashboard, <span className="gradient-text">{user?.name?.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">EduSphere College Administration Portal</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs font-medium text-[var(--text-primary)] mt-1">{s.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.sub}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Student Growth</CardTitle><Badge variant="success">2019–2025</Badge></CardHeader>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockStudentGrowth} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} name="Students" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Placement Statistics</CardTitle><Badge variant="indigo">Yearly</Badge></CardHeader>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockPlacementStats} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Bar dataKey="placed" fill="#6366f1" radius={[4,4,0,0]} name="Placed" />
              <Bar dataKey="offers" fill="#10b981" radius={[4,4,0,0]} name="Offers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Event Participation</CardTitle></CardHeader>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mockEventParticipation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                {mockEventParticipation.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Legend formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader><CardTitle>Department Overview</CardTitle><a href="/admin/departments" className="text-xs text-indigo-400">Manage →</a></CardHeader>
          <div className="space-y-3">
            {mockDepartments.map(d => (
              <div key={d.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                  <Building2 size={14} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{d.code} – {d.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{d.studentCount} students • {d.facultyCount} faculty</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
