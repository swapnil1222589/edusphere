'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import Button from '@/components/ui/Button';
import { Layers, GraduationCap, BookOpen, Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const roles: { id: UserRole; label: string; icon: React.ElementType; color: string; gradient: string; desc: string }[] = [
  { id: 'student', label: 'Student', icon: GraduationCap, color: '#6366f1', gradient: 'from-indigo-500 to-purple-600', desc: 'Access courses, attendance & more' },
  { id: 'faculty', label: 'Faculty', icon: BookOpen, color: '#06b6d4', gradient: 'from-cyan-500 to-blue-600', desc: 'Manage classes & students' },
  { id: 'admin', label: 'Admin', icon: Shield, color: '#10b981', gradient: 'from-emerald-500 to-teal-600', desc: 'Full platform administration' },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('student@edusphere.edu');
  const [password, setPassword] = useState('password123');
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      toast.success(`Welcome back! Logging in as ${role}...`);
      router.push(`/${role}`);
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };

  const demoCredentials: Record<UserRole, string> = {
    student: 'student@edusphere.edu',
    faculty: 'faculty@edusphere.edu',
    admin: 'admin@edusphere.edu',
  };

  const handleRoleChange = (r: UserRole) => {
    setRole(r);
    setEmail(demoCredentials[r]);
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Layers size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduSphere</span>
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
            Your campus,<br /><span className="gradient-text">supercharged.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-sm">
            Everything you need for college life — attendance, assignments, placement, events, and more — in one beautiful platform.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            {['50K+ Students', '200+ Colleges', '99.9% Uptime', '500+ Features'].map(s => (
              <div key={s} className="flex items-center gap-2 glass px-3 py-2 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-sm text-[var(--text-secondary)]">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-xs text-[var(--text-muted)]">© 2025 EduSphere Technologies</div>
      </div>

      {/* Right panel – login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Layers size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">EduSphere</span>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Sign in to your EduSphere account</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(r => {
              const Icon = r.icon;
              return (
                <button key={r.id} onClick={() => handleRoleChange(r.id)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${role === r.id ? `bg-gradient-to-br ${r.gradient} bg-opacity-20 border-opacity-50` : 'glass border-[var(--border)] hover:border-[var(--border-strong)]'}`}
                  style={{ borderColor: role === r.id ? r.color + '50' : undefined, background: role === r.id ? r.color + '15' : undefined }}>
                  <Icon size={18} className="mx-auto mb-1" style={{ color: role === r.id ? r.color : 'var(--text-muted)' }} />
                  <p className="text-xs font-semibold" style={{ color: role === r.id ? r.color : 'var(--text-secondary)' }}>{r.label}</p>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@edusphere.edu" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
            </div>
            <Button type="submit" loading={isLoading} className="w-full" icon={<ArrowRight size={16} />}>
              Sign In
            </Button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/15">
            <p className="text-xs font-semibold text-indigo-400 mb-1">Demo Credentials</p>
            <p className="text-xs text-[var(--text-muted)]">Email: {demoCredentials[role]} • Password: any</p>
          </div>

          <p className="text-center text-xs text-[var(--text-muted)] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Create one →</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
