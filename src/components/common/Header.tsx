import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Power,
  Wallet,
  Sun,
  Moon,
  Smartphone,
  Maximize2,
  Bell,
  Sparkles,
  Bike,
  Star,
  FileText
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    driverProfile,
    driverEarnings,
    isDriverOnline,
    toggleDriverOnline,
    triggerSampleIncomingOrder,
    driverActiveOrder,
    driverIncomingOrder,
    currentView,
    setCurrentView,
    darkMode,
    toggleDarkMode,
    isDeviceFrame,
    toggleDeviceFrame,
    setIsDriverRegistrationModalOpen,
    unreadNotifCount
  } = useApp();

  const isApproved = driverProfile?.status === 'Disetujui';

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 text-white shadow-xs shrink-0">
      <div className="max-w-6xl mx-auto px-2.5 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-xs">
        
        {/* Brand & Driver Identity */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            onClick={() => setCurrentView('cockpit')}
            className="cursor-pointer group flex items-center gap-2"
            title="AWD Driver Cockpit"
          >
            <div className="w-8 h-8 rounded-xl bg-white p-0.5 shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/Designer_b056b7f0.png"
                alt="AWD Driver"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs sm:text-sm text-white tracking-wide">
                  AWD DRIVER
                </span>
                <span className="text-[9px] font-black bg-amber-400 text-blue-950 px-1 rounded-full uppercase leading-none py-0.5">
                  Wong Dewek
                </span>
              </div>
              <p className="text-[10px] text-blue-100 flex items-center gap-1">
                <span className="font-semibold">{driverProfile?.fullName?.split(' ')[0] || 'Asep'}</span>
                <span>•</span>
                <span className="font-mono text-amber-300 font-bold flex items-center">
                  <Star className="w-2.5 h-2.5 fill-amber-300 inline mr-0.5" />
                  {driverProfile?.rating || 4.95}
                </span>
                <span>•</span>
                <span className="text-[9px] bg-white/20 px-1 rounded text-white font-mono">
                  {driverProfile?.vehiclePlate || 'E 4521 AR'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Online/Offline Switch & Quick Test Order */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Online Toggle */}
          <button
            onClick={toggleDriverOnline}
            disabled={!isApproved}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-extrabold text-[11px] sm:text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              !isApproved
                ? 'bg-white/20 text-blue-200 cursor-not-allowed opacity-70'
                : isDriverOnline
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/30 ring-2 ring-emerald-300/60'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
            title={!isApproved ? 'Menunggu verifikasi admin' : isDriverOnline ? 'Klik untuk Offline' : 'Klik untuk Online'}
          >
            <div className={`w-2 h-2 rounded-full ${isDriverOnline && isApproved ? 'bg-slate-950 animate-ping' : 'bg-white/60'}`} />
            <Power className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-black tracking-wide">
              {isDriverOnline && isApproved ? 'ONLINE' : 'OFFLINE'}
            </span>
          </button>

          {/* Quick Order Test Simulator Button */}
          {isDriverOnline && isApproved && !driverActiveOrder && !driverIncomingOrder && (
            <button
              onClick={triggerSampleIncomingOrder}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-[10px] sm:text-[11px] shadow-xs flex items-center gap-1 transition animate-bounce"
              title="Kirim Pesanan Uji Coba dari Pelanggan"
            >
              <Sparkles className="w-3 h-3 text-blue-950" />
              <span>+ Order Masuk</span>
            </button>
          )}
        </div>

        {/* Right side: Wallet, Status, Tools */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Driver Wallet Pill */}
          <button
            onClick={() => setCurrentView('wallet')}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 px-2 py-1 rounded-xl transition text-left"
            title="Buka Dompet Mitra AWD"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <div className="leading-tight">
              <span className="text-[8px] font-bold text-blue-100 uppercase block">
                Dompet (90%)
              </span>
              <span className="font-black text-[11px] text-white font-mono">
                Rp {driverEarnings.driverWalletBalance.toLocaleString('id-ID')}
              </span>
            </div>
          </button>

          {/* Registration / Account Status Indicator */}
          <button
            onClick={() => setIsDriverRegistrationModalOpen(true)}
            className={`p-1.5 rounded-xl transition text-[10px] font-bold flex items-center gap-1 ${
              isApproved
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-amber-400 text-blue-950'
            }`}
            title="Kelengkapan Dokumen & Status Kemitraan"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{driverProfile?.status || 'Status'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-100" />}
          </button>

          {/* Smartphone Frame Toggle */}
          <button
            onClick={toggleDeviceFrame}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:block"
            title={isDeviceFrame ? 'Mode Layar Penuh' : 'Mode Smartphone Driver'}
          >
            {isDeviceFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
