import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Zap, Calendar, Plus, Check, Clock, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';

export const GroceryView: React.FC = () => {
  const { products, addToCart, showToast } = useApp();
  const [deliveryMode, setDeliveryMode] = useState<'instant' | 'scheduled'>('instant');
  const [scheduledSlot, setScheduledSlot] = useState<string>('Besok Pagi, 07:00 - 09:00');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Beras & Biji',
    'Minyak & Bumbu',
    'Telur & Protein',
    'Buah Segar',
    'Sayur Mayur',
    'Makanan Beku'
  ];

  const groceryProducts = products.filter(
    (p) =>
      p.serviceType === 'grocery' &&
      (activeCategory === 'Semua' || p.category.toLowerCase().includes(activeCategory.toLowerCase()))
  );

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-500" />
          <span>ArjaMart Sembako & Sayur Segar</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Belanja kebutuhan dapur langsung dari pasar dan toko sembako terpercaya Arjawinangun
        </p>
      </div>

      {/* Delivery Mode Toggle: Instant vs Scheduled */}
      <div className="bg-white dark:bg-stone-800 p-3 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setDeliveryMode('instant');
              showToast('Pengantaran Instan Aktif (Tiba 20-35 Menit)', 'info');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              deliveryMode === 'instant'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Pengantaran Kilat (Instan)</span>
          </button>

          <button
            onClick={() => {
              setDeliveryMode('scheduled');
              showToast('Pengantaran Terjadwal Aktif', 'info');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              deliveryMode === 'scheduled'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Terjadwal (Pagi/Sore)</span>
          </button>
        </div>

        {deliveryMode === 'scheduled' ? (
          <div className="w-full sm:w-auto flex items-center gap-2 text-xs">
            <span className="text-stone-500 dark:text-stone-400 font-medium">Slot:</span>
            <select
              value={scheduledSlot}
              onChange={(e) => setScheduledSlot(e.target.value)}
              className="bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-2.5 py-1.5 font-bold text-stone-800 dark:text-stone-100 text-xs focus:outline-none"
            >
              <option value="Besok Pagi, 06:00 - 08:00">Besok Pagi, 06:00 - 08:00 (Sayur Segar Pasar)</option>
              <option value="Besok Pagi, 08:00 - 10:00">Besok Pagi, 08:00 - 10:00</option>
              <option value="Besok Siang, 13:00 - 15:00">Besok Siang, 13:00 - 15:00</option>
              <option value="Besok Sore, 16:00 - 18:00">Besok Sore, 16:00 - 18:00</option>
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimasi tiba dalam 20-35 menit</span>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {groceryProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700 p-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
          >
            <div>
              <div className="relative h-32 w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-700 mb-2.5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 text-[10px] font-bold shadow-xs">
                  {product.category}
                </span>
              </div>

              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 block truncate">
                {product.merchantName}
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 line-clamp-2 mt-0.5">
                {product.name}
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-700/60">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                  Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Stok {product.stock}
                </span>
              </div>

              <button
                onClick={() => addToCart(product, 1)}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
