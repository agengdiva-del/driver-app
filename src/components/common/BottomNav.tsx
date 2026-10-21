import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, ClipboardList, Wallet, MessageSquare, User, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, activeOrder, cartCount, setIsCartOpen, unreadNotifCount } = useApp();

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'orders', label: 'Pesanan', icon: ClipboardList, badge: activeOrder ? '1' : undefined, badgeColor: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
    { id: 'wallet', label: 'MitraPay', icon: Wallet },
    { id: 'notifications', label: 'Notifikasi', icon: MessageSquare, badge: unreadNotifCount > 0 ? String(unreadNotifCount) : undefined, badgeColor: 'bg-orange-500' },
    { id: 'account', label: 'Akun', icon: User }
  ];

  return (
    <>
      {/* Floating Cart Pill if Cart has items */}
      {cartCount > 0 && currentView !== 'cart' && currentView !== 'checkout' && (
        <div className="fixed bottom-18 left-0 right-0 z-40 max-w-md mx-auto px-4 pointer-events-none">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full pointer-events-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] border border-blue-400/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative p-1.5 bg-blue-800/80 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-blue-100 leading-none">Keranjang Belanja AWD</p>
                <p className="text-sm font-bold leading-tight">{cartCount} Menu Dipilih</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white text-blue-800 px-3 py-1.5 rounded-xl shadow-xs">
              Lihat Keranjang →
            </span>
          </button>
        </div>
      )}

      {/* Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
                  {item.badge && (
                    <span
                      className={`absolute -top-1 -right-2 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-stone-900 ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mt-0.5 shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
