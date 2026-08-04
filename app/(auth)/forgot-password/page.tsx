'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
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

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Forgot your password?</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">Enter your college email and we'll send a reset link</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">College Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@edusphere.edu" />
              </div>
              <Button type="submit" loading={loading} className="w-full" icon={<Mail size={16} />}>Send Reset Link</Button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Check your inbox!</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">We sent a password reset link to <strong className="text-[var(--text-primary)]">{email}</strong></p>
            <Button variant="secondary" onClick={() => setSent(false)}>Try a different email</Button>
          </motion.div>
        )}

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Remember your password? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in →</Link>
        </p>
      </motion.div>
    </div>
  );
}
