'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import Button from '@/components/ui/Button';
import { Layers, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('student');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match!'); return; }
    setLoading(true);
    await login(form.email, form.password, role);
    toast.success('Account created! Welcome to EduSphere 🎉');
    router.push(`/${role}`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Layers size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">EduSphere</span>
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Create your account</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Join thousands of students and faculty on EduSphere</p>

        <div className="flex items-center gap-2 glass rounded-xl p-1 mb-6">
          {(['student', 'faculty'] as UserRole[]).map(r => (
            <button key={r} onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${role === r ? 'bg-indigo-600 text-white' : 'text-[var(--text-secondary)]'}`}>
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Full Name</label><input placeholder="Aarav Sharma" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
          <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">College Email</label><input type="email" placeholder="you@edusphere.edu" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
          <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Password</label><input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required /></div>
          <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Confirm Password</label><input type="password" placeholder="••••••••" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required /></div>
          <label className="flex items-start gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded flex-shrink-0" required />
            I agree to the <span className="text-indigo-400">Terms of Service</span> and <span className="text-indigo-400">Privacy Policy</span>
          </label>
          <Button type="submit" loading={loading} className="w-full" icon={<ArrowRight size={16} />}>Create Account</Button>
        </form>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in →</Link>
        </p>
      </motion.div>
    </div>
  );
}
