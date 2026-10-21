import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServicesGrid } from './ServicesGrid';
import { PromoBanners } from './PromoBanners';
import { ActiveOrderFloatingWidget } from './ActiveOrderFloatingWidget';
import {
  Wallet,
  QrCode,
  ArrowUpRight,
  Plus,
  Star,
  Clock,
  Bike,
  ShieldCheck,
  ChevronRight,
  Flame,
  Award,
  Sparkles
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
    addToCart,
    isFavorite,
    toggleFavorite
  } = useApp();

  const featuredMerchants = merchants.filter((m) => m.featured || m.rating >= 4.8);
  const popularProducts = products.slice(0, 6);

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    if (merchant.serviceType === 'food') setCurrentView('food');
    else if (merchant.serviceType === 'grocery') setCurrentView('grocery');
    else if (merchant.serviceType === 'pharmacy') setCurrentView('pharmacy');
    else if (merchant.serviceType === 'umkm') setCurrentView('umkm');
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Official AWD Brand Hero Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-blue-500/30 flex items-center justify-between gap-3 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider text-sky-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Official Hyperlocal Delivery
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-transparent">
            AWD • Arjawinangun Delivery
          </h1>
          <p className="text-xs text-sky-200/90 font-medium mt-0.5">
            By Wong Nangun — Pesan Cepat Kuliner, Sembako & Kurir
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-lg text-slate-200 border border-white/10">
              📍 Pasar Gaya & By Pass
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-lg text-slate-200 border border-white/10">
              🛵 Driver Wong Dewek
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-lg text-slate-200 border border-white/10">
              ⚡ Antar 15-25 Mnt
            </span>
          </div>
        </div>

        {/* Uploaded Official Logo */}
        <div className="relative z-10 shrink-0">
          <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-sky-400 shadow-xl">
            <img
              src="/assets/aistudio/Designer_b056b7f0.png"
              alt="AWD Arjawinangun Delivery Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl drop-shadow-md hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* Active Order Live Floating Widget */}
      <ActiveOrderFloatingWidget />

      {/* MitraPay Quick Action Card (Rich Blue Gradient) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-800 text-white p-3.5 sm:p-4 rounded-3xl shadow-lg border border-blue-400/30 flex items-center justify-between gap-3 relative overflow-hidden">
        <div
          onClick={() => setCurrentView('wallet')}
          className="cursor-pointer group flex-1 min-w-0"
        >
          <div className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
            <Wallet className="w-3.5 h-3.5 text-sky-300" />
            <span>Saldo MitraPay AWD</span>
            <span className="px-1.5 py-0.2 bg-blue-900/60 rounded text-[10px] font-bold text-sky-300">
              {wallet.membershipLevel}
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black tracking-tight mt-0.5 truncate group-hover:text-sky-200 transition-colors">
            Rp {wallet.balance.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mt-0.5">
            <Award className="w-3 h-3" />
            <span>{wallet.points} Poin Reward</span>
          </div>
        </div>

        {/* Action buttons: Bayar QRIS, Top Up, Transfer */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentView('wallet')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95 text-center min-w-[58px]"
          >
            <QrCode className="w-5 h-5 text-sky-200 mb-1" />
            <span className="text-[10px] font-bold leading-none">Bayar</span>
          </button>

          <button
            onClick={() => setCurrentView('wallet')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95 text-center min-w-[58px]"
          >
            <Plus className="w-5 h-5 text-sky-200 mb-1" />
            <span className="text-[10px] font-bold leading-none">Top Up</span>
          </button>

          <button
            onClick={() => setCurrentView('wallet')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95 text-center min-w-[58px]"
          >
            <ArrowUpRight className="w-5 h-5 text-sky-200 mb-1" />
            <span className="text-[10px] font-bold leading-none">Transfer</span>
          </button>
        </div>
      </div>

      {/* Services Grid (6 Core Facilitator Services) */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            Layanan AWD Arjawinangun
            <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
              Wong Nangun
            </span>
          </h2>
        </div>
        <ServicesGrid />
      </section>

      {/* Banner Carousel */}
      <PromoBanners />

      {/* Featured Local Merchants in Arjawinangun */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <span>Resto & Toko Pilihan Arjawinangun</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Merchant resmi terverifikasi dengan ulasan terbaik
            </p>
          </div>
          <button
            onClick={() => setCurrentView('food')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Merchant Horizontal / Grid Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {featuredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              onClick={() => handleMerchantSelect(merchant)}
              className="group cursor-pointer bg-white dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-stone-100 dark:bg-stone-700">
                <img
                  src={merchant.banner}
                  alt={merchant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Verified Merchant Badge */}
                {merchant.isVerified && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                    Terverifikasi
                  </span>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{merchant.rating}</span>
                  <span className="text-[10px] text-stone-300 font-normal">
                    ({merchant.totalReviews})
                  </span>
                </div>

                {/* Distance & ETA */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 text-white text-[11px] font-semibold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-lg">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3 h-3 text-sky-400" />
                    {merchant.distanceKm} km
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    {merchant.estimatedDeliveryMin} mnt
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {merchant.name}
                  </h3>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                  {merchant.address}
                </p>

                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-700/60 text-xs">
                  <span className="text-stone-600 dark:text-stone-300 font-medium">
                    Ongkir: <strong className="text-blue-600 dark:text-blue-400">Rp {merchant.deliveryFee.toLocaleString('id-ID')}</strong>
                  </span>
                  <span className="text-[11px] text-stone-400 bg-stone-100 dark:bg-stone-700/50 px-2 py-0.5 rounded-md">
                    {merchant.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products in Arjawinangun */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100">
              Menu & Produk Terlaris Hari Ini
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Disukai warga Arjawinangun, Jungjang & sekitarnya
            </p>
          </div>
          <button
            onClick={() => setCurrentView('food')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
          >
            Lihat Menu <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700/60 p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="relative h-28 w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-700 mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discountPrice && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-md bg-rose-500 text-white text-[10px] font-black">
                      Diskon
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 truncate">
                  {product.merchantName}
                </div>
                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight mt-0.5">
                  {product.name}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-700/50">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                    Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                  </span>
                  {product.discountPrice && (
                    <span className="text-[10px] text-stone-400 line-through">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full mt-2 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hyperlocal Community Guarantee Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-sky-50/70 dark:from-stone-800/60 dark:to-stone-800/60 border border-blue-200/80 dark:border-stone-700/60 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-md">
          <img
            src="/assets/aistudio/Designer_b056b7f0.png"
            alt="AWD"
            className="w-9 h-9 object-contain"
          />
        </div>
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-stone-800 dark:text-stone-100">
            AWD (Arjawinangun Delivery) By Wong Nangun
          </h4>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
            Menghubungkan warga Arjawinangun langsung dengan UMKM lokal dan driver independen wong dewek. Tarif transparan, komisi driver 10%, dan biaya platform terjangkau (Rp 1.000 - Rp 2.500).
          </p>
        </div>
      </div>
    </div>
  );
};
