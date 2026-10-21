import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Filter,
  Star,
  Clock,
  Bike,
  Plus,
  ArrowRight,
  TrendingUp,
  History
} from 'lucide-react';
import { Product, Merchant } from '../../types';

export const GlobalSearchView: React.FC = () => {
  const {
    merchants,
    products,
    setSelectedMerchant,
    setCurrentView,
    addToCart
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'nearest' | 'rating' | 'popular' | 'promo' | 'open'>('all');
  const [historyTags, setHistoryTags] = useState([
    'Empal Gentong H. Apud',
    'Nasi Jamblang Daun Jati',
    'Beras Raja Jungjang',
    'Panadol Extra',
    'Ayam Geprek Korek',
    'Batik Megamendung'
  ]);

  const filters = [
    { id: 'all', label: 'Semua Hasil' },
    { id: 'nearest', label: 'Terdekat' },
    { id: 'rating', label: 'Rating Tertinggi' },
    { id: 'popular', label: 'Paling Populer' },
    { id: 'promo', label: 'Ada Promo' },
    { id: 'open', label: 'Buka Sekarang' }
  ];

  // Filtered merchants
  let filteredMerchants = merchants.filter(
    (m) =>
      !query ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  // Filtered products
  let filteredProducts = products.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  // Apply sorting / filters
  if (activeFilter === 'nearest') {
    filteredMerchants.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (activeFilter === 'rating') {
    filteredMerchants.sort((a, b) => b.rating - a.rating);
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (activeFilter === 'popular') {
    filteredMerchants.sort((a, b) => b.totalReviews - a.totalReviews);
    filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
  } else if (activeFilter === 'promo') {
    filteredProducts = filteredProducts.filter((p) => !!p.discountPrice);
  } else if (activeFilter === 'open') {
    filteredMerchants = filteredMerchants.filter((m) => m.isOpen);
  }

  const handleSelectMerchant = (m: Merchant) => {
    setSelectedMerchant(m);
    setCurrentView('food');
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const clearHistory = () => {
    setHistoryTags([]);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari makanan, toko, obat, sembako di Arjawinangun..."
          className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl pl-10 pr-10 py-3 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === f.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search History Chips if query is empty */}
      {!query && historyTags.length > 0 && (
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" />
              Pencarian Terakhir
            </span>
            <button
              onClick={clearHistory}
              className="text-[11px] text-stone-400 hover:text-rose-500"
            >
              Hapus Riwayat
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {historyTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-700/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-200 text-xs font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results - Merchants */}
      {filteredMerchants.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
            Toko & Resto Terkait ({filteredMerchants.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                onClick={() => handleSelectMerchant(merchant)}
                className="cursor-pointer bg-white dark:bg-stone-800 p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center gap-3 hover:border-emerald-500/50 shadow-xs transition-all"
              >
                <img
                  src={merchant.logo}
                  alt={merchant.name}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 truncate">
                    {merchant.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">{merchant.address}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {merchant.rating}
                    </span>
                    <span>•</span>
                    <span>{merchant.distanceKm} km</span>
                    <span>•</span>
                    <span>Rp {merchant.deliveryFee.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results - Products */}
      {filteredProducts.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
            Produk & Menu Terkait ({filteredProducts.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-stone-800 p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center gap-3 shadow-xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block truncate">
                    {product.merchantName}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-xs text-stone-900 dark:text-stone-100">
                      Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredMerchants.length === 0 && filteredProducts.length === 0 && (
        <div className="text-center py-12 text-stone-400">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="font-bold text-sm text-stone-600 dark:text-stone-300">
            Tidak ditemukan hasil untuk "{query}"
          </p>
          <p className="text-xs mt-1">
            Coba kata kunci lain seperti: Empal, Jamblang, Bakso, Minyak, Panadol
          </p>
        </div>
      )}
    </div>
  );
};
