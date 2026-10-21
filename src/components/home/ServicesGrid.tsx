import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  ShoppingBag,
  Pill,
  Package,
  Smartphone,
  Store,
  Sparkles
} from 'lucide-react';
import { ServiceType } from '../../types';

interface ServiceItem {
  id: ServiceType | 'all';
  name: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  badge?: string;
}

export const ServicesGrid: React.FC = () => {
  const { setCurrentView, setSelectedService } = useApp();

  const services: ServiceItem[] = [
    {
      id: 'food',
      name: 'ArjaFood',
      subtitle: 'Kuliner Cirebonan',
      icon: UtensilsCrossed,
      color: 'text-blue-600 dark:text-blue-400',
      bgGradient: 'bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 border-blue-500/30',
      badge: 'Diskon 50%'
    },
    {
      id: 'grocery',
      name: 'ArjaMart',
      subtitle: 'Sembako & Sayur',
      icon: ShoppingBag,
      color: 'text-sky-600 dark:text-sky-400',
      bgGradient: 'bg-gradient-to-br from-sky-500/15 to-blue-500/15 text-sky-600 border-sky-500/30'
    },
    {
      id: 'pharmacy',
      name: 'ArjaMed',
      subtitle: 'Obat & Resep',
      icon: Pill,
      color: 'text-rose-600 dark:text-rose-400',
      bgGradient: 'bg-gradient-to-br from-rose-500/15 to-pink-500/15 text-rose-600 border-rose-500/30',
      badge: '24 Jam'
    },
    {
      id: 'courier',
      name: 'ArjaSend',
      subtitle: 'Kirim Paket Instan',
      icon: Package,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgGradient: 'bg-gradient-to-br from-indigo-500/15 to-blue-600/15 text-indigo-600 border-indigo-500/30'
    },
    {
      id: 'ppob',
      name: 'Pulsa & PPOB',
      subtitle: 'PLN, PDAM, Pulsa',
      icon: Smartphone,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgGradient: 'bg-gradient-to-br from-cyan-500/15 to-teal-500/15 text-cyan-600 border-cyan-500/30'
    },
    {
      id: 'umkm',
      name: 'ArjaUMKM',
      subtitle: 'Batik & Oleh-Oleh',
      icon: Store,
      color: 'text-amber-600 dark:text-amber-400',
      bgGradient: 'bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-amber-600 border-amber-500/30',
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
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
      {services.map((srv) => {
        const Icon = srv.icon;
        return (
          <button
            key={srv.id}
            onClick={() => handleServiceClick(srv.id)}
            className="group relative flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            {srv.badge && (
              <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black tracking-tight bg-orange-500 text-white shadow-xs">
                {srv.badge}
              </span>
            )}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 border transition-transform duration-200 group-hover:scale-105 ${srv.bgGradient}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-stone-800 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
              {srv.name}
            </span>
            <span className="text-[10px] text-stone-400 dark:text-stone-400 truncate max-w-full mt-0.5 font-medium">
              {srv.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
};
