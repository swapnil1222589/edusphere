'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { mockAttendanceSummary, mockAttendanceMonthly, mockAttendanceCalendar } from '@/data/mock';
import { getAttendanceColor, getAttendanceBg } from '@/lib/utils';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadialBarChart, RadialBar, Legend } from 'recharts';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AttendancePage() {
  const overall = Math.round(mockAttendanceSummary.reduce((s, a) => s + a.percentage, 0) / mockAttendanceSummary.length);
  const lowSubjects = mockAttendanceSummary.filter(s => s.percentage < 75);

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Attendance</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Track your attendance across all subjects</p>
      </motion.div>

      {/* Alert */}
      {lowSubjects.length > 0 && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/25">
            <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-400">Low Attendance Warning</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {lowSubjects.map(s => s.subjectCode).join(', ')} — below 75% minimum requirement.
                You need to attend more classes to meet the requirement.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Overall donut */}
        <Card>
          <CardHeader><CardTitle>Overall Attendance</CardTitle></CardHeader>
          <div className="flex flex-col items-center py-4">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={overall >= 75 ? '#10b981' : overall >= 65 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(overall / 100) * 314} 314`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[var(--text-primary)]">{overall}%</span>
                <span className="text-xs text-[var(--text-muted)]">Overall</span>
              </div>
            </div>
            <Badge variant={overall >= 75 ? 'success' : 'danger'} dot className="mt-4">
              {overall >= 75 ? 'Good Standing' : 'Below Minimum'}
            </Badge>
            <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
              Minimum required: 75% per subject
            </p>
          </div>
        </Card>

        {/* Monthly trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <Badge variant="indigo">2025</Badge>
          </CardHeader>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={mockAttendanceMonthly} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Subject-wise */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <Badge variant="default">{mockAttendanceSummary.length} subjects</Badge>
        </CardHeader>
        <div className="space-y-4">
          {mockAttendanceSummary.map(s => (
            <div key={s.subjectId} className={`p-4 rounded-xl border ${getAttendanceBg(s.percentage)}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{s.subjectName}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.subjectCode} • {s.attended}/{s.totalClasses} classes attended</p>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${getAttendanceColor(s.percentage)}`}>{s.percentage}%</p>
                  {s.percentage < 75 && (
                    <p className="text-xs text-red-400 mt-0.5">
                      Need {Math.ceil((0.75 * s.totalClasses - s.attended) / 0.25)} more
                    </p>
                  )}
                </div>
              </div>
              <ProgressBar value={s.attended} max={s.totalClasses} color={s.color} size="md" />
            </div>
          ))}
        </div>
      </Card>

      {/* Attendance Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Calendar – July 2025</CardTitle>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/40 inline-block" />Present</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/40 inline-block" />Absent</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500/40 inline-block" />Late</span>
          </div>
        </CardHeader>
        <div className="grid grid-cols-7 gap-2">
          {days.map(d => <div key={d} className="text-center text-xs font-medium text-[var(--text-muted)] py-1">{d}</div>)}
          {/* offset for July starting on Tuesday */}
          {[0, 1].map(i => <div key={`off-${i}`} />)}
          {mockAttendanceCalendar.map((day, i) => {
            const d = new Date(day.date).getDate();
            const bgMap = { present: 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30', absent: 'bg-red-500/25 text-red-400 border-red-500/30', late: 'bg-amber-500/25 text-amber-400 border-amber-500/30', holiday: 'bg-white/5 text-[var(--text-muted)] border-[var(--border)]' };
            return (
              <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium border ${bgMap[day.status]}`}>
                {d}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
