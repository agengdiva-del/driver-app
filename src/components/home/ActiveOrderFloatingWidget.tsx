import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bike, Navigation, MessageCircle, ChevronRight, Play } from 'lucide-react';

export const ActiveOrderFloatingWidget: React.FC = () => {
  const { activeOrder, setIsTrackingOpen, setIsChatOpen, simulateNextOrderStatus } = useApp();

  if (!activeOrder) return null;

  const statusLabels: Record<string, { label: string; sub: string; color: string }> = {
    pending: { label: 'Menunggu Konfirmasi', sub: 'Merchant cek pesanan', color: 'bg-amber-500' },
    merchant_accepted: { label: 'Pesanan Diterima Resto', sub: 'Disiapkan di dapur', color: 'bg-amber-500' },
    driver_assigned: { label: 'Driver Menuju Resto', sub: `${activeOrder.driver?.name}`, color: 'bg-blue-500' },
    preparing: { label: 'Sedang Disiapkan', sub: 'Dikemas rapi', color: 'bg-amber-500' },
    picked_up: { label: 'Pesanan Diambil', sub: 'Driver jalan ke lokasimu', color: 'bg-blue-500' },
    on_delivery: { label: 'Driver Menuju Lokasi', sub: `${activeOrder.driver?.name} (${activeOrder.estimatedArrival})`, color: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
    delivered: { label: 'Sampai di Lokasi', sub: 'Silakan ambil pesanan', color: 'bg-blue-600' },
    completed: { label: 'Pesanan Selesai', sub: 'Selesai diantar', color: 'bg-indigo-600' },
    cancelled: { label: 'Pesanan Dibatalkan', sub: 'Dana dikembalikan', color: 'bg-rose-500' }
  };

  const currentInfo = statusLabels[activeOrder.orderStatus] || {
    label: activeOrder.orderStatus,
    sub: 'Dalam proses pengantaran',
    color: 'bg-blue-500'
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-2.5 shadow-md border border-blue-500/35 overflow-hidden relative text-xs">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bike className="w-4 h-4 text-sky-300" />
            </div>
            <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${currentInfo.color} ring-1 ring-blue-900 animate-ping`} />
            <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${currentInfo.color} ring-1 ring-blue-900`} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-extrabold uppercase tracking-wide text-sky-300 truncate">
                Live Tracking • {activeOrder.orderNumber}
              </span>
            </div>
            <h4 className="font-extrabold text-xs leading-tight truncate">
              {currentInfo.label}
            </h4>
            <p className="text-[10px] text-sky-100/75 truncate">
              {currentInfo.sub}
            </p>
          </div>
        </div>

        {/* Action Button to Open Full Interactive Map */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-200 transition"
            title="Chat Driver"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={simulateNextOrderStatus}
            className="px-2 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold shadow-2xs flex items-center gap-0.5 transition"
            title="Simulasikan tahap status berikutnya"
          >
            <Play className="w-2.5 h-2.5 fill-white" />
            <span>Tahap</span>
          </button>

          <button
            onClick={() => setIsTrackingOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-[11px] shadow-xs transition"
          >
            <Navigation className="w-3 h-3 text-blue-600" />
            <span>Peta</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
