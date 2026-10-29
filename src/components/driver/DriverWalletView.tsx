import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Percent,
  CheckCircle2,
  Clock,
  Building2,
  Smartphone,
  Info,
  Calendar,
  Sparkles,
  ArrowDownLeft
} from 'lucide-react';

export const DriverWalletView: React.FC = () => {
  const {
    driverEarnings,
    withdrawDriverEarnings,
    showToast,
    driverProfile
  } = useApp();

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(100000);
  const [targetAccount, setTargetAccount] = useState(driverProfile?.bankAccountOrEwallet || 'BCA - 0128392101 (a.n Asep Kurniawan)');
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month'>('today');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawDriverEarnings(withdrawAmount)) {
      setWithdrawModalOpen(false);
    }
  };

  const presetAmounts = [50000, 100000, 200000, driverEarnings.driverWalletBalance];

  const mockDriverTransactions = [
    {
      id: 'dt-01',
      title: 'Komisi Pengantaran Empal Gentong',
      orderId: 'AWD-FOOD-9214',
      type: 'income',
      amount: 10800,
      grossDeliveryFee: 12000,
      platformFee: 1200,
      time: 'Hari ini, 13:45',
      status: 'Selesai'
    },
    {
      id: 'dt-02',
      title: 'Komisi Pengantaran Martabak Arja',
      orderId: 'AWD-FOOD-8812',
      type: 'income',
      amount: 9000,
      grossDeliveryFee: 10000,
      platformFee: 1000,
      time: 'Hari ini, 11:20',
      status: 'Selesai'
    },
    {
      id: 'dt-03',
      title: 'Penarikan Dana ke Rekening BCA',
      orderId: 'WD-AWD-0921',
      type: 'withdraw',
      amount: -150000,
      grossDeliveryFee: 0,
      platformFee: 0,
      time: 'Kemarin, 21:10',
      status: 'Berhasil'
    },
    {
      id: 'dt-04',
      title: 'Bonus Insentif Target Siang Pantura',
      orderId: 'BONUS-AWD-44',
      type: 'bonus',
      amount: 25000,
      grossDeliveryFee: 25000,
      platformFee: 0,
      time: 'Kemarin, 14:00',
      status: 'Selesai'
    },
    {
      id: 'dt-05',
      title: 'Komisi Pengantaran Pasar Sandang Tegalgubug',
      orderId: 'AWD-MART-7731',
      type: 'income',
      amount: 14400,
      grossDeliveryFee: 16000,
      platformFee: 1600,
      time: '2 hari lalu',
      status: 'Selesai'
    }
  ];

  return (
    <div className="space-y-2.5 pb-16 text-xs text-slate-800 dark:text-slate-100 max-w-4xl mx-auto">
      
      {/* 1. HERO BALANCE CARD WITH 90% COMMISSION HIGHLIGHT */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        {/* Subtle background circle decoration */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
          <Wallet className="w-24 h-24 text-white" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs">
                <Wallet className="w-4 h-4 text-white" />
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold text-blue-100 tracking-wider">
                  Dompet Mitra AWD (Arjawinangun)
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black bg-amber-400 text-blue-950 px-1.5 py-0.2 rounded-full uppercase">
                    Bagi Hasil 90%
                  </span>
                  <span className="text-[10px] text-blue-200">
                    Platform hanya 10%
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-3 py-1.5 bg-white text-blue-900 hover:bg-blue-50 font-black rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <span>Tarik Saldo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <span className="text-[11px] text-blue-100 block">Saldo Siap Ditarik</span>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
              Rp {driverEarnings.driverWalletBalance.toLocaleString('id-ID')}
            </div>
          </div>

          {/* Quick stats in card footer */}
          <div className="pt-2.5 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="bg-white/10 rounded-xl p-1.5 backdrop-blur-xs">
              <span className="text-blue-200 block text-[9px]">Hari Ini</span>
              <strong className="font-mono text-xs font-bold text-white">
                Rp {driverEarnings.todayEarnings.toLocaleString('id-ID')}
              </strong>
            </div>
            <div className="bg-white/10 rounded-xl p-1.5 backdrop-blur-xs">
              <span className="text-blue-200 block text-[9px]">Trip Selesai</span>
              <strong className="font-mono text-xs font-bold text-white">
                {driverEarnings.todayTrips} Trip
              </strong>
            </div>
            <div className="bg-white/10 rounded-xl p-1.5 backdrop-blur-xs">
              <span className="text-blue-200 block text-[9px]">Total Pendapatan</span>
              <strong className="font-mono text-xs font-bold text-emerald-300">
                Rp {driverEarnings.totalEarnings.toLocaleString('id-ID')}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRANSPARANSI BAGI HASIL AWD (90% DRIVER : 10% PLATFORM) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-extrabold text-xs">Transparansi Skema Komisi AWD</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
            Adil & Pro-Driver
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">Hak Bersih Driver</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">90%</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Contoh argo Rp 10.000, driver langsung menerima <strong>Rp 9.000</strong> bersih ke dompet.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300">Biaya Platform AWD</span>
              <span className="text-sm font-black text-slate-600 dark:text-slate-400 font-mono">10%</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Digunakan untuk server, peta GPS real-time, dan tim koordinator lapangan Arjawinangun.
            </p>
          </div>
        </div>
      </div>

      {/* 3. REKENING PENCAIRAN AKTIF */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-tight">
              Rekening & E-Wallet Penarikan
            </span>
            <span className="font-bold text-xs text-slate-900 dark:text-white">
              {driverProfile?.bankAccountOrEwallet || 'BCA - 0128392101 (a.n Asep Kurniawan)'}
            </span>
          </div>
        </div>

        <button
          onClick={() => showToast('Untuk mengubah rekening, silakan edit di formulir profil mitra.', 'info')}
          className="text-blue-600 dark:text-blue-400 font-bold text-[11px] hover:underline shrink-0"
        >
          Ubah
        </button>
      </div>

      {/* 4. RIWAYAT MUTASI DOMPET DRIVER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <span className="font-extrabold text-xs">Riwayat Transaksi Dompet</span>
          <span className="text-[10px] text-slate-400 font-medium">Mutasi Terakhir</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mockDriverTransactions.map((tx) => (
            <div key={tx.id} className="py-2 flex items-center justify-between gap-2 first:pt-1 last:pb-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  tx.type === 'withdraw'
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                    : tx.type === 'bonus'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {tx.type === 'withdraw' ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : tx.type === 'bonus' ? (
                    <Sparkles className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-[11px] truncate text-slate-900 dark:text-slate-100">
                    {tx.title}
                  </p>
                  <p className="text-[9px] text-slate-400 flex items-center gap-1.5">
                    <span>{tx.time}</span>
                    <span>•</span>
                    <span className="font-mono">{tx.orderId}</span>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`font-black font-mono text-xs ${
                  tx.type === 'withdraw'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {tx.amount > 0 ? `+Rp ${tx.amount.toLocaleString('id-ID')}` : `-Rp ${Math.abs(tx.amount).toLocaleString('id-ID')}`}
                </span>
                <span className="text-[9px] block text-slate-400 font-medium">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WITHDRAW MODAL */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tarik Saldo Dompet AWD</h3>
              </div>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Pilih Rekening Tujuan
                </label>
                <select
                  value={targetAccount}
                  onChange={(e) => setTargetAccount(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="BCA - 0128392101 (a.n Asep Kurniawan)">BCA - 0128392101 (a.n Asep Kurniawan)</option>
                  <option value="BRI - 38291029381 (a.n Asep Kurniawan)">BRI - 38291029381 (a.n Asep Kurniawan)</option>
                  <option value="DANA - 081388224411 (a.n Asep K)">DANA - 0813-8822-4411 (a.n Asep K)</option>
                  <option value="GoPay - 081388224411 (a.n Asep K)">GoPay - 0813-8822-4411 (a.n Asep K)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Nominal Penarikan (Rp)
                </label>
                <input
                  type="number"
                  min={10000}
                  max={driverEarnings.driverWalletBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full text-sm font-bold font-mono p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Maksimal saldo: Rp {driverEarnings.driverWalletBalance.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setWithdrawAmount(amt)}
                    className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 text-[10px] font-bold font-mono transition text-slate-700 dark:text-slate-300"
                  >
                    {amt === driverEarnings.driverWalletBalance ? 'Semua' : `${amt / 1000}rb`}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md"
                >
                  Konfirmasi Tarik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
