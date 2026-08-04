'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import { mockMarketplace } from '@/data/mock';
import { MarketplaceItem } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { ShoppingBag, Plus, Search, Phone, RefreshCw, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const categoryConfig: Record<string, { label: string; variant: 'indigo' | 'success' | 'warning' | 'purple' | 'info' | 'default' }> = {
  books: { label: 'Books', variant: 'indigo' },
  electronics: { label: 'Electronics', variant: 'info' },
  furniture: { label: 'Furniture', variant: 'warning' },
  clothing: { label: 'Clothing', variant: 'purple' },
  hostel: { label: 'Hostel', variant: 'success' },
  other: { label: 'Other', variant: 'default' },
};

const conditionVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = { 'new': 'success', 'like-new': 'info', 'good': 'warning', 'fair': 'danger' };

export default function MarketplacePage() {
  const [items] = useState(mockMarketplace);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MarketplaceItem | null>(null);

  const filtered = items.filter(i => {
    const matchFilter = filter === 'all' || i.category === filter;
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch && i.isAvailable;
  });

  return (
    <div className="page-wrapper space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Campus Marketplace</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Buy, sell & exchange with fellow students</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => toast.success('Listing form coming soon!')}>Sell an Item</Button>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 glass px-3 py-2.5 rounded-xl">
          <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
          <input type="text" placeholder="Search items…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full p-0 shadow-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="glass text-sm rounded-xl px-3 py-2 w-auto cursor-pointer">
          <option value="all">All Categories</option>
          {Object.entries(categoryConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<ShoppingBag />} title="No items found" description="Try adjusting your search or category filter." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className="cursor-pointer flex flex-col h-full" onClick={() => setSelected(item)}>
                <div className="h-32 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mb-4 text-4xl border border-[var(--border)]">
                  {item.category === 'books' ? '📚' : item.category === 'electronics' ? '💻' : item.category === 'furniture' ? '🪑' : item.category === 'hostel' ? '🍶' : '📦'}
                </div>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={categoryConfig[item.category].variant} size="sm">{categoryConfig[item.category].label}</Badge>
                  {item.type === 'exchange' ? (
                    <Badge variant="purple" size="sm"><RefreshCw size={9} className="mr-0.5" />Exchange</Badge>
                  ) : (
                    <Badge variant="success" size="sm">For Sale</Badge>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 flex-1">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div>
                    <p className="text-lg font-bold text-indigo-400">{formatCurrency(item.price)}{item.isNegotiable && <span className="text-xs text-[var(--text-muted)] ml-1">nego.</span>}</p>
                    <p className="text-xs text-[var(--text-muted)]">{item.sellerName}</p>
                  </div>
                  <Badge variant={conditionVariant[item.condition]} size="sm">{item.condition}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="h-40 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-6xl border border-[var(--border)]">
              {selected.category === 'books' ? '📚' : selected.category === 'electronics' ? '💻' : selected.category === 'furniture' ? '🪑' : '📦'}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant={categoryConfig[selected.category].variant}>{categoryConfig[selected.category].label}</Badge>
              <Badge variant={conditionVariant[selected.condition]}>{selected.condition}</Badge>
              <Badge variant={selected.type === 'exchange' ? 'purple' : 'success'}>{selected.type === 'exchange' ? 'Exchange' : 'For Sale'}</Badge>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-[var(--text-muted)]">Price</p>
                <p className="text-lg font-bold text-indigo-400">{formatCurrency(selected.price)}</p>
                {selected.isNegotiable && <p className="text-xs text-[var(--text-muted)]">Negotiable</p>}
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-xs text-[var(--text-muted)]">Seller</p>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{selected.sellerName}</p>
                <p className="text-xs text-[var(--text-muted)]">Posted {formatDate(selected.postedAt)}</p>
              </div>
            </div>
            <Button className="w-full" icon={<Phone size={14} />} onClick={() => toast.success(`Contact: ${selected.sellerContact}`)}>
              Contact Seller
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
