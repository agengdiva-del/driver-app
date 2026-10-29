import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Tag, ChevronRight } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  badge: string;
  bgGradient: string;
  textColor: string;
  category: string;
}

export const PromoBanners: React.FC = () => {
  const { applyVoucher } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners: Banner[] = [
    {
      id: 'b-1',
      title: 'Pesta Kuliner Arjawinangun',
      subtitle: 'Diskon s/d 50% Empal Gentong & Jamblang',
      code: 'ARJABARU',
      badge: 'Diskon 50%',
      bgGradient: 'from-blue-600 via-indigo-600 to-sky-600',
      textColor: 'text-white',
      category: 'food'
    },
    {
      id: 'b-2',
      title: 'Gratis Ongkir Se-Kecamatan!',
      subtitle: 'Tanpa min. belanja untuk Jungjang & Tegalgubug',
      code: 'ONGKIRARJA',
      badge: 'Bebas Ongkir',
      bgGradient: 'from-orange-500 to-amber-600',
      textColor: 'text-white',
      category: 'food'
    },
    {
      id: 'b-3',
      title: 'Cashback 20% Pakai MitraPay',
      subtitle: 'Top up & transaksi QRIS lebih hemat',
      code: 'MITRAPAYJOSS',
      badge: 'Cashback 20%',
      bgGradient: 'from-blue-700 to-indigo-800',
      textColor: 'text-white',
      category: 'wallet'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[currentIndex];

  const handleClaim = (code: string) => {
    applyVoucher(code);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xs border border-stone-200/60 dark:border-stone-800">
      <div
        className={`bg-gradient-to-r ${currentBanner.bgGradient} ${currentBanner.textColor} p-2.5 sm:p-3 transition-all duration-300 flex items-center justify-between gap-3 relative`}
      >
        <div className="relative z-10 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-white/20 backdrop-blur-xs text-[9px] font-black uppercase tracking-wide">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              {currentBanner.badge}
            </span>
            <span className="font-mono font-bold text-[10px] bg-black/25 px-1.5 py-0.2 rounded text-white">
              {currentBanner.code}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-extrabold leading-tight truncate">
            {currentBanner.title}
          </h3>
          <p className="text-[10px] text-white/90 truncate">
            {currentBanner.subtitle}
          </p>
        </div>

        <button
          onClick={() => handleClaim(currentBanner.code)}
          className="relative z-10 px-2.5 py-1.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-extrabold text-[11px] shadow-2xs shrink-0 transition active:scale-95 flex items-center gap-0.5"
        >
          <span>Klaim</span>
          <ChevronRight className="w-3 h-3 text-stone-600" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-1 right-2 flex items-center gap-1 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all ${
                currentIndex === idx ? 'w-3 bg-white' : 'w-1 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
