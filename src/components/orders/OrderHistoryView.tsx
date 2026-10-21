import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Star,
  Printer,
  ChevronRight,
  Navigation,
  MessageSquare,
  X,
  RotateCcw
} from 'lucide-react';
import { Order } from '../../types';

export const OrderHistoryView: React.FC = () => {
  const {
    activeOrder,
    orderHistory,
    setIsTrackingOpen,
    setIsChatOpen,
    addReview,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewComment, setReviewComment] = useState('Enak banget, porsi pas dan hangat!');

  const activeOrdersList = activeOrder ? [activeOrder] : [];
  const completedOrdersList = orderHistory.filter((o) => o.orderStatus === 'completed');
  const cancelledOrdersList = orderHistory.filter((o) => o.orderStatus === 'cancelled');

  const displayedOrders =
    activeTab === 'active'
      ? activeOrdersList
      : activeTab === 'completed'
      ? completedOrdersList
      : cancelledOrdersList;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewOrder) return;
    addReview(reviewOrder.id, ratingVal, reviewComment);
    setReviewOrder(null);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <span>Riwayat Pesanan Saya</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Pantau status pengiriman terkini, riwayat transaksi & faktur resmi AWD
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('active')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'active'
              ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Dalam Proses ({activeOrdersList.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'completed'
              ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Selesai ({completedOrdersList.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'cancelled'
              ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Dibatalkan ({cancelledOrdersList.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {displayedOrders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 text-stone-400">
            <ClipboardList className="w-12 h-12 mx-auto mb-2 opacity-30 text-blue-600" />
            <p className="font-bold text-sm text-stone-700 dark:text-stone-300">
              Tidak ada pesanan di kategori ini
            </p>
            <p className="text-xs text-stone-400 mt-0.5">
              Pesanan aktifmu akan otomatis muncul di tab ini
            </p>
          </div>
        ) : (
          displayedOrders.map((order) => {
            const isFinished = order.orderStatus === 'completed';
            return (
              <div
                key={order.id}
                className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200/80 dark:border-stone-700 p-4 shadow-xs space-y-3"
              >
                {/* Order Top Bar */}
                <div className="flex items-start justify-between gap-2 border-b border-stone-100 dark:border-stone-700/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-stone-900 dark:text-stone-100">
                        {order.orderNumber}
                      </span>
                      <span className="text-[10px] text-stone-400">• {order.createdAt}</span>
                    </div>
                    <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mt-0.5">
                      {order.merchantName}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      order.orderStatus === 'completed'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        : order.orderStatus === 'cancelled'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 animate-pulse'
                    }`}
                  >
                    {order.orderStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Items Summary */}
                <div className="space-y-1.5 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-700 dark:text-stone-300">
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        Rp {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total & Action Buttons */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Total Pembayaran</span>
                    <span className="font-black text-sm text-stone-900 dark:text-stone-100">
                      Rp {order.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold hover:bg-stone-200 flex items-center gap-1 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Faktur</span>
                    </button>

                    {!isFinished && (
                      <button
                        onClick={() => setIsTrackingOpen(true)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Lacak GPS</span>
                      </button>
                    )}

                    {isFinished && (
                      <button
                        onClick={() => setReviewOrder(order)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-1 shadow-xs"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>Beri Ulasan</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs space-y-4">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Invoice Print Header with Official Logo */}
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 text-center">
              <div className="w-16 h-16 mx-auto mb-2 p-1 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                <img
                  src="/assets/aistudio/Designer_b056b7f0.png"
                  alt="AWD Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <span className="font-black text-blue-600 dark:text-blue-400 text-lg tracking-wider block">
                AWD - ARJAWINANGUN DELIVERY
              </span>
              <p className="text-[10px] text-stone-400">
                Platform Hyperlocal Marketplace & Delivery By Wong Nangun
              </p>
              <h3 className="font-extrabold text-sm text-stone-800 dark:text-stone-100 mt-1">
                BUKTI TRANSAKSI PEMBAYARAN RESMI
              </h3>
              <span className="font-mono text-[11px] text-stone-500">
                No: {selectedInvoiceOrder.orderNumber}
              </span>
            </div>

            {/* Merchant & Customer details */}
            <div className="space-y-1 text-[11px] text-stone-600 dark:text-stone-300">
              <div className="flex justify-between">
                <span>Waktu Transaksi:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedInvoiceOrder.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span>Merchant / Penjual:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedInvoiceOrder.merchantName}</span>
              </div>
              <div className="flex justify-between">
                <span>Alamat Pengantaran:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedInvoiceOrder.deliveryAddress.village}, Arjawinangun</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Pembayaran:</span>
                <span className="font-bold text-blue-600 uppercase">{selectedInvoiceOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Items table */}
            <div className="border-t border-b border-stone-200 dark:border-stone-800 py-2 space-y-1">
              {selectedInvoiceOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span className="font-semibold">
                    Rp {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-stone-500 pt-1 border-t border-stone-100 dark:border-stone-800">
                <span>Ongkos Kirim Kurir</span>
                <span>Rp {selectedInvoiceOrder.deliveryFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Biaya Platform (Admin AWD)</span>
                <span>Rp {selectedInvoiceOrder.platformFee.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-black text-sm text-stone-900 dark:text-stone-100">
              <span>TOTAL LUNAS</span>
              <span className="text-blue-600 dark:text-sky-400">
                Rp {selectedInvoiceOrder.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={() => {
                showToast('Faktur berhasil diunduh (PDF)', 'success');
                setSelectedInvoiceOrder(null);
              }}
              className="w-full py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-extrabold flex items-center justify-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh Faktur PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs">
            <button
              onClick={() => setReviewOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 mb-1">
              Beri Ulasan & Bintang
            </h3>
            <p className="text-stone-500 mb-3">
              Ulasanmu sangat berharga bagi mitra resto dan driver Arjawinangun
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Rating Kepuasan
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingVal(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= ratingVal
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-extrabold text-sm text-amber-500 ml-2">
                    {ratingVal} / 5 Bintang
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Komentar / Pengalamanmu
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md"
              >
                Kirim Ulasan Sekarang
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
