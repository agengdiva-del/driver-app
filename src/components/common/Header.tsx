import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  ChevronDown,
  Bell,
  Wallet,
  Award,
  Sun,
  Moon,
  Smartphone,
  Maximize2,
  Code2,
  Search
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentAddress,
    addresses,
    setCurrentAddress,
    setIsAddressModalOpen,
    unreadNotifCount,
    setCurrentView,
    wallet,
    darkMode,
    toggleDarkMode,
    isDeviceFrame,
    toggleDeviceFrame,
    setIsBlueprintModalOpen,
    setSearchQuery
  } = useApp();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Brand & Utility Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3 text-xs">
        {/* Logo & Location Section */}
        <div className="flex items-center gap-2.5">
          {/* Official AWD Logo Image */}
          <div
            onClick={() => setCurrentView('home')}
            className="cursor-pointer group flex items-center gap-2"
            title="AWD - Arjawinangun Delivery By Wong Nangun"
          >
            <img
              src="/assets/aistudio/Designer_b056b7f0.png"
              alt="AWD Arjawinangun Delivery"
              className="w-10 h-10 object-contain drop-shadow-md rounded-full bg-blue-50 dark:bg-slate-800 p-0.5 border border-blue-400/40 group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block leading-tight">
              <span className="font-black text-sm bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent tracking-wider block">
                AWD
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-tight block">
                Arjawinangun Delivery
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-stone-200 dark:bg-stone-700 hidden sm:block" />

          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
              title="Ganti Alamat Pengantaran"
            >
              <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xs">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="truncate max-w-[140px] sm:max-w-[220px]">
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block tracking-wider leading-none">
                  Kirim ke • {currentAddress.label}
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 truncate block text-[12px] sm:text-[13px]">
                  {currentAddress.village}, {currentAddress.district}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            </button>

            {/* Location Dropdown Modal */}
            {isLocationDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLocationDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="font-bold text-stone-900 dark:text-stone-100">Pilih Alamat Antar</span>
                    <button
                      onClick={() => {
                        setIsLocationDropdownOpen(false);
                        setIsAddressModalOpen(true);
                      }}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      + Tambah
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {addresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => {
                          setCurrentAddress(addr);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                          currentAddress.id === addr.id
                            ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-500/30'
                            : 'hover:bg-stone-50 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <MapPin
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            currentAddress.id === addr.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-stone-400'
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                            {addr.label}
                            {addr.isDefault && (
                              <span className="text-[10px] bg-stone-200 dark:bg-stone-800 px-1.5 py-0.2 rounded font-normal text-stone-600 dark:text-stone-300">
                                Utama
                              </span>
                            )}
                          </div>
                          <p className="text-stone-500 dark:text-stone-400 text-[11px] truncate">
                            {addr.streetAddress}, {addr.village}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setIsLocationDropdownOpen(false);
                      setIsAddressModalOpen(true);
                    }}
                    className="w-full mt-2 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-xl font-medium text-center transition-colors"
                  >
                    Kelola Semua Alamat
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Controls & MitraPay Balance */}
        <div className="flex items-center gap-2">
          {/* MitraPay Quick Chip with Blue Gradient */}
          <button
            onClick={() => setCurrentView('wallet')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 dark:from-blue-950/60 dark:to-indigo-950/60 text-blue-700 dark:text-blue-300 border border-blue-500/30 hover:border-blue-500/60 transition-all font-semibold shadow-xs"
            title="Buka Dompet MitraPay"
          >
            <Wallet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[11px] font-bold">
              Rp {wallet.balance.toLocaleString('id-ID')}
            </span>
          </button>

          {/* Points Chip */}
          <button
            onClick={() => setCurrentView('wallet')}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold"
            title="Poin Loyalitas"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>{wallet.points} Poin</span>
          </button>

          {/* Architecture / Schema Export Modal Trigger */}
          <button
            onClick={() => setIsBlueprintModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-200 transition-colors"
            title="Lihat Supabase Schema & Flutter Architecture"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden md:inline">Blueprint</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 text-stone-500 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Shell Frame Toggle */}
          <button
            onClick={toggleDeviceFrame}
            className="hidden lg:flex p-1.5 text-stone-500 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            title={isDeviceFrame ? 'Mode Layar Penuh' : 'Mode HP (Mobile Device Frame)'}
          >
            {isDeviceFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4 text-blue-600" />}
          </button>

          {/* Notification Button */}
          <button
            onClick={() => setCurrentView('notifications')}
            className="relative p-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-stone-900 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Global Quick Search Bar */}
      <div className="max-w-6xl mx-auto px-4 pb-2.5">
        <div
          onClick={() => setCurrentView('search')}
          className="w-full bg-gradient-to-r from-blue-50/50 via-stone-50 to-sky-50/50 dark:from-stone-800/80 dark:to-stone-800/80 hover:border-blue-400/60 border border-blue-200/60 dark:border-stone-700/60 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 cursor-pointer transition-all shadow-xs"
        >
          <Search className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-normal truncate">
            Cari Empal Gentong, Nasi Jamblang, Obat, Sembako Jungjang...
          </span>
          <span className="ml-auto text-[11px] font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 rounded-lg shrink-0 shadow-xs">
            AWD Arjawinangun
          </span>
        </div>
      </div>
    </header>
  );
};
