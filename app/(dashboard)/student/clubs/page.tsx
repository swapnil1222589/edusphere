'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { mockClubs } from '@/data/mock';
import { Users, Calendar, Award, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function ClubsPage() {
  const [clubs, setClubs] = useState(mockClubs);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(mockClubs.map(c => c.category))];
  const filtered = filter === 'all' ? clubs : clubs.filter(c => c.category === filter);

  const toggleJoin = (id: string) => {
    setClubs(prev => prev.map(c => {
      if (c.id !== id) return c;
      const joining = !c.isJoined;
      toast.success(joining ? `Joined ${c.name}!` : `Left ${c.name}`);
      return { ...c, isJoined: joining, memberCount: c.memberCount + (joining ? 1 : -1) };
    }));
  };

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Clubs & Communities</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Find your tribe and get involved in campus life</p>
      </motion.div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all cursor-pointer ${filter === c ? 'bg-indigo-600 text-white' : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Joined clubs banner */}
      {clubs.filter(c => c.isJoined).length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">Your Clubs</p>
          <div className="flex gap-3 flex-wrap">
            {clubs.filter(c => c.isJoined).map(c => (
              <div key={c.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${c.gradient} bg-opacity-20 border border-white/10`}>
                <span className="text-lg">{c.icon}</span>
                <span className="text-sm font-medium text-white">{c.name}</span>
                <Badge variant="default" size="sm">{c.memberCount} members</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Club grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((club, i) => (
          <motion.div key={club.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card hover className="flex flex-col h-full relative overflow-hidden">
              {/* Gradient bg blob */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${club.gradient} opacity-10`} />
              
              <div className="flex items-start gap-3 mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${club.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                  {club.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{club.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="default" size="sm">{club.category}</Badge>
                    {club.isJoined && <Badge variant="success" size="sm" dot>Member</Badge>}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] mb-4 flex-1 line-clamp-3 relative z-10">{club.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
                {[
                  { icon: Users, label: 'Members', val: club.memberCount },
                  { icon: Calendar, label: 'Events', val: club.events },
                  { icon: Award, label: 'Since', val: club.foundedYear },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center p-2 rounded-xl bg-white/5">
                    <Icon size={12} className="mx-auto mb-1 text-[var(--text-muted)]" />
                    <p className="text-sm font-bold text-[var(--text-primary)]">{val}</p>
                    <p className="text-xs text-[var(--text-muted)]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between relative z-10">
                <p className="text-xs text-[var(--text-muted)]">President: {club.president}</p>
                <Button
                  variant={club.isJoined ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={() => toggleJoin(club.id)}
                >
                  {club.isJoined ? 'Leave' : 'Join'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
