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
  Info,
  Tag,
  MessageSquare,
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
    setCurrentView
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
      <div className="space-y-4 pb-24">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedMerchant(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Resto</span>
          </button>
          <button
            onClick={() => toggleFavorite(selectedMerchant.id)}
            className={`p-2 rounded-full border transition-all ${
              isFavorite(selectedMerchant.id)
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'text-stone-400 hover:text-rose-500 border-stone-200 dark:border-stone-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite(selectedMerchant.id) ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Hero Banner & Info */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-xs">
          <div className="relative h-44 sm:h-56 w-full">
            <img
              src={selectedMerchant.banner}
              alt={selectedMerchant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMerchant.logo}
                  alt={selectedMerchant.name}
                  className="w-14 h-14 rounded-2xl border-2 border-white object-cover shadow-md"
                />
                <div>
                  <h1 className="font-extrabold text-lg sm:text-2xl leading-tight">
                    {selectedMerchant.name}
                  </h1>
                  <p className="text-xs text-stone-200">{selectedMerchant.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 grid grid-cols-3 gap-2 border-b border-stone-100 dark:border-stone-700/60 text-center text-xs">
            <div className="p-2 rounded-2xl bg-stone-50 dark:bg-stone-700/40">
              <span className="text-stone-400 block text-[10px]">Rating</span>
              <span className="font-bold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {selectedMerchant.rating} ({selectedMerchant.totalReviews})
              </span>
            </div>
            <div className="p-2 rounded-2xl bg-stone-50 dark:bg-stone-700/40">
              <span className="text-stone-400 block text-[10px]">Jarak & Waktu</span>
              <span className="font-bold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                {selectedMerchant.distanceKm} km • {selectedMerchant.estimatedDeliveryMin} mnt
              </span>
            </div>
            <div className="p-2 rounded-2xl bg-stone-50 dark:bg-stone-700/40">
              <span className="text-stone-400 block text-[10px]">Ongkos Kirim</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                Rp {selectedMerchant.deliveryFee.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Tags & Promo Badge */}
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-bold text-[10px]">
              Promo Resto
            </span>
            <span className="text-emerald-800 dark:text-emerald-300 font-medium text-[11px]">
              Gunakan kode ONGKIRARJA untuk gratis ongkir s/d Rp 5.000
            </span>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuCategories.map((category) => {
            const catProducts = merchantProducts.filter((p) => p.category === category);
            return (
              <div key={category} className="space-y-3">
                <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 border-l-4 border-blue-600 pl-2.5">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {catProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700 p-3 flex gap-3 shadow-xs hover:border-blue-500/50 transition-all"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div>
                            <span className="font-extrabold text-sm text-blue-600 dark:text-sky-400">
                              Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                            </span>
                            {product.discountPrice && (
                              <span className="text-[10px] text-stone-400 line-through block">
                                Rp {product.price.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(product, 1, noteInputs[product.id] || '')}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
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
    <div className="space-y-4 pb-24">
      {/* Title & Search */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-blue-600" />
            <span>AWD Food Kuliner Arjawinangun</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Jelajahi kelezatan khas Arjawinangun, Cirebon & Nusantara by Wong Nangun
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchFoodQuery}
          onChange={(e) => setSearchFoodQuery(e.target.value)}
          placeholder="Cari empal asem, bebek sinjay, kopi, tahu gejrot..."
          className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodMerchants.map((merchant) => (
          <div
            key={merchant.id}
            onClick={() => setSelectedMerchant(merchant)}
            className="cursor-pointer bg-white dark:bg-stone-800 rounded-3xl border border-stone-200/80 dark:border-stone-700 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className="relative h-36 w-full">
              <img
                src={merchant.banner}
                alt={merchant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {merchant.isVerified && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              )}

              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{merchant.rating}</span>
                <span className="text-[10px] text-stone-300 font-normal">
                  ({merchant.totalReviews})
                </span>
              </div>

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

            <div className="p-3.5">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {merchant.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                {merchant.address}
              </p>

              <div className="flex flex-wrap gap-1 mt-2">
                {merchant.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium bg-stone-100 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-700/60 text-xs">
                <span className="text-stone-600 dark:text-stone-300">
                  Ongkir: <strong className="text-blue-600 dark:text-sky-400">Rp {merchant.deliveryFee.toLocaleString('id-ID')}</strong>
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Buka Menu →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
