'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, CalendarCheck, Calendar, ClipboardList, BookOpen, Ticket,
  Briefcase, Search, ShoppingBag, Users, Bell, Settings, LogOut, ChevronLeft,
  GraduationCap, BarChart3, Building2, Clock, Award, FileText, Layers
} from 'lucide-react';

const studentNav = [
  { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { label: 'Attendance', href: '/student/attendance', icon: CalendarCheck },
  { label: 'Timetable', href: '/student/timetable', icon: Clock },
  { label: 'Assignments', href: '/student/assignments', icon: ClipboardList },
  { label: 'Notes', href: '/student/notes', icon: BookOpen },
  { label: 'Events', href: '/student/events', icon: Ticket },
  { label: 'Placement', href: '/student/placement', icon: Briefcase },
  { label: 'Lost & Found', href: '/student/lost-found', icon: Search },
  { label: 'Marketplace', href: '/student/marketplace', icon: ShoppingBag },
  { label: 'Clubs', href: '/student/clubs', icon: Users },
];

const facultyNav = [
  { label: 'Dashboard', href: '/faculty', icon: LayoutDashboard },
  { label: 'Attendance', href: '/faculty/attendance', icon: CalendarCheck },
  { label: 'Notes', href: '/faculty/notes', icon: BookOpen },
  { label: 'Assignments', href: '/faculty/assignments', icon: ClipboardList },
  { label: 'Analytics', href: '/faculty/analytics', icon: BarChart3 },
];

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Students', href: '/admin/students', icon: GraduationCap },
  { label: 'Faculty', href: '/admin/faculty', icon: Users },
  { label: 'Departments', href: '/admin/departments', icon: Building2 },
  { label: 'Timetable', href: '/admin/timetable', icon: Calendar },
  { label: 'Events', href: '/admin/events', icon: Ticket },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
];

const bottomNav = [
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = user?.role === 'student' ? studentNav : user?.role === 'faculty' ? facultyNav : adminNav;
  const roleColors = { student: 'from-indigo-500 to-purple-600', faculty: 'from-cyan-500 to-blue-600', admin: 'from-emerald-500 to-teal-600' };
  const roleColor = roleColors[user?.role || 'student'];

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <aside className={cn('sidebar flex flex-col', collapsed && 'collapsed', mobileOpen && 'mobile-open')}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)]">
          <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0', roleColor)}>
            <Layers size={18} className="text-white" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden">
              <span className="text-base font-bold gradient-text">EduSphere</span>
            </motion.div>
          )}
          <button
            onClick={onToggle}
            className="ml-auto hidden md:flex p-1 rounded-lg hover:bg-white/8 text-[var(--text-muted)] transition-colors cursor-pointer"
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={16} />
            </motion.div>
          </button>
        </div>

        {/* Role badge */}
        {!collapsed && user && (
          <div className="px-4 py-3">
            <span className={cn('text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-gradient-to-r text-white', roleColor)}>
              {user.role}
            </span>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' + user?.role && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href} href={item.href}
                onClick={onMobileClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/25'
                    : 'text-[var(--text-secondary)] hover:bg-white/6 hover:text-[var(--text-primary)]',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-indigo-600/15 border border-indigo-500/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon size={18} className="flex-shrink-0 relative z-10" />
                {!collapsed && (
                  <span className="text-sm font-medium relative z-10 whitespace-nowrap">{item.label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text-primary)] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="px-3 py-2 border-t border-[var(--border)] space-y-0.5">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href} href={item.href}
                onClick={onMobileClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive ? 'text-indigo-400 bg-indigo-600/15' : 'text-[var(--text-secondary)] hover:bg-white/6 hover:text-[var(--text-primary)]'
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
