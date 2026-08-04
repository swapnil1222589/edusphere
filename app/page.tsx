'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Layers, ArrowRight, CalendarCheck, ClipboardList, BookOpen, Briefcase,
  Users, Bell, BarChart3, ShoppingBag, Search, Ticket, Star, ChevronDown,
  CheckCircle, Zap, Shield, Globe, Award, TrendingUp
} from 'lucide-react';

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-white/4 transition-colors">
        <span className="text-sm font-semibold text-[var(--text-primary)]">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-[var(--text-muted)] flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-6 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const features = [
  { icon: CalendarCheck, label: 'Smart Attendance', desc: 'QR code scanning, real-time tracking, and instant low-attendance alerts', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
  { icon: ClipboardList, label: 'Assignments', desc: 'Submit assignments, track deadlines, and get instant feedback from faculty', color: '#06b6d4', gradient: 'from-cyan-500 to-blue-600' },
  { icon: Briefcase, label: 'Placement Portal', desc: 'Apply to top companies, track applications, and ace placement drives', color: '#10b981', gradient: 'from-emerald-500 to-teal-600' },
  { icon: BookOpen, label: 'Notes Repository', desc: 'Download subject notes, filter by topic, and save favorites for later', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600' },
  { icon: Ticket, label: 'Campus Events', desc: 'Hackathons, workshops, cultural fests — register in one click', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600' },
  { icon: ShoppingBag, label: 'Marketplace', desc: 'Buy, sell, and exchange books, electronics, and hostel essentials', color: '#ef4444', gradient: 'from-rose-500 to-pink-600' },
  { icon: Users, label: 'Clubs & Communities', desc: 'Join coding clubs, sports teams, and cultural groups all in one place', color: '#06b6d4', gradient: 'from-sky-500 to-indigo-600' },
  { icon: BarChart3, label: 'Analytics', desc: 'Visualize academic performance, attendance trends, and placement statistics', color: '#f59e0b', gradient: 'from-yellow-500 to-amber-600' },
];

const testimonials = [
  { name: 'Priya Nair', role: 'Final Year CSE Student', quote: "EduSphere completely changed how I manage my academics. The placement portal helped me track my applications and got me my dream job at Google!", rating: 5 },
  { name: 'Dr. Anjali Sharma', role: 'Professor, Computer Science', quote: "Managing attendance, grading, and student analytics used to take hours. Now it takes minutes. EduSphere is a game-changer for faculty.", rating: 5 },
  { name: 'Rohan Gupta', role: 'Third Year EC Student', quote: "The timetable and assignment modules are incredibly smooth. I never miss a deadline now. The dark mode is chef's kiss too!", rating: 5 },
  { name: 'Prof. Ravi Kumar', role: 'HOD, CS Department', quote: "The admin analytics dashboard gives us real-time insights we never had before. Department management has never been this effortless.", rating: 5 },
];

const faqs = [
  { q: 'How does attendance tracking work?', a: 'Students can mark attendance via QR code scanning in class, or faculty can manually mark attendance from their dashboard. The system automatically calculates attendance percentages and alerts students when they fall below 75%.' },
  { q: 'Is EduSphere free for students?', a: 'EduSphere is free for students to use. Colleges pay a subscription fee to access the platform. Contact us for institutional pricing.' },
  { q: 'Can faculty upload multiple files for notes?', a: 'Yes! Faculty can upload PDFs, presentations, and other documents. Students can download, favorite, and search through all uploaded materials with powerful filters.' },
  { q: 'How does the placement portal work?', a: "Companies register drives on the platform. Eligible students (based on CGPA and semester) can apply directly. They receive real-time updates on shortlisting, interview schedules, and offer status." },
  { q: 'Is there a mobile app?', a: 'EduSphere is fully responsive and works beautifully on all devices. A dedicated React Native mobile app is currently in development and will be available soon.' },
  { q: 'How secure is student data?', a: 'We use enterprise-grade security with Supabase (PostgreSQL with Row Level Security), end-to-end encryption for sensitive data, and comply with all educational data privacy regulations.' },
];

export default function LandingPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-white/6 backdrop-blur-xl bg-black/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <span className="text-base font-bold gradient-text">EduSphere</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['Features', 'For Students', 'For Faculty', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 hidden sm:block transition-colors">Sign In</Link>
          <Link href="/register" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-xl transition-all">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-6 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-600/5 blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/25 text-xs font-medium text-indigo-400 mb-6">
            <Zap size={12} fill="currentColor" />
            Trusted by 50,000+ students across India
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] leading-tight mb-6 max-w-5xl mx-auto">
            The <span className="gradient-text">Operating System</span><br />for Modern Colleges
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            EduSphere unifies attendance, assignments, placement, events, clubs, and campus life into one beautiful, intelligent platform for students, faculty, and administrators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all">
              View Demo →
            </Link>
          </div>
        </motion.div>

        {/* Hero screenshot mock */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 pointer-events-none" style={{ top: '60%' }} />
          <div className="glass rounded-3xl border border-white/10 p-2 shadow-2xl shadow-indigo-500/10">
            <div className="glass-strong rounded-2xl p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/20 min-h-64 flex items-center justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
                {[
                  { label: 'Attendance', val: '88%', color: '#10b981', icon: '📊' },
                  { label: 'Assignments', val: '4 Due', color: '#f59e0b', icon: '📝' },
                  { label: 'Placement', val: 'Shortlisted', color: '#6366f1', icon: '💼' },
                  { label: 'Events', val: '3 Upcoming', color: '#06b6d4', icon: '🎫' },
                ].map(s => (
                  <div key={s.label} className="glass rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{s.icon}</div>
                    <p className="text-sm font-bold" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-[var(--border)]" id="stats">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Students', value: 50000, suffix: '+' },
            { label: 'Partner Colleges', value: 200, suffix: '+' },
            { label: 'Features Shipped', value: 500, suffix: '+' },
            { label: 'Uptime Guarantee', value: 99, suffix: '.9%' },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-3xl md:text-4xl font-extrabold gradient-text">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">Everything in one place</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Features built for <span className="gradient-text">campus life</span></h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto">From the first class of the day to the final placement offer — EduSphere has every moment covered.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="glass glass-hover rounded-2xl p-5 h-full">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{f.label}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Students / Faculty tabs */}
      <section className="py-20 px-6 border-y border-[var(--border)]" id="for-students">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 glass rounded-2xl p-1.5 w-fit mx-auto mb-12">
            {['For Students', 'For Faculty', 'For Admin'].map((t, i) => (
              <button key={t} onClick={() => setTab(i)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${tab === i ? 'bg-indigo-600 text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{t}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {tab === 0 && (
              <motion.div key="student" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Everything a student needs, <span className="gradient-text">beautifully organized</span></h2>
                  <div className="space-y-3">
                    {['Track attendance across all subjects with detailed analytics', 'Never miss assignment deadlines with smart reminders', 'Apply to placement drives from top companies instantly', 'Download notes, favorite materials, and collaborate with peers', 'Join clubs, register for events, and get certificates'].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/register" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all">
                    Join as Student <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="glass rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Student Dashboard Preview</p>
                  {[{ label: 'Overall Attendance', val: '88%', color: '#10b981' }, { label: 'Pending Assignments', val: '4', color: '#f59e0b' }, { label: 'Placement Applied', val: '3', color: '#6366f1' }].map(s => (
                    <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="text-sm text-[var(--text-secondary)]">{s.label}</span>
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {tab === 1 && (
              <motion.div key="faculty" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Tools that <span className="gradient-text">empower educators</span></h2>
                  <div className="space-y-3">
                    {['Mark attendance with one click for entire classes', 'Upload and manage notes and study materials with ease', 'Create assignments and grade submissions with feedback', 'View real-time student analytics and performance insights', 'Post announcements and communicate with students instantly'].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/register" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-all">
                    Join as Faculty <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="glass rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Faculty Tools Preview</p>
                  {[{ label: 'Students Teaching', val: '142', color: '#06b6d4' }, { label: 'Notes Uploaded', val: '24', color: '#10b981' }, { label: 'Pending Grading', val: '8', color: '#f59e0b' }].map(s => (
                    <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="text-sm text-[var(--text-secondary)]">{s.label}</span>
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {tab === 2 && (
              <motion.div key="admin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Full institutional <span className="gradient-text">command center</span></h2>
                  <div className="space-y-3">
                    {['Manage students, faculty, and departments from one dashboard', 'Generate detailed reports and analytics for accreditation', 'Oversee timetables across all departments simultaneously', 'Monitor placement statistics and drive successful outcomes', 'Configure event management and campus resource allocation'].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/login" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-all">
                    View Admin Demo <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="glass rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Admin Analytics Preview</p>
                  {[{ label: 'Total Students', val: '3,940', color: '#6366f1' }, { label: 'Placement Rate', val: '89%', color: '#10b981' }, { label: 'Departments', val: '6', color: '#f59e0b' }].map(s => (
                    <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="text-sm text-[var(--text-secondary)]">{s.label}</span>
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Loved by students & faculty</h2>
            <p className="text-[var(--text-secondary)]">Here's what our users are saying about EduSphere</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="glass glass-hover rounded-2xl p-5 h-full flex flex-col">
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-current" />)}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">{t.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Frequently asked questions</h2>
            <p className="text-[var(--text-secondary)]">Can't find the answer? <a href="mailto:hello@edusphere.edu" className="text-indigo-400 hover:text-indigo-300">Contact us</a></p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <FaqItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 relative overflow-hidden border border-indigo-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
              <Layers size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
              Ready to transform your college experience?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              Join 50,000+ students and 200+ colleges already using EduSphere to make campus life smarter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25">
                Get Started for Free <ArrowRight size={16} />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all">
                Try the Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Layers size={14} className="text-white" />
                </div>
                <span className="font-bold gradient-text">EduSphere</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-48">The modern college management platform built for the digital age.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Support', links: ['Documentation', 'API Reference', 'Status', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-[var(--text-primary)] mb-3">{col.title}</p>
                <div className="space-y-2">
                  {col.links.map(l => <a key={l} href="#" className="block text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--text-muted)]">© 2025 EduSphere Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
