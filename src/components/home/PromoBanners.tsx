import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

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
  const { applyVoucher, setCurrentView } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners: Banner[] = [
    {
      id: 'b-1',
      title: 'Pesta Kuliner Arjawinangun',
      subtitle: 'Diskon s/d 50% Empal Gentong & Nasi Jamblang Daun Jati',
      code: 'ARJABARU',
      badge: 'Spesial Warga Arja',
      bgGradient: 'from-blue-600 via-indigo-600 to-sky-600',
      textColor: 'text-white',
      category: 'food'
    },
    {
      id: 'b-2',
      title: 'Gratis Ongkir Se-Kecamatan!',
      subtitle: 'Tanpa minimum belanja untuk pengantaran Jungjang & Tegalgubug',
      code: 'ONGKIRARJA',
      badge: 'Bebas Ongkir',
      bgGradient: 'from-orange-500 to-amber-600',
      textColor: 'text-white',
      category: 'food'
    },
    {
      id: 'b-3',
      title: 'Cashback 20% Pakai MitraPay',
      subtitle: 'Top up dan belanja praktis dengan QRIS & MitraPay Wallet',
      code: 'MITRAPAYJOSS',
      badge: 'MitraPay Promo',
      bgGradient: 'from-blue-600 to-indigo-700',
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
    <div className="relative overflow-hidden rounded-3xl shadow-md border border-stone-200/60 dark:border-stone-800">
      <div
        className={`bg-gradient-to-r ${currentBanner.bgGradient} ${currentBanner.textColor} p-4 sm:p-6 transition-all duration-500 flex flex-col justify-between min-h-[145px] relative`}
      >
        {/* Subtle decorative circles */}
        <div className="absolute right-4 -top-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-24 -bottom-6 w-24 h-24 rounded-full bg-black/10 blur-md pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {currentBanner.badge}
            </span>
            <h3 className="text-base sm:text-xl font-extrabold mt-1.5 leading-tight">
              {currentBanner.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-sm">
              {currentBanner.subtitle}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-3 pt-2 border-t border-white/20">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-white/80" />
            <span className="font-mono font-bold text-xs bg-black/20 px-2 py-0.5 rounded-lg tracking-wider">
              {currentBanner.code}
            </span>
          </div>

          <button
            onClick={() => handleClaim(currentBanner.code)}
            className="px-3.5 py-1.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs shadow-xs transition-transform active:scale-95"
          >
            Klaim Voucher
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
