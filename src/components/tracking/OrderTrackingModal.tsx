import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Bike,
  Phone,
  MessageSquare,
  Navigation,
  Clock,
  CheckCircle2,
  MapPin,
  Store,
  ChevronRight,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    activeOrder,
    setIsChatOpen,
    simulateNextOrderStatus,
    cancelActiveOrder,
    driverPosition,
    showToast
  } = useApp();

  const [etaMinutes, setEtaMinutes] = useState(6);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    if (!activeOrder) return;
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 25000);
    return () => clearInterval(interval);
  }, [activeOrder]);

  if (!isTrackingOpen || !activeOrder) return null;

  const stages: Array<{ id: OrderStatus; label: string; desc: string }> = [
    { id: 'pending', label: 'Pesanan Dibuat', desc: 'Menunggu konfirmasi merchant' },
    { id: 'merchant_accepted', label: 'Merchant Menerima', desc: 'Resto menerima & menyiapkan pesanan' },
    { id: 'driver_assigned', label: 'Driver Menuju Resto', desc: 'Kang Asep meluncur ke resto' },
    { id: 'preparing', label: 'Sedang Disiapkan', desc: 'Pesanan sedang dikemas higienis' },
    { id: 'picked_up', label: 'Pesanan Diambil', desc: 'Driver mengambil pesanan' },
    { id: 'on_delivery', label: 'Dalam Perjalanan', desc: 'Driver menuju alamat pengiriman' },
    { id: 'delivered', label: 'Pesanan Tiba', desc: 'Driver sampai di depan rumah/pagar' },
    { id: 'completed', label: 'Selesai', desc: 'Pesanan selesai dinikmati' }
  ];

  const currentStageIndex = stages.findIndex((s) => s.id === activeOrder.orderStatus);

  const handleCallDriver = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      showToast(`Tersambung dengan telepon driver ${activeOrder.driver?.name} (${activeOrder.driver?.phone})`, 'info');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full max-h-[94vh] flex flex-col justify-between shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Live GPS Tracking • Arjawinangun
            </span>
            <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <span>{activeOrder.orderNumber}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xs">
                {activeOrder.orderStatus.replace('_', ' ').toUpperCase()}
              </span>
            </h2>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Interactive GPS Road Map Graphic (Arjawinangun Road Network) */}
          <div className="relative h-56 sm:h-64 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center">
            {/* SVG Interactive Map Canvas */}
            <svg
              className="w-full h-full"
              viewBox="0 0 500 280"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Map Grids */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>

              <rect width="500" height="280" fill="#0f172a" />
              <rect width="500" height="280" fill="url(#grid)" />

              {/* Arjawinangun Main Roads */}
              {/* By Pass Arjawinangun */}
              <line x1="20" y1="220" x2="480" y2="80" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
              <line x1="20" y1="220" x2="480" y2="80" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6,6" opacity="0.4" />
              <text x="320" y="115" fill="#64748b" fontSize="9" fontWeight="bold">Jl. Raya By Pass Arjawinangun</text>

              {/* Jl. Ki Bagus Rangin */}
              <path d="M 120 40 Q 220 120 380 230" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <text x="140" y="90" fill="#64748b" fontSize="8" fontWeight="bold">Jl. Ki Bagus Rangin (Jungjang)</text>

              {/* Jl. Pasar Gaya / Tegalgubug */}
              <line x1="260" y1="20" x2="260" y2="260" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              <text x="268" y="50" fill="#64748b" fontSize="8">Arah Tegalgubug</text>

              {/* Active Delivery Route Polyline */}
              <path
                d="M 90 190 Q 220 140 370 70"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="8,4"
                className="animate-pulse"
              />

              {/* Point A: Merchant (Empal Gentong) */}
              <g transform="translate(90, 190)">
                <circle r="14" fill="#065f46" opacity="0.5" className="animate-ping" />
                <circle r="10" fill="#10b981" />
                <text x="16" y="4" fill="#ecfdf5" fontSize="10" fontWeight="bold">
                  Resto (H. Apud)
                </text>
              </g>

              {/* Point B: Customer House (Jungjang) */}
              <g transform="translate(370, 70)">
                <circle r="12" fill="#b45309" opacity="0.4" className="animate-ping" />
                <circle r="10" fill="#f59e0b" />
                <text x="16" y="4" fill="#fffbeb" fontSize="10" fontWeight="bold">
                  Rumahmu (Jungjang)
                </text>
              </g>

              {/* Moving Driver Motorcycle Position */}
              <g transform={`translate(${180 + (currentStageIndex * 22)}, ${155 - (currentStageIndex * 12)})`}>
                <circle r="16" fill="#10b981" opacity="0.3" className="animate-ping" />
                <circle r="12" fill="#047857" stroke="#ffffff" strokeWidth="2" />
                <circle r="5" fill="#34d399" />
                <text x="-30" y="-18" fill="#ffffff" fontSize="9" fontWeight="extrabold" className="bg-black">
                  🛵 Kang Asep ({activeOrder.driver?.vehiclePlate})
                </text>
              </g>
            </svg>

            {/* Floating Live Badge */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl border border-white/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-bold text-[11px]">Estimasi Tiba: {etaMinutes} Menit</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-xl border border-white/10 text-[10px]">
              GPS: {driverPosition.lat.toFixed(4)}, {driverPosition.lng.toFixed(4)}
            </div>
          </div>

          {/* Driver Contact & Vehicle Info Card */}
          {activeOrder.driver && (
            <div className="p-3.5 rounded-3xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={activeOrder.driver.avatar}
                  alt={activeOrder.driver.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                      {activeOrder.driver.name}
                    </h4>
                    <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                      ★ {activeOrder.driver.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {activeOrder.driver.vehicleModel} • <strong className="text-stone-700 dark:text-stone-200">{activeOrder.driver.vehiclePlate}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCallDriver}
                  className="p-2.5 rounded-2xl bg-stone-100 dark:bg-stone-700 hover:bg-blue-50 text-stone-700 dark:text-stone-200 hover:text-blue-600 transition-colors"
                  title="Telepon Driver"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Driver</span>
                </button>
              </div>
            </div>
          )}

          {/* Step-by-Step Delivery Timeline */}
          <div className="p-4 rounded-3xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Status Perjalanan Pesanan
              </span>
              <button
                onClick={simulateNextOrderStatus}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] shadow-xs transition-colors"
                title="Lanjutkan ke tahap pesanan berikutnya"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Simulasi Lanjut ({currentStageIndex + 1}/{stages.length})</span>
              </button>
            </div>

            <div className="relative pl-6 space-y-4">
              {/* Vertical timeline line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-stone-200 dark:bg-stone-700" />

              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stage.id} className="relative flex items-start gap-3">
                    <span
                      className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-4 ring-blue-100 dark:ring-blue-950'
                          : isPassed
                          ? 'bg-blue-500 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </span>
                    <div>
                      <h5
                        className={`text-xs font-bold leading-tight ${
                          isCurrent
                            ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                            : isPassed
                            ? 'text-stone-800 dark:text-stone-200'
                            : 'text-stone-400'
                        }`}
                      >
                        {stage.label}
                      </h5>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ordered items breakdown in this order */}
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2">
            <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
              Item yang Diantar ({activeOrder.items.length})
            </span>
            <div className="divide-y divide-stone-200 dark:divide-stone-700/60">
              {activeOrder.items.map((item, i) => (
                <div key={i} className="py-1.5 flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    Rp {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between font-black text-xs text-stone-900 dark:text-stone-100">
              <span>Total Biaya (Termasuk Ongkir & Biaya Layanan)</span>
              <span className="text-blue-600 dark:text-sky-400">
                Rp {activeOrder.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 bg-white dark:bg-stone-900">
          <button
            onClick={cancelActiveOrder}
            className="text-xs font-bold text-rose-500 hover:underline"
          >
            Batalkan Pesanan
          </button>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="px-5 py-2.5 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-extrabold text-xs shadow-md"
          >
            Tutup Pelacakan
          </button>
        </div>
      </div>
    </div>
  );
};
