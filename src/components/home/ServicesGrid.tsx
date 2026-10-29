import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  ShoppingBag,
  Pill,
  Package,
  Smartphone,
  Store,
} from 'lucide-react';
import { ServiceType } from '../../types';

interface ServiceItem {
  id: ServiceType | 'all';
  name: string;
  icon: React.ElementType;
  bgGradient: string;
  badge?: string;
}

export const ServicesGrid: React.FC = () => {
  const { setCurrentView } = useApp();

  const services: ServiceItem[] = [
    {
      id: 'food',
      name: 'ArjaFood',
      icon: UtensilsCrossed,
      bgGradient: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white',
      badge: '50%'
    },
    {
      id: 'grocery',
      name: 'ArjaMart',
      icon: ShoppingBag,
      bgGradient: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white'
    },
    {
      id: 'pharmacy',
      name: 'ArjaMed',
      icon: Pill,
      bgGradient: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white',
      badge: '24 Jam'
    },
    {
      id: 'courier',
      name: 'ArjaSend',
      icon: Package,
      bgGradient: 'bg-gradient-to-br from-indigo-500 to-blue-700 text-white'
    },
    {
      id: 'ppob',
      name: 'Pulsa & Tagihan',
      icon: Smartphone,
      bgGradient: 'bg-gradient-to-br from-cyan-600 to-teal-600 text-white'
    },
    {
      id: 'umkm',
      name: 'ArjaUMKM',
      icon: Store,
      bgGradient: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
      badge: 'Lokal'
    }
  ];

  const handleServiceClick = (serviceId: ServiceType | 'all') => {
    if (serviceId === 'food') setCurrentView('food');
    else if (serviceId === 'grocery') setCurrentView('grocery');
    else if (serviceId === 'pharmacy') setCurrentView('pharmacy');
    else if (serviceId === 'courier') setCurrentView('courier');
    else if (serviceId === 'ppob') setCurrentView('ppob');
    else if (serviceId === 'umkm') setCurrentView('umkm');
  };

  return (
    <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
      {services.map((srv) => {
        const Icon = srv.icon;
        return (
          <button
            key={srv.id}
            onClick={() => handleServiceClick(srv.id)}
            className="group relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/60 shadow-2xs hover:shadow-sm hover:border-blue-400/60 transition-all duration-150 active:scale-95 text-center min-w-0"
          >
            {srv.badge && (
              <span className="absolute -top-1.5 right-0.5 px-1 py-0.1 rounded-full text-[8px] font-black tracking-tight bg-orange-500 text-white shadow-2xs">
                {srv.badge}
              </span>
            )}
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-1 shadow-xs transition-transform duration-150 group-hover:scale-105 ${srv.bgGradient}`}
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <span className="font-bold text-[10px] sm:text-[11px] text-stone-800 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight truncate w-full">
              {srv.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
