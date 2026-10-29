import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Bike,
  FileText,
  CreditCard,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Headphones,
  Edit,
  Car,
  MapPin,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { DriverVerificationStatus } from '../../types';

export const DriverProfileView: React.FC = () => {
  const {
    driverProfile,
    driverEarnings,
    updateDriverStatus,
    setIsDriverRegistrationModalOpen,
    showToast,
    setCurrentView
  } = useApp();

  const isApproved = driverProfile?.status === 'Disetujui';

  return (
    <div className="space-y-2.5 pb-16 text-xs text-slate-800 dark:text-slate-100 max-w-4xl mx-auto">
      
      {/* 1. DRIVER PROFILE HEADER CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={driverProfile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                alt={driverProfile?.fullName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
              />
              <span className={`absolute -bottom-1 -right-1 p-0.5 rounded-full ${
                isApproved ? 'bg-emerald-500' : 'bg-amber-500'
              } text-white ring-2 ring-white dark:ring-slate-900`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {driverProfile?.fullName || 'Kang Asep Kurniawan'}
                </h2>
                <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                  driverProfile?.status === 'Disetujui'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                    : driverProfile?.status === 'Ditolak'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                }`}>
                  {driverProfile?.status || 'Menunggu Verifikasi'}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {driverProfile?.phone || '0813-8822-4411'} • {driverProfile?.village || 'Jungjang'}, Arjawinangun
              </p>

              <div className="flex items-center gap-2 mt-1 text-[10px]">
                <span className="font-bold text-amber-500 flex items-center gap-0.5">
                  ★ {driverProfile?.rating || 4.95} Rating
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">
                  {driverEarnings.totalTrips} Trip Selesai
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  Mitra Prioritas AWD
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDriverRegistrationModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-[11px] border border-blue-200 dark:border-blue-800 flex items-center gap-1 transition"
          >
            <Edit className="w-3 h-3" />
            <span>Edit Data</span>
          </button>
        </div>

        {/* Status Simulator for QA / Demo Testing */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-[10px]">
          <span className="font-bold text-slate-600 dark:text-slate-300 shrink-0">
            Simulasi Status Akun:
          </span>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => updateDriverStatus('Disetujui')}
              className={`px-2 py-0.5 rounded-lg font-bold transition ${
                driverProfile?.status === 'Disetujui'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              ✓ Disetujui
            </button>
            <button
              onClick={() => updateDriverStatus('Menunggu Verifikasi')}
              className={`px-2 py-0.5 rounded-lg font-bold transition ${
                driverProfile?.status === 'Menunggu Verifikasi'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              ⏳ Review
            </button>
            <button
              onClick={() => updateDriverStatus('Ditolak', 'Foto STNK & SIM tidak memenuhi syarat resolusi.')}
              className={`px-2 py-0.5 rounded-lg font-bold transition ${
                driverProfile?.status === 'Ditolak'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              ✕ Tolak
            </button>
          </div>
        </div>
      </div>

      {/* 2. DATA KENDARAAN (MOTOR / MOBIL) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            {driverProfile?.vehicleType === 'Mobil' ? (
              <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Bike className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
            <h3 className="font-extrabold text-xs">Data Kendaraan Pengantaran</h3>
          </div>
          <span className="font-mono font-black text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
            {driverProfile?.vehiclePlate || 'E 4521 AR'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="space-y-1">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/40">
              <span className="text-slate-400">Jenis Kendaraan:</span>
              <span className="font-bold">{driverProfile?.vehicleType || 'Motor'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/40">
              <span className="text-slate-400">Merek & Tipe:</span>
              <span className="font-bold">{driverProfile?.vehicleBrandModel || 'Honda Vario 160cc CBS'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Warna Kendaraan:</span>
              <span className="font-bold">{driverProfile?.vehicleColor || 'Biru Metalik AWD'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <img
              src={driverProfile?.vehiclePhoto || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80'}
              alt="Foto Kendaraan"
              className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-300 dark:border-slate-600"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 block truncate">
                Foto Unit Kendaraan
              </span>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> Fisik Terverifikasi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOKUMEN IDENTITAS & KELENGKAPAN (KTP, SIM, STNK) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-xs">Kelengkapan Dokumen Mitra Driver</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-600">3 dari 3 Dokumen Lengkap</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          {/* KTP */}
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
            <img
              src={driverProfile?.ktpPhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80'}
              alt="KTP"
              className="w-full h-12 rounded object-cover mx-auto opacity-90"
            />
            <span className="font-bold block text-slate-700 dark:text-slate-200 truncate">KTP Asli</span>
            <span className="text-[9px] text-emerald-600 font-bold block">✓ Terverifikasi</span>
          </div>

          {/* SIM */}
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
            <img
              src={driverProfile?.simPhoto || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&auto=format&fit=crop&q=80'}
              alt="SIM"
              className="w-full h-12 rounded object-cover mx-auto opacity-90"
            />
            <span className="font-bold block text-slate-700 dark:text-slate-200 truncate">SIM C Aktif</span>
            <span className="text-[9px] text-emerald-600 font-bold block">✓ Terverifikasi</span>
          </div>

          {/* STNK */}
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
            <img
              src={driverProfile?.stnkPhoto || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=300&auto=format&fit=crop&q=80'}
              alt="STNK"
              className="w-full h-12 rounded object-cover mx-auto opacity-90"
            />
            <span className="font-bold block text-slate-700 dark:text-slate-200 truncate">STNK Kendaraan</span>
            <span className="text-[9px] text-emerald-600 font-bold block">✓ Pajak Hidup</span>
          </div>
        </div>
      </div>

      {/* 4. KONTAK DARURAT & PERSYARATAN */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2 text-[11px]">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-xs">Kontak Darurat & Keamanan</h3>
          </div>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-800/40">
          <span className="text-slate-400">Nama Kontak Darurat:</span>
          <span className="font-bold">{driverProfile?.emergencyContactName || 'Ibu Siti Khodijah (Istri)'}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-800/40">
          <span className="text-slate-400">Nomor Telepon Darurat:</span>
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
            {driverProfile?.emergencyContactPhone || '0819-2233-4455'}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-slate-400">Persetujuan Syarat & Ketentuan AWD:</span>
          <span className="text-emerald-600 font-bold">✓ Disetujui saat pendaftaran</span>
        </div>
      </div>

      {/* 5. HOTLINE TIM KOORDINATOR LAPANGAN ARJAWINANGUN */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/10 text-white">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-200 block leading-tight">
              Satgas Driver AWD Arjawinangun
            </span>
            <p className="text-[11px] font-bold">
              Kendala di jalan Pantura atau resto? Hubungi Posko Satgas
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Menghubungi Posko Satgas AWD Arjawinangun via WhatsApp...', 'success')}
          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] shadow-sm shrink-0 flex items-center gap-1"
        >
          <PhoneCall className="w-3 h-3" />
          <span>Posko Satgas</span>
        </button>
      </div>

    </div>
  );
};
