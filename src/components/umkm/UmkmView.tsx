import React from 'react';
import { useApp } from '../../context/AppContext';
import { Store, ShieldCheck, Plus, Sparkles, Heart } from 'lucide-react';

export const UmkmView: React.FC = () => {
  const { products, addToCart } = useApp();

  const umkmProducts = products.filter((p) => p.serviceType === 'umkm');

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Store className="w-5 h-5 text-orange-600" />
          <span>ArjaUMKM Sentra Oleh-Oleh Cirebon</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Produk asli pengrajin & UMKM lokal Arjawinangun & Cirebon: Batik Trusmi, Tahu Gejrot, Kerupuk Melarat & Kerajinan
        </p>
      </div>

      {/* Hero Heritage Card */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white p-4 sm:p-5 rounded-3xl shadow-md border border-orange-400/30">
        <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" />
          Bangga Buatan Lokal Arjawinangun
        </span>
        <h2 className="text-lg sm:text-2xl font-black mt-2">
          Dukung Ekonomi Kreatif Warga Lokal
        </h2>
        <p className="text-xs text-orange-100 mt-1 max-w-lg leading-relaxed">
          Setiap pembelian produk UMKM di MitraArja langsung disalurkan ke produsen lokal tanpa potongan berlebih.
        </p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {umkmProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200/80 dark:border-stone-700 overflow-hidden shadow-xs hover:shadow-md transition-all group p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-700 mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-orange-600 text-white text-[10px] font-bold shadow-xs">
                  {product.category}
                </span>
              </div>

              <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 block truncate">
                {product.merchantName}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 mt-0.5">
                {product.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-base text-stone-900 dark:text-stone-100 block">
                  Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                </span>
                {product.discountPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <button
                onClick={() => addToCart(product, 1)}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Beli Produk</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
