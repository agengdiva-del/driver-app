import React, { useState, useEffect } from 'react';
import { 
  Power, 
  MapPin, 
  Navigation, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  Bike, 
  Sparkles, 
  Bell, 
  AlertTriangle, 
  Star, 
  Wallet, 
  ArrowUpRight, 
  Compass, 
  User, 
  ShoppingBag, 
  ExternalLink, 
  Clock,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DriverOrderStep } from '../../types';

export const DriverPortalView: React.FC = () => {
  const {
    driverProfile,
    driverEarnings,
    isDriverOnline,
    toggleDriverOnline,
    driverActiveOrder,
    driverStep,
    advanceDriverStep,
    driverIncomingOrder,
    acceptIncomingDriverOrder,
    rejectIncomingDriverOrder,
    triggerSampleIncomingOrder,
    updateDriverStatus,
    setIsDriverRegistrationModalOpen,
    setIsChatOpen,
    setCurrentView,
    showToast
  } = useApp();

  const [countdown, setCountdown] = useState(30);

  // Countdown timer for incoming order offer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (driverIncomingOrder) {
      setCountdown(30);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            rejectIncomingDriverOrder();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [driverIncomingOrder]);

  const stepsList: DriverOrderStep[] = [
    'Menuju Merchant',
    'Pesanan Diambil',
    'Menuju Pelanggan',
    'Pesanan Selesai'
  ];

  const currentStepIndex = stepsList.indexOf(driverStep);
  const isApproved = driverProfile?.status === 'Disetujui';

  return (
    <div className="space-y-2.5 pb-16 text-xs text-slate-800 dark:text-slate-100 max-w-4xl mx-auto">
      
      {/* 1. WARNING BANNER IF ACCOUNT IS IN REVIEW OR REJECTED */}
      {!isApproved && (
        <div className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 shadow-2xs text-xs ${
          driverProfile?.status === 'Ditolak' 
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="truncate text-[11px]">
              {driverProfile?.status === 'Ditolak'
                ? (driverProfile?.rejectionReason || 'Pendaftaran pengemudi ditolak.')
                : 'Dokumen Anda sedang diverifikasi admin AWD Arjawinangun.'}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => setIsDriverRegistrationModalOpen(true)}
              className="px-2 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700"
            >
              Lihat Dokumen
            </button>
            <button
              onClick={() => updateDriverStatus('Disetujui')}
              className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
              title="Setujui akun untuk demo / testing"
            >
              Setujui Cepat
            </button>
          </div>
        </div>
      )}

      {/* 2. DRIVER STATUS & TODAY EARNINGS STRIP (COMPACT COCKPIT BAR) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-2xs border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        
        {/* Status Kerja */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 text-left">
          <div className={`w-3 h-3 rounded-full shrink-0 ${isDriverOnline && isApproved ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Status Kerja</span>
            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white truncate block">
              {isDriverOnline && isApproved ? 'Online - Standby' : 'Sedang Offline'}
            </span>
          </div>
        </div>

        {/* Pendapatan Hari Ini */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 text-left cursor-pointer" onClick={() => setCurrentView('wallet')}>
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Argo Hari Ini (90%)</span>
            <span className="font-black text-xs text-emerald-600 dark:text-emerald-400 font-mono truncate block">
              Rp {driverEarnings.todayEarnings.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Trip Selesai */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 text-left cursor-pointer" onClick={() => setCurrentView('history')}>
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Trip Selesai</span>
            <span className="font-black text-xs text-slate-900 dark:text-white font-mono truncate block">
              {driverEarnings.todayTrips} Trip
            </span>
          </div>
        </div>

        {/* Dompet Driver */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 text-left cursor-pointer" onClick={() => setCurrentView('wallet')}>
          <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 shrink-0">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Dompet Mitra</span>
            <span className="font-black text-xs text-slate-900 dark:text-white font-mono truncate block">
              Rp {driverEarnings.driverWalletBalance.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

      </div>

      {/* 3. INCOMING ORDER POP-UP ALERT (WITH 30s COUNTDOWN & 90% NET FEE) */}
      {driverIncomingOrder && (
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-0.5 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-3 space-y-2.5 text-slate-800 dark:text-white text-xs">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600">
                  <Bell className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-orange-600 block leading-none">
                    Tawaran Pengantaran Baru!
                  </span>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {driverIncomingOrder.orderNumber}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900">
                  ⏱ {countdown}s
                </span>
              </div>
            </div>

            {/* Route & Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-blue-600 dark:text-blue-400 text-[10px] uppercase">1. Ambil di Merchant:</div>
                <div className="font-bold text-xs truncate mt-0.5">{driverIncomingOrder.merchantName}</div>
                <div className="text-[10px] text-slate-400 truncate">{driverIncomingOrder.merchantAddress}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-black text-emerald-600 dark:text-emerald-400 text-[10px] uppercase">2. Antar ke Pelanggan:</div>
                <div className="font-bold text-xs truncate mt-0.5">{driverIncomingOrder.deliveryAddress.recipientName}</div>
                <div className="text-[10px] text-slate-400 truncate">{driverIncomingOrder.deliveryAddress.streetAddress}</div>
              </div>
            </div>

            {/* Menu Items Preview */}
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-[11px] flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Item: {driverIncomingOrder.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0 ml-2">
                Estimasi 18 Menit
              </span>
            </div>

            {/* 90% Net Driver Commission Banner & Decision Buttons */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between gap-3">
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-100 block leading-tight">
                  Komisi Bersih 90% Driver
                </span>
                <span className="text-lg font-black font-mono">
                  Rp {Math.round(driverIncomingOrder.deliveryFee * 0.9).toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={rejectIncomingDriverOrder}
                  className="py-1.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition"
                >
                  Tolak
                </button>
                <button
                  onClick={acceptIncomingDriverOrder}
                  className="py-1.5 px-4 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-black text-xs shadow-md transition transform active:scale-95"
                >
                  Terima Order
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. ACTIVE ORDER CONTROLLER (GPS ROUTING & 4-STEP DELIVERY) */}
      {driverActiveOrder ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-2xs border border-slate-200 dark:border-slate-800 space-y-3">
          
          {/* 4-STEP PROGRESS SLIDER */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-blue-600 dark:text-blue-400 font-black text-xs">
                  {driverActiveOrder.orderNumber}
                </span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  Komisi 90%: <strong>Rp {Math.round(driverActiveOrder.deliveryFee * 0.9).toLocaleString('id-ID')}</strong>
                </span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-black text-[10px] bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                Tahap {currentStepIndex + 1} dari 4
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {stepsList.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={step}
                    className={`p-1.5 rounded-xl text-center border transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 font-black shadow-2xs ring-2 ring-blue-400/30'
                        : isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-[9px] uppercase tracking-wide leading-none mb-0.5">
                      {isCompleted ? '✓ Selesai' : isCurrent ? '▶ Aktif' : `${idx + 1}`}
                    </div>
                    <div className="text-[10px] leading-tight truncate">
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DUAL-COLUMN COCKPIT (RESTO & CUSTOMER + GPS MAP CANVAS) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start">
            
            {/* Left Column: Merchant & Customer Cards */}
            <div className="md:col-span-6 space-y-2 text-xs">
              
              {/* Resto Merchant Box */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                driverStep === 'Menuju Merchant' || driverStep === 'Pesanan Diambil'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-extrabold uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    <span>1. AMBIL DI RESTO / MERCHANT</span>
                  </span>
                  <button
                    onClick={() => showToast('Menghubungi Merchant Resto via telepon...', 'info')}
                    className="p-1 rounded-md bg-white dark:bg-slate-700 text-blue-600 hover:bg-blue-50 transition border border-slate-200 dark:border-slate-600"
                    title="Telepon Resto"
                  >
                    <PhoneCall className="w-3 h-3" />
                  </button>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                  {driverActiveOrder.merchantName}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {driverActiveOrder.merchantAddress}
                </p>
                <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium mt-1">
                  Pesanan: {driverActiveOrder.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                </div>
              </div>

              {/* Customer Box */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                driverStep === 'Menuju Pelanggan' || driverStep === 'Pesanan Selesai'
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>2. ANTAR KE PELANGGAN</span>
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => showToast(`Telepon: ${driverActiveOrder.deliveryAddress.phone}`, 'info')}
                      className="p-1 rounded-md bg-white dark:bg-slate-700 text-emerald-600 hover:bg-emerald-50 border border-slate-200 dark:border-slate-600"
                      title="Telepon Pelanggan"
                    >
                      <PhoneCall className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="p-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      title="Chat Pelanggan"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                  {driverActiveOrder.deliveryAddress.recipientName}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {driverActiveOrder.deliveryAddress.streetAddress}, {driverActiveOrder.deliveryAddress.village}
                </p>
                {driverActiveOrder.deliveryAddress.notes && (
                  <p className="text-[9px] font-bold text-amber-700 dark:text-amber-400 mt-1 bg-amber-50 dark:bg-amber-950/40 p-1 rounded border border-amber-200 dark:border-amber-900 truncate">
                    Patokan: {driverActiveOrder.deliveryAddress.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Simulated GPS Map Canvas + Action Button */}
            <div className="md:col-span-6 space-y-2">
              
              {/* GPS Canvas */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-white relative h-36 sm:h-40 shadow-inner">
                {/* Radar Grid */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
                
                {/* Simulated GPS Path line */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 30 110 Q 110 30 200 80 T 320 40"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                </svg>

                {/* Resto Pin */}
                <div className="absolute left-6 bottom-4 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 border border-white flex items-center justify-center shadow-md">
                    <ShoppingBag className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[8px] font-bold bg-blue-900/80 px-1 rounded mt-0.5">Resto</span>
                </div>

                {/* Customer Pin */}
                <div className="absolute right-6 top-3 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 border border-white flex items-center justify-center shadow-md">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[8px] font-bold bg-emerald-900/80 px-1 rounded mt-0.5">Pelanggan</span>
                </div>

                {/* Driver Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg ring-2 ring-amber-400/30">
                    <Bike className="w-4 h-4 text-slate-950" />
                  </div>
                  <span className="text-[8px] font-black bg-amber-500 text-slate-950 px-1 rounded mt-0.5">Anda</span>
                </div>

                {/* Floating GPS Navigation Banner */}
                <div className="absolute top-2 left-2 right-2 bg-slate-950/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="font-bold text-white truncate">
                      {driverStep === 'Menuju Merchant' && 'Lurus 250m ke arah Jl. By Pass Jungjang'}
                      {driverStep === 'Pesanan Diambil' && 'Resto Berada di Kiri Jalan'}
                      {driverStep === 'Menuju Pelanggan' && 'Belok Kanan menuju Komplek Griya Arja'}
                      {driverStep === 'Pesanan Selesai' && 'Sampai di Alamat Pelanggan'}
                    </span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${driverActiveOrder.deliveryAddress.latitude},${driverActiveOrder.deliveryAddress.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300 font-bold shrink-0 text-[9px] flex items-center gap-0.5"
                  >
                    <span>G-Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* BIG STEP ADVANCE BUTTON */}
              <button
                onClick={advanceDriverStep}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="truncate">
                  {driverStep === 'Menuju Merchant' && 'Saya Sudah Tiba & Ambil Pesanan'}
                  {driverStep === 'Pesanan Diambil' && 'Pesanan Cocok, Antar ke Pelanggan'}
                  {driverStep === 'Menuju Pelanggan' && 'Selesaikan Pesanan & Terima 90%'}
                  {driverStep === 'Pesanan Selesai' && 'Pesanan Selesai!'}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* IDLE COCKPIT STATE (ONLINE WAITING VS OFFLINE) */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-2xs border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="relative w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-dashed border-blue-300 dark:border-blue-700">
            {isDriverOnline && isApproved ? (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-25" />
                <Bike className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </>
            ) : (
              <Bike className="w-8 h-8 text-slate-400" />
            )}
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              {isDriverOnline && isApproved ? 'Standby Menunggu Orderan Masuk...' : 'Driver Sedang Offline'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-0.5">
              {isDriverOnline && isApproved
                ? 'Sistem AWD otomatis mencarikan pesanan resto, mart, & kurir terdekat di Arjawinangun dan Cirebon Barat.'
                : 'Tekan tombol saklar ONLINE di header atas untuk mulai menerima tawaran pengantaran.'}
            </p>
          </div>

          {isDriverOnline && isApproved && (
            <div className="pt-1 flex items-center justify-center gap-2">
              <button
                onClick={triggerSampleIncomingOrder}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Simulasikan Pesanan Masuk Sekarang</span>
              </button>
            </div>
          )}

          {/* Quick driver tips */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-slate-500 dark:text-slate-400 text-left">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">💡 Komisi 90%</span>
              Hak pendapatan driver 90% otomatis cair ke dompet segera setelah pesanan beres.
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">⚡ Respon Cepat</span>
              Tawaran pesanan memiliki timer 30 detik. Segera klik Terima Order.
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">🛡️ Navigasi G-Maps</span>
              Gunakan tombol G-Maps pada rute untuk petunjuk arah langsung ke alamat pemesan.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
