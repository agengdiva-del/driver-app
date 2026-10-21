import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bike, Navigation, MessageCircle, ChevronRight, Play, CheckCircle2 } from 'lucide-react';

export const ActiveOrderFloatingWidget: React.FC = () => {
  const { activeOrder, setIsTrackingOpen, setIsChatOpen, simulateNextOrderStatus } = useApp();

  if (!activeOrder) return null;

  const statusLabels: Record<string, { label: string; sub: string; color: string }> = {
    pending: { label: 'Menunggu Konfirmasi', sub: 'Merchant sedang mengecek pesananmu', color: 'bg-amber-500' },
    merchant_accepted: { label: 'Pesanan Diterima Resto', sub: 'Sedang disiapkan di dapur', color: 'bg-amber-500' },
    driver_assigned: { label: 'Driver Ditugaskan', sub: `${activeOrder.driver?.name} menuju resto`, color: 'bg-blue-500' },
    preparing: { label: 'Sedang Disiapkan', sub: 'Pesanan sedang dikemas rapi', color: 'bg-amber-500' },
    picked_up: { label: 'Pesanan Diambil', sub: 'Driver mulai jalan ke lokasimu', color: 'bg-blue-500' },
    on_delivery: { label: 'Driver Menuju Lokasimu', sub: `${activeOrder.driver?.name} (${activeOrder.estimatedArrival})`, color: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
    delivered: { label: 'Driver Sampai di Lokasi', sub: 'Silakan ambil pesanan di pintu/pagar', color: 'bg-blue-600' },
    completed: { label: 'Pesanan Selesai', sub: 'Terima kasih atas pesananmu!', color: 'bg-indigo-600' },
    cancelled: { label: 'Pesanan Dibatalkan', sub: 'Dana telah dikembalikan ke MitraPay', color: 'bg-rose-500' }
  };

  const currentInfo = statusLabels[activeOrder.orderStatus] || {
    label: activeOrder.orderStatus,
    sub: 'Dalam proses pengantaran',
    color: 'bg-blue-500'
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-4 shadow-xl border border-blue-500/40 overflow-hidden relative">
      {/* Background ambient pattern */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />

      {/* Top row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bike className="w-5 h-5 text-sky-300" />
            </div>
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${currentInfo.color} ring-2 ring-blue-900 animate-ping`} />
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${currentInfo.color} ring-2 ring-blue-900`} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-sky-300">
                AWD Live Tracking • {activeOrder.orderNumber}
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base leading-tight">
              {currentInfo.label}
            </h4>
            <p className="text-xs text-sky-100/80 truncate max-w-[200px] sm:max-w-xs">
              {currentInfo.sub}
            </p>
          </div>
        </div>

        {/* Action Button to Open Full Interactive Map */}
        <button
          onClick={() => setIsTrackingOpen(true)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Lihat Peta</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Driver info & Simulation controls */}
      <div className="pt-2.5 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {activeOrder.driver && (
            <>
              <img
                src={activeOrder.driver.avatar}
                alt={activeOrder.driver.name}
                className="w-6 h-6 rounded-full object-cover border border-sky-400/50"
              />
              <span className="font-semibold text-sky-100">
                {activeOrder.driver.name} ({activeOrder.driver.vehiclePlate})
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Chat */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-sky-100 text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          {/* Dev Demo Simulator to advance order stages */}
          <button
            onClick={simulateNextOrderStatus}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/80 hover:bg-orange-500 text-white text-[11px] font-bold transition-all shadow-xs"
            title="Klik untuk mensimulasikan status pengantaran berikutnya"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Simulasi Tahap</span>
          </button>
        </div>
      </div>
    </div>
  );
};
