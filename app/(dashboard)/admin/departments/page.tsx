'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockDepartments } from '@/data/mock';
import { Building2, Users, GraduationCap, Calendar, Plus } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminDepartmentsPage() {
  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Department Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Overview of all college departments</p>
        </div>
        <Button icon={<Plus size={16} />}>Add Department</Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDepartments.map((dept, i) => {
          const color = COLORS[i % COLORS.length];
          return (
            <motion.div key={dept.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card hover className="relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10" style={{ background: color }} />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white" style={{ background: color }}>
                    {dept.code.slice(0, 2)}
                  </div>
                  <Badge variant="success" dot size="sm">Active</Badge>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{dept.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-1">HOD: {dept.hodName}</p>
                <p className="text-xs text-[var(--text-muted)] mb-4">Est. {dept.established}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-white/5 text-center">
                    <p className="text-lg font-bold" style={{ color }}>{dept.studentCount}</p>
                    <p className="text-xs text-[var(--text-muted)]">Students</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 text-center">
                    <p className="text-lg font-bold" style={{ color }}>{dept.facultyCount}</p>
                    <p className="text-xs text-[var(--text-muted)]">Faculty</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
