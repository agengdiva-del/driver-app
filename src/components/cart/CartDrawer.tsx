import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    availableVouchers,
    setIsCheckoutOpen
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [showVoucherList, setShowVoucherList] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFee = cart.length > 0 ? 5000 : 0;
  const platformFee = cart.length > 0 ? 1500 : 0; // Admin rule: Rp1.000 - Rp2.500

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = Math.min((cartTotal * appliedVoucher.discountValue) / 100, appliedVoucher.maxDiscount || 999999);
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
  }

  const finalTotal = Math.max(0, cartTotal + deliveryFee + platformFee - discountAmount);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                Keranjang Pesanan AWD
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {cart.length} Jenis Menu Dipilih
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-blue-600" />
              <p className="font-bold text-stone-700 dark:text-stone-300 text-sm">
                Keranjang belanja masih kosong
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Yuk pilih kuliner khas atau sembako pilihanmu!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Daftar Menu
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Kosongkan
                </button>
              </div>

              {cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 flex gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <span className="font-extrabold text-xs text-blue-600 dark:text-sky-400 block mt-0.5">
                        Rp {itemPrice.toLocaleString('id-ID')}
                      </span>
                      {item.notes && (
                        <p className="text-[10px] text-stone-400 italic line-clamp-1 mt-0.5">
                          "{item.notes}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 px-2 py-0.5">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-0.5 text-stone-500 hover:text-stone-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-xs px-1 text-stone-800 dark:text-stone-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-0.5 text-blue-600 hover:text-blue-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Voucher Selector Section */}
              <div className="pt-2">
                <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      Promo & Voucher Hemat
                    </span>
                    <button
                      onClick={() => setShowVoucherList(!showVoucherList)}
                      className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      {showVoucherList ? 'Tutup Daftar' : 'Pilih Voucher'}
                    </button>
                  </div>

                  {appliedVoucher ? (
                    <div className="flex items-center justify-between bg-white dark:bg-stone-900 p-2 rounded-xl border border-blue-500/30 text-xs">
                      <div>
                        <span className="font-extrabold text-blue-700 dark:text-blue-400">
                          {appliedVoucher.code}
                        </span>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400">
                          {appliedVoucher.title}
                        </p>
                      </div>
                      <button
                        onClick={removeVoucher}
                        className="text-stone-400 hover:text-rose-500 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                        placeholder="Masukkan Kode Promo"
                        className="flex-1 p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs uppercase font-mono font-bold outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => {
                          if (applyVoucher(inputCode)) setInputCode('');
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        Pakai
                      </button>
                    </div>
                  )}

                  {/* Voucher List Drawer */}
                  {showVoucherList && (
                    <div className="space-y-1.5 pt-1">
                      {availableVouchers.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => {
                            applyVoucher(v.code);
                            setShowVoucherList(false);
                          }}
                          className="cursor-pointer p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-blue-500 text-xs flex justify-between items-center transition-all"
                        >
                          <div>
                            <span className="font-bold text-blue-600 block">{v.code}</span>
                            <span className="text-[10px] text-stone-500">{v.description}</span>
                          </div>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                            Gunakan
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout Breakdown */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal Menu</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Ongkos Kirim (Arjawinangun)</span>
                <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1">
                  Biaya Layanan Aplikasi
                  <span className="text-[10px] bg-stone-200 dark:bg-stone-700 px-1 rounded text-stone-600 dark:text-stone-300">
                    AWD
                  </span>
                </span>
                <span>Rp {platformFee.toLocaleString('id-ID')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-blue-600 font-bold">
                  <span>Potongan Diskon Voucher</span>
                  <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                <span>Total Pembayaran</span>
                <span className="text-blue-600 dark:text-sky-400">
                  Rp {finalTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
