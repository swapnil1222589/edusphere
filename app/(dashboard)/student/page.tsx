'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import Avatar from '@/components/ui/Avatar';
import {
  mockAttendanceSummary, mockAssignments, mockNotifications,
  mockPlacementDrives, mockEvents, mockAttendanceMonthly, mockAcademicPerformance
} from '@/data/mock';
import { formatDate, getDaysUntil, getAttendanceColor } from '@/lib/utils';
import { CalendarCheck, ClipboardList, Briefcase, Bell, TrendingUp, Award, BookOpen, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const fadeIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

export default function StudentDashboard() {
  const { user } = useAuth();
  const overallAttendance = Math.round(
    mockAttendanceSummary.reduce((s, a) => s + a.percentage, 0) / mockAttendanceSummary.length
  );
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').length;
  const unreadNotifs = mockNotifications.filter(n => !n.isRead).length;
  const upcoming = mockEvents.filter(e => new Date(e.startDate) > new Date()).slice(0, 3);
  const recentAssignments = mockAssignments.slice(0, 4);
  const todaySlots = ['09:00 – 10:00 • Data Structures • A-201', '10:00 – 11:00 • Computer Networks • B-102', '11:30 – 12:30 • DBMS • C-305'];

  const stats = [
    { label: 'Overall Attendance', value: `${overallAttendance}%`, icon: CalendarCheck, color: overallAttendance >= 75 ? '#10b981' : '#ef4444', sub: overallAttendance >= 75 ? 'Good standing' : 'Below minimum', variant: overallAttendance >= 75 ? 'success' as const : 'danger' as const },
    { label: 'Pending Assignments', value: pendingAssignments, icon: ClipboardList, color: '#f59e0b', sub: 'Due this week', variant: 'warning' as const },
    { label: 'Placement Applied', value: mockPlacementDrives.filter(d => d.isApplied).length, icon: Briefcase, color: '#6366f1', sub: '1 shortlisted', variant: 'indigo' as const },
    { label: 'Notifications', value: unreadNotifs, icon: Bell, color: '#06b6d4', sub: `${unreadNotifs} unread`, variant: 'info' as const },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <motion.div variants={fadeIn} initial="hidden" animate="show" className="mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={user?.name || 'A'} size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Good morning, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {user?.department} • Semester {user?.semester} • {user?.rollNumber}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} variants={fadeIn}>
              <Card hover className="relative overflow-hidden">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <Badge variant={s.variant} size="sm">{s.sub}</Badge>
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)]" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{s.label}</p>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-5" style={{ background: s.color }} />
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Attendance Chart */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <Badge variant="success" dot>7-month view</Badge>
            </CardHeader>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={mockAttendanceMonthly} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Today's Classes */}
        <motion.div variants={fadeIn} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Classes</CardTitle>
              <Badge variant="indigo">{todaySlots.length}</Badge>
            </CardHeader>
            <div className="space-y-3">
              {todaySlots.map((slot, i) => {
                const [time, ...rest] = slot.split('•');
                const [subj, room] = rest.join('•').split('•');
                return (
                  <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white/4 hover:bg-white/7 transition-colors">
                    <div className="w-1 h-10 rounded-full bg-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">{subj?.trim()}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{time?.trim()}</p>
                      <p className="text-xs text-[var(--text-muted)]">Room {room?.trim()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Subject Attendance */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
              <a href="/student/attendance" className="text-xs text-indigo-400 hover:text-indigo-300">View all →</a>
            </CardHeader>
            <div className="space-y-4">
              {mockAttendanceSummary.map(s => (
                <div key={s.subjectId}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-xs font-medium text-[var(--text-primary)]">{s.subjectCode}</span>
                      <span className="text-xs text-[var(--text-muted)] hidden sm:block truncate max-w-32">{s.subjectName}</span>
                    </div>
                    <span className={`text-xs font-bold ${getAttendanceColor(s.percentage)}`}>{s.percentage}%</span>
                  </div>
                  <ProgressBar value={s.attended} max={s.totalClasses} color={s.color} size="sm" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={fadeIn} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <a href="/student/events" className="text-xs text-indigo-400 hover:text-indigo-300">All →</a>
            </CardHeader>
            <div className="space-y-3">
              {upcoming.map(e => {
                const days = getDaysUntil(e.startDate);
                return (
                  <div key={e.id} className="p-3 rounded-xl bg-white/4 hover:bg-white/7 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{e.title}</p>
                      <Badge variant={days <= 3 ? 'danger' : 'indigo'} size="sm">{days}d</Badge>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{e.organizer}</p>
                    <p className="text-xs text-[var(--text-muted)]">{formatDate(e.startDate)}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Assignments */}
        <motion.div variants={fadeIn} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <a href="/student/assignments" className="text-xs text-indigo-400 hover:text-indigo-300">View all →</a>
            </CardHeader>
            <div className="space-y-3">
              {recentAssignments.map(a => {
                const days = getDaysUntil(a.dueDate);
                const statusMap = { pending: 'warning', submitted: 'info', graded: 'success', late: 'danger' } as const;
                return (
                  <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/4 hover:bg-white/7 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                      <ClipboardList size={15} className="text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{a.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">{a.subjectCode} • {a.status === 'pending' ? `Due in ${days}d` : formatDate(a.dueDate)}</p>
                    </div>
                    <Badge variant={statusMap[a.status]} size="sm" dot>{a.status}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Academic Performance Chart */}
        <motion.div variants={fadeIn} initial="hidden" animate="show">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <Badge variant="purple" size="sm">Avg marks</Badge>
            </CardHeader>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockAcademicPerformance} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
                <Bar dataKey="avg" fill="#6366f1" radius={[4, 4, 0, 0]} name="Your Avg" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
