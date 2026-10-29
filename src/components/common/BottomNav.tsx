import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navigation, Wallet, Clock, User, Bell } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    driverActiveOrder,
    driverIncomingOrder,
    unreadNotifCount
  } = useApp();

  const navItems = [
    {
      id: 'cockpit',
      label: 'Orderan',
      icon: Navigation,
      badge: driverIncomingOrder ? 'BARU' : driverActiveOrder ? '1' : undefined,
      badgeColor: driverIncomingOrder ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'
    },
    {
      id: 'wallet',
      label: 'Dompet 90%',
      icon: Wallet
    },
    {
      id: 'history',
      label: 'Riwayat Trip',
      icon: Clock
    },
    {
      id: 'notifications',
      label: 'Notifikasi',
      icon: Bell,
      badge: unreadNotifCount > 0 ? String(unreadNotifCount) : undefined,
      badgeColor: 'bg-rose-500'
    },
    {
      id: 'profile',
      label: 'Profil Mitra',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 transition-colors shrink-0 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (item.id === 'cockpit' && (currentView === 'driver' || currentView === 'orders' || currentView === 'home'));
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform duration-150 ${isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : ''}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 text-white text-[8px] font-black px-1 py-0.2 rounded-full flex items-center justify-center ring-1 ring-white dark:ring-stone-900 ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] mt-0.5 tracking-tight ${isActive ? 'font-black' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
