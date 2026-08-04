'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { User, Lock, Bell, Eye, Palette, Save } from 'lucide-react';
import toast from 'react-hot-toast';

type Section = 'profile' | 'password' | 'notifications' | 'privacy' | 'appearance';

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [section, setSection] = useState<Section>('profile');
  const [isDark, setIsDark] = useState(true);
  const [notifPrefs, setNotifPrefs] = useState({ attendance: true, assignments: true, placement: true, events: true, announcements: false });

  const handleSave = () => toast.success('Settings saved!');

  return (
    <div className="page-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="md:w-56 flex-shrink-0">
          <Card padding="sm">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => setSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${section === s.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/25' : 'text-[var(--text-secondary)] hover:bg-white/6 hover:text-[var(--text-primary)]'}`}>
                  <Icon size={16} />
                  {s.label}
                </button>
              );
            })}
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {section === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--border)]">
                  <Avatar name={user?.name || 'U'} size="xl" />
                  <div>
                    <Button size="sm" variant="secondary">Change Photo</Button>
                    <p className="text-xs text-[var(--text-muted)] mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Full Name</label><input defaultValue={user?.name} /></div>
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Email</label><input defaultValue={user?.email} /></div>
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Phone</label><input defaultValue={user?.phone} /></div>
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Department</label><input defaultValue={user?.department} disabled className="opacity-50" /></div>
                  {user?.rollNumber && <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Roll Number</label><input defaultValue={user.rollNumber} disabled className="opacity-50" /></div>}
                  {user?.employeeId && <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Employee ID</label><input defaultValue={user.employeeId} disabled className="opacity-50" /></div>}
                </div>
                <Button className="mt-4" icon={<Save size={14} />} onClick={handleSave}>Save Changes</Button>
              </Card>
            </motion.div>
          )}

          {section === 'password' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
                <div className="space-y-4 max-w-sm">
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Current Password</label><input type="password" placeholder="••••••••" /></div>
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">New Password</label><input type="password" placeholder="••••••••" /></div>
                  <div><label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">Confirm New Password</label><input type="password" placeholder="••••••••" /></div>
                  <Button icon={<Lock size={14} />} onClick={handleSave}>Update Password</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {section === 'notifications' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                <div className="space-y-4">
                  {Object.entries(notifPrefs).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-white/4">
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{key}</p>
                        <p className="text-xs text-[var(--text-muted)]">Receive {key} notifications</p>
                      </div>
                      <button
                        onClick={() => setNotifPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                        className={`w-11 h-6 rounded-full transition-all cursor-pointer relative ${val ? 'bg-indigo-600' : 'bg-white/20'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${val ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                  <Button icon={<Save size={14} />} onClick={handleSave}>Save Preferences</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {section === 'appearance' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-[var(--text-secondary)]">Choose your preferred color theme</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Dark Mode', icon: '🌙', value: true },
                      { label: 'Light Mode', icon: '☀️', value: false },
                    ].map(t => (
                      <button key={t.label} onClick={() => { setIsDark(t.value); document.documentElement.classList.toggle('light', !t.value); localStorage.setItem('edusphere_theme', t.value ? 'dark' : 'light'); }}
                        className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${isDark === t.value ? 'border-indigo-500 bg-indigo-500/10' : 'border-[var(--border)] glass'}`}>
                        <div className="text-2xl mb-2">{t.icon}</div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{t.label}</p>
                        {isDark === t.value && <Badge variant="indigo" size="sm" className="mt-1">Active</Badge>}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {section === 'privacy' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader><CardTitle>Privacy Settings</CardTitle></CardHeader>
                <div className="space-y-4">
                  {[
                    { label: 'Show profile to other students', desc: 'Others can see your name and department' },
                    { label: 'Show attendance to faculty', desc: 'Faculty can view your attendance summary' },
                    { label: 'Allow marketplace contact', desc: 'Other students can contact you for marketplace listings' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/4">
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                        <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                      </div>
                      <button className="w-11 h-6 rounded-full bg-indigo-600 relative cursor-pointer">
                        <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-6" />
                      </button>
                    </div>
                  ))}
                  <Button icon={<Save size={14} />} onClick={handleSave}>Save Privacy Settings</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
