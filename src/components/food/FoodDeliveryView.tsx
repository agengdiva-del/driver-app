import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Star,
  Clock,
  Bike,
  ShieldCheck,
  Search,
  Plus,
  ArrowLeft,
  Heart
} from 'lucide-react';
import { Merchant, Product } from '../../types';

export const FoodDeliveryView: React.FC = () => {
  const {
    merchants,
    products,
    selectedMerchant,
    setSelectedMerchant,
    addToCart,
    isFavorite,
    toggleFavorite,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchFoodQuery, setSearchFoodQuery] = useState('');
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const categories = [
    'Semua',
    'Tradisional Cirebon',
    'Chicken',
    'Bakso',
    'Seafood',
    'Coffee',
    'Noodles',
    'Martabak',
    'Fast Food'
  ];

  const foodMerchants = merchants.filter(
    (m) =>
      m.serviceType === 'food' &&
      (selectedCategory === 'Semua' || m.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      (m.name.toLowerCase().includes(searchFoodQuery.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(searchFoodQuery.toLowerCase())))
  );

  // If a restaurant is selected, show the Restaurant Detail Page
  if (selectedMerchant) {
    const merchantProducts = products.filter((p) => p.merchantId === selectedMerchant.id);
    const menuCategories = Array.from(new Set(merchantProducts.map((p) => p.category)));

    return (
      <div className="space-y-2.5 pb-16 max-w-5xl mx-auto">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedMerchant(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Resto</span>
          </button>
          <button
            onClick={() => toggleFavorite(selectedMerchant.id)}
            className={`p-1.5 rounded-full border transition-all ${
              isFavorite(selectedMerchant.id)
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'text-stone-400 hover:text-rose-500 border-stone-200 dark:border-stone-700'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite(selectedMerchant.id) ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Hero Banner & Info (Compact) */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-2xs">
          <div className="relative h-28 sm:h-36 w-full">
            <img
              src={selectedMerchant.banner}
              alt={selectedMerchant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedMerchant.logo}
                  alt={selectedMerchant.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-white object-cover shadow-sm"
                />
                <div>
                  <h1 className="font-extrabold text-sm sm:text-lg leading-tight">
                    {selectedMerchant.name}
                  </h1>
                  <p className="text-[11px] text-stone-200 truncate">{selectedMerchant.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 grid grid-cols-3 gap-1.5 border-b border-stone-100 dark:border-stone-700/60 text-center text-xs">
            <div className="p-1.5 rounded-xl bg-stone-50 dark:bg-stone-700/40">
              <span className="text-stone-400 block text-[9px]">Rating</span>
              <span className="font-bold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-1 mt-0.5 text-[11px]">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {selectedMerchant.rating} ({selectedMerchant.totalReviews})
              </span>
            </div>
            <div className="p-1.5 rounded-xl bg-stone-50 dark:bg-stone-700/40">
              <span className="text-stone-400 block text-[9px]">Jarak & Waktu</span>
              <span className="font-bold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-1 mt-0.5 text-[11px]">
                <Clock className="w-3 h-3 text-blue-500" />
                {selectedMerchant.distanceKm}km • {selectedMerchant.estimatedDeliveryMin}mnt
              </span>
            </div>
            <div className="p-1.5 rounded-xl bg-stone-50 dark:bg-stone-700/40">
              <span className="text-stone-400 block text-[9px]">Ongkir Flat</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 block mt-0.5 text-[11px]">
                Rp {selectedMerchant.deliveryFee.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Sections (Compact Tiles) */}
        <div className="space-y-4">
          {menuCategories.map((category) => {
            const items = merchantProducts.filter((p) => p.category === category);
            return (
              <div key={category} className="space-y-1.5">
                <h3 className="font-extrabold text-xs text-stone-800 dark:text-stone-200 uppercase tracking-wide">
                  {category} ({items.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200/80 dark:border-stone-700 p-2 flex gap-2.5 items-center shadow-2xs hover:border-blue-400/60 transition-all"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-stone-400 truncate mt-0.5">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="font-black text-xs text-stone-900 dark:text-white">
                            Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                          </span>
                          <button
                            onClick={() => addToCart(product, 1, noteInputs[product.id] || '')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs transition active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Tambah</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 pb-16 max-w-5xl mx-auto">
      {/* Title & Search (Compact) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <UtensilsCrossed className="w-4 h-4 text-blue-600" />
            <span>AWD Food • Kuliner Arjawinangun</span>
          </h1>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Pesan empal gentong, nasi jamblang, bebek, & cemilan khas Arjawinangun
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFoodQuery}
            onChange={(e) => setSearchFoodQuery(e.target.value)}
            placeholder="Cari menu / resto..."
            className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll - Compact) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurant Cards (Compact Dual/Triple Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
        {foodMerchants.map((merchant) => (
          <div
            key={merchant.id}
            onClick={() => setSelectedMerchant(merchant)}
            className="cursor-pointer bg-white dark:bg-stone-800 rounded-xl border border-stone-200/80 dark:border-stone-700 overflow-hidden shadow-2xs hover:border-blue-400/60 transition-all duration-150 group"
          >
            <div className="relative h-24 sm:h-28 w-full bg-stone-100">
              <img
                src={merchant.banner}
                alt={merchant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {merchant.isVerified && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold flex items-center gap-0.5 shadow-2xs">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Verified
                </span>
              )}

              <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white px-1.5 py-0.2 rounded text-[10px] font-bold">
                <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                <span>{merchant.rating}</span>
                <span className="text-[9px] text-stone-300">({merchant.totalReviews})</span>
              </div>

              <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 text-white text-[10px] font-bold bg-black/60 backdrop-blur-xs px-1.5 py-0.2 rounded">
                <Bike className="w-2.5 h-2.5 text-sky-300" />
                <span>{merchant.distanceKm}km</span>
                <span>•</span>
                <Clock className="w-2.5 h-2.5 text-amber-300" />
                <span>{merchant.estimatedDeliveryMin}m</span>
              </div>
            </div>

            <div className="p-2 sm:p-2.5">
              <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {merchant.name}
              </h3>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                {merchant.address}
              </p>

              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 dark:border-stone-700/60 text-[10px]">
                <span className="text-stone-600 dark:text-stone-300">
                  Ongkir: <strong className="text-blue-600 dark:text-sky-400">Rp {merchant.deliveryFee.toLocaleString('id-ID')}</strong>
                </span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400 hover:underline">
                  Menu →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
