import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServicesGrid } from './ServicesGrid';
import { PromoBanners } from './PromoBanners';
import { ActiveOrderFloatingWidget } from './ActiveOrderFloatingWidget';
import {
  Wallet,
  QrCode,
  Plus,
  Star,
  Clock,
  Bike,
  ShieldCheck,
  ChevronRight,
  Flame,
  Award,
  Sparkles,
  ShoppingBag,
  Tag,
  ArrowUpRight,
  Store,
  Check
} from 'lucide-react';
import { Merchant, Product } from '../../types';

export const HomeView: React.FC = () => {
  const {
    wallet,
    merchants,
    products,
    setSelectedMerchant,
    setSelectedProduct,
    setCurrentView,
    setIsDriverRegistrationModalOpen,
    addToCart,
    isFavorite,
    toggleFavorite,
    applyVoucher,
    availableVouchers
  } = useApp();

  const [activeTab, setActiveTab] = useState<'merchants' | 'products' | 'promos'>('merchants');

  const featuredMerchants = merchants.filter((m) => m.featured || m.rating >= 4.8);
  const popularProducts = products.slice(0, 8);

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    if (merchant.serviceType === 'food') setCurrentView('food');
    else if (merchant.serviceType === 'grocery') setCurrentView('grocery');
    else if (merchant.serviceType === 'pharmacy') setCurrentView('pharmacy');
    else if (merchant.serviceType === 'umkm') setCurrentView('umkm');
  };

  return (
    <div className="space-y-2.5 pb-20 max-w-6xl mx-auto">
      
      {/* 1. COMPACT UNIFIED HUB: BRAND + WALLET IN ONE SLEEK BAR */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-2.5 sm:p-3 shadow-md border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-blue-500/15 blur-xl pointer-events-none" />

        {/* Brand identity */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md shrink-0 overflow-hidden">
            <img
              src="/assets/aistudio/Designer_b056b7f0.png"
              alt="AWD"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm text-white tracking-tight">
                AWD Arjawinangun
              </span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-blue-950 font-black text-[9px] uppercase tracking-wider">
                Wong Nangun
              </span>
            </div>
            <p className="text-[10px] text-blue-200 truncate">
              ⚡ Antar 15-25 Mnt • Driver Wong Dewek • Tarif Terjangkau
            </p>
          </div>
        </div>

        {/* MitraPay Wallet & Micro-Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2 z-10 border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
          <div
            onClick={() => setCurrentView('wallet')}
            className="cursor-pointer group pr-2 sm:border-r border-white/15 text-left"
          >
            <div className="flex items-center gap-1 text-[10px] text-sky-200 font-medium">
              <Wallet className="w-3 h-3 text-sky-300" />
              <span>MitraPay</span>
              <span className="text-[9px] font-bold text-amber-300">({wallet.points} Poin)</span>
            </div>
            <div className="text-sm font-black text-white tracking-tight leading-tight group-hover:text-sky-200 transition-colors">
              Rp {wallet.balance.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentView('wallet')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition active:scale-95"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-300" />
              <span>Bayar</span>
            </button>
            <button
              onClick={() => setCurrentView('wallet')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-sky-300" />
              <span>Top Up</span>
            </button>
            <button
              onClick={() => setCurrentView('driver')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-extrabold shadow-sm transition active:scale-95"
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Driver</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. COMPACT SERVICES ROW (6 CORE FACILITATOR SERVICES) */}
      <section>
        <ServicesGrid />
      </section>

      {/* 3. DUAL-COLUMN COMPACT WORKSPACE (DESKTOP) / STREAMLINED FEED (MOBILE) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start">
        
        {/* LEFT COLUMN: ACTIVE ORDER, COMPACT PROMO TICKER, AND DRIVER RECRUITMENT (MD: 5 cols) */}
        <div className="md:col-span-5 space-y-2.5">
          
          {/* Active Order Widget (Compact) */}
          <ActiveOrderFloatingWidget />

          {/* Compact Promo Banner Carousel */}
          <div className="rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 dark:border-stone-800">
            <PromoBanners />
          </div>

          {/* Compact Driver Recruitment & Community Guarantee Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white shadow-sm flex items-center justify-between gap-2.5 border border-blue-400/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white p-0.5 text-slate-900 flex items-center justify-center shrink-0 shadow-xs">
                <Bike className="w-5 h-5 text-blue-700" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wide bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                    Mitra Driver
                  </span>
                  <span className="text-[10px] text-blue-200">Komisi 90%</span>
                </div>
                <h4 className="font-extrabold text-xs text-white truncate mt-0.5">
                  Gabung Jadi Driver AWD Arja
                </h4>
              </div>
            </div>

            <button
              onClick={() => setIsDriverRegistrationModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] shrink-0 shadow-xs transition"
            >
              Daftar
            </button>
          </div>

          {/* Quick Vouchers 1-Click Strip */}
          <div className="p-2.5 rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>Kupon Diskon Instan:</span>
              </div>
              <span className="text-[10px] text-slate-400">1-Klik Pakai</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-0.5">
              {availableVouchers.slice(0, 3).map((v) => (
                <button
                  key={v.id}
                  onClick={() => applyVoucher(v.code)}
                  className="px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold shrink-0 flex items-center gap-1 transition"
                  title={v.title}
                >
                  <span>{v.code}</span>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-extrabold">
                    {v.discountType === 'percentage' ? `${v.discountValue}%` : `Rp${Math.floor(v.discountValue/1000)}k`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-DENSITY EXPLORER TABS (MD: 7 cols) */}
        <div className="md:col-span-7 space-y-2">
          
          {/* Dense Tab Selector */}
          <div className="flex items-center justify-between bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold">
            <button
              onClick={() => setActiveTab('merchants')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'merchants'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Resto Pilihan ({featuredMerchants.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Menu Terlaris</span>
            </button>

            <button
              onClick={() => setActiveTab('promos')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'promos'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Voucher Hemat</span>
            </button>
          </div>

          {/* TAB 1: HIGH-DENSITY MERCHANTS LIST */}
          {activeTab === 'merchants' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {featuredMerchants.map((merchant) => (
                <div
                  key={merchant.id}
                  onClick={() => handleMerchantSelect(merchant)}
                  className="group cursor-pointer bg-white dark:bg-stone-800/90 rounded-xl border border-stone-200/80 dark:border-stone-700/60 p-2 shadow-2xs hover:shadow-xs hover:border-blue-400/60 transition-all flex gap-2.5 items-center"
                >
                  {/* Compact Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={merchant.banner}
                      alt={merchant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold px-1 py-0.2 flex items-center justify-between">
                      <span className="flex items-center text-amber-300">
                        <Star className="w-2.5 h-2.5 fill-amber-300 inline mr-0.5" />
                        {merchant.rating}
                      </span>
                      <span>{merchant.distanceKm}km</span>
                    </div>
                  </div>

                  {/* Merchant Details */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {merchant.name}
                      </h3>
                      {merchant.isVerified && (
                        <ShieldCheck className="w-3 h-3 text-blue-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {merchant.category} • {merchant.address}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        Ongkir Rp {merchant.deliveryFee.toLocaleString('id-ID')}
                      </span>
                      <span className="text-stone-400 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {merchant.estimatedDeliveryMin} mnt
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: HIGH-DENSITY POPULAR PRODUCTS */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {popularProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-stone-800/90 rounded-xl border border-stone-200/80 dark:border-stone-700/60 p-2 shadow-2xs hover:border-blue-400/60 transition-all flex gap-2 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 truncate mt-0.5">
                      {product.merchantName || 'Empal Gentong H. Apud'}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-black text-xs text-stone-900 dark:text-white">
                        Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                      </span>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-2 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs transition active:scale-95 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PROMOS & VOUCHERS LIST */}
          {activeTab === 'promos' && (
            <div className="space-y-2">
              {availableVouchers.map((v) => (
                <div
                  key={v.id}
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                        {v.code}
                      </span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">{v.title}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-0.5">{v.description}</p>
                  </div>
                  <button
                    onClick={() => applyVoucher(v.code)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[11px] shrink-0 shadow-2xs hover:from-blue-700 transition"
                  >
                    Gunakan
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
