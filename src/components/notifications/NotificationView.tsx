import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Tag,
  CreditCard,
  Package,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { NotificationItem } from '../../types';

export const NotificationView: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    setIsTrackingOpen,
    setCurrentView
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'order' | 'promo' | 'payment'>('all');

  const filteredNotifs = notifications.filter(
    (n) => activeFilter === 'all' || n.category === activeFilter
  );

  const handleNotifClick = (notif: NotificationItem) => {
    markNotificationAsRead(notif.id);
    if (notif.orderId) {
      setIsTrackingOpen(true);
    } else if (notif.category === 'promo' || notif.category === 'voucher') {
      setCurrentView('food');
    } else if (notif.category === 'payment') {
      setCurrentView('wallet');
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'order':
        return <Package className="w-4 h-4 text-emerald-600" />;
      case 'voucher':
      case 'promo':
        return <Tag className="w-4 h-4 text-orange-500" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-4 pb-24 text-xs">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-600" />
          <span>Pusat Notifikasi & Promo</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Update pesanan realtime, promo diskon gajian, dan informasi saldo
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'Semua Notifikasi' },
          { id: 'order', label: 'Status Pesanan' },
          { id: 'promo', label: 'Promo & Voucher' },
          { id: 'payment', label: 'MitraPay & Saldo' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-16 text-stone-400 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-30 text-emerald-600" />
            <p className="font-bold text-stone-700 dark:text-stone-300">
              Belum ada notifikasi baru
            </p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotifClick(notif)}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                !notif.isRead
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-white dark:bg-stone-800 border-stone-200/80 dark:border-stone-700'
              }`}
            >
              <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-700/80 shrink-0">
                {getIcon(notif.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-stone-900 dark:text-stone-100 line-clamp-1">
                    {notif.title}
                  </h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  )}
                </div>
                <p className="text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                  {notif.message}
                </p>
                <span className="text-[10px] text-stone-400 mt-1 block">
                  {notif.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
