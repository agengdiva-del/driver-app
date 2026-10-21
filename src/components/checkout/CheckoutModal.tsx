import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  Wallet,
  Banknote,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PaymentMethod } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    currentAddress,
    setIsAddressModalOpen,
    cart,
    cartTotal,
    appliedVoucher,
    placeOrder,
    wallet,
    setIsTrackingOpen,
    showToast
  } = useApp();

  const [selectedCourierSpeed, setSelectedCourierSpeed] = useState<'instant' | 'regular' | 'economy'>('instant');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('mitrapay');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQrisPreview, setShowQrisPreview] = useState(false);

  if (!isCheckoutOpen) return null;

  const courierRates = {
    instant: { name: 'Instan Prioritas (15-25 Menit)', fee: 5000, desc: 'Driver langsung diantar khusus untukmu' },
    regular: { name: 'Reguler Cepat (30-45 Menit)', fee: 4000, desc: 'Pengantaran standar terjangkau' },
    economy: { name: 'Hemat Bersama (45-60 Menit)', fee: 3000, desc: 'Pengantaran gabungan rute terdekat' }
  };

  const deliveryFee = courierRates[selectedCourierSpeed].fee;
  const platformFee = 1500; // MitraArja Admin rule

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = Math.min((cartTotal * appliedVoucher.discountValue) / 100, appliedVoucher.maxDiscount || 999999);
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
  }

  const grandTotal = Math.max(0, cartTotal + deliveryFee + platformFee - discountAmount);

  const handleConfirmOrder = () => {
    if (selectedPaymentMethod === 'mitrapay' && wallet.balance < grandTotal) {
      showToast('Saldo MitraPay tidak mencukupi, silakan pilih metode bayar lain atau top up', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        placeOrder(selectedPaymentMethod, orderNotes);
        setIsSubmitting(false);
        setIsCheckoutOpen(false);
        setIsTrackingOpen(true); // Automatically open live order tracking modal
      } catch (err) {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col justify-between shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>Konfirmasi Checkout Pesanan AWD</span>
          </h2>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Delivery Address Section */}
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Alamat Pengiriman (Arjawinangun)
              </span>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-[11px]"
              >
                Ganti Alamat
              </button>
            </div>
            <div>
              <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                {currentAddress.recipientName} ({currentAddress.label}) • {currentAddress.phone}
              </span>
              <p className="text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                {currentAddress.streetAddress}, Desa {currentAddress.village}, Kecamatan {currentAddress.district}, {currentAddress.city}
              </p>
              {currentAddress.notes && (
                <p className="text-[11px] text-stone-400 italic mt-1">
                  Catatan: {currentAddress.notes}
                </p>
              )}
            </div>
          </div>

          {/* Courier Speed Selection */}
          <div className="space-y-2">
            <label className="font-bold text-stone-700 dark:text-stone-300 block">
              Pilihan Kecepatan Pengantaran Kurir
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['instant', 'regular', 'economy'] as const).map((speed) => {
                const opt = courierRates[speed];
                const isSelected = selectedCourierSpeed === speed;
                return (
                  <div
                    key={speed}
                    onClick={() => setSelectedCourierSpeed(speed)}
                    className={`cursor-pointer p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span className="font-bold text-stone-900 dark:text-stone-100 block">
                      {speed === 'instant' ? '⚡ Instan' : speed === 'regular' ? '🛵 Reguler' : '🌱 Hemat'}
                    </span>
                    <span className="font-black text-blue-600 dark:text-blue-400 text-xs block mt-1">
                      Rp {opt.fee.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="font-bold text-stone-700 dark:text-stone-300 block">
              Metode Pembayaran
            </label>
            <div className="space-y-2">
              {/* MitraPay Option */}
              <div
                onClick={() => setSelectedPaymentMethod('mitrapay')}
                className={`cursor-pointer p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  selectedPaymentMethod === 'mitrapay'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-stone-900 dark:text-stone-100 block">
                      MitraPay AWD Wallet
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Saldo: <strong>Rp {wallet.balance.toLocaleString('id-ID')}</strong>
                    </span>
                  </div>
                </div>
                {wallet.balance < grandTotal && (
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                    Saldo Kurang
                  </span>
                )}
              </div>

              {/* QRIS Option */}
              <div
                onClick={() => {
                  setSelectedPaymentMethod('qris');
                  setShowQrisPreview(true);
                }}
                className={`cursor-pointer p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  selectedPaymentMethod === 'qris'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-stone-900 dark:text-stone-100 block">
                      QRIS Nasional (BCA, Mandiri, BRI, GoPay, DANA)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Scan kode QRIS instan otomatis terverifikasi
                    </span>
                  </div>
                </div>
              </div>

              {/* COD Option */}
              <div
                onClick={() => setSelectedPaymentMethod('cod')}
                className={`cursor-pointer p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  selectedPaymentMethod === 'cod'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-stone-900 dark:text-stone-100 block">
                      Bayar Tunai di Tempat (COD)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Serahkan uang pas ke driver saat pesanan tiba
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QRIS Simulator Modal preview if QRIS is selected */}
          {selectedPaymentMethod === 'qris' && showQrisPreview && (
            <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center space-y-2">
              <span className="font-bold text-stone-700 dark:text-stone-200 text-xs">
                QRIS Dinamis AWD (NMID: ID10200812839)
              </span>
              <div className="w-36 h-36 bg-white mx-auto p-2 rounded-xl shadow-xs border flex items-center justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020101021226580016ID.CO.MITRAARJA.WWW011893600998822145500252045812"
                  alt="QRIS AWD"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[10px] text-stone-500">
                Dapat discan memakai BCA Mobile, Livin, BRImo, DANA, OVO, ShopeePay
              </p>
            </div>
          )}

          {/* Order Notes */}
          <div>
            <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Catatan Pesanan / Patokan Rumah untuk Driver
            </label>
            <input
              type="text"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Contoh: Bel rumah di tiang pagar sebelah kanan, titip satpam"
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Cost Summary Breakdown */}
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-1.5">
            <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
              Rincian Pembayaran
            </span>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Subtotal Menu ({cart.length} item)</span>
              <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Ongkir ({courierRates[selectedCourierSpeed].name.split(' ')[0]})</span>
              <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Biaya Layanan MitraArja</span>
              <span>Rp {platformFee.toLocaleString('id-ID')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-blue-600 font-bold">
                <span>Diskon Promo Voucher</span>
                <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between items-baseline font-black text-sm sm:text-base text-stone-900 dark:text-stone-100">
              <span>Total Tagihan Akhir</span>
              <span className="text-blue-600 dark:text-sky-400">
                Rp {grandTotal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Confirmation Button */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <button
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'Menghubungi Merchant & Driver...'
                : `Konfirmasi & Bayar Rp ${grandTotal.toLocaleString('id-ID')}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
