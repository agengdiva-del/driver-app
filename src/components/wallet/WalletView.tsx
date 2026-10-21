import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  QrCode,
  ArrowUpRight,
  Plus,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X,
  CreditCard,
  Building,
  Store
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const {
    wallet,
    walletTransactions,
    topUpWallet,
    transferWallet,
    showToast
  } = useApp();

  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(50000);
  const [transferPhone, setTransferPhone] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(20000);

  const tierInfo = {
    Bronze: { next: 'Silver', target: 500, current: wallet.points, perks: 'Diskon merchant 5%' },
    Silver: { next: 'Gold', target: 2000, current: wallet.points, perks: 'Gratis ongkir 2x/bulan, diskon 10%' },
    Gold: { next: 'Platinum', target: 5000, current: wallet.points, perks: 'Prioritas driver, diskon 15%, CS VIP' },
    Platinum: { next: 'Maksimal', target: 5000, current: 5000, perks: 'Bebas biaya platform seumur hidup & cashback 30%' }
  }[wallet.membershipLevel];

  const handleTopUpSubmit = (method: string) => {
    topUpWallet(topUpAmount, method);
    setIsTopUpModalOpen(false);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferPhone) {
      showToast('Masukkan nomor HP penerima', 'warning');
      return;
    }
    if (transferWallet(transferPhone, transferAmount)) {
      setIsTransferModalOpen(false);
      setTransferPhone('');
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-600" />
          <span>MitraPay AWD Dompet Digital</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Uang elektronik resmi AWD Arjawinangun untuk transaksi cepat, aman & banyak promo di Arjawinangun
        </p>
      </div>

      {/* Main Wallet Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-sky-900 text-white rounded-3xl p-5 shadow-xl border border-blue-400/40 relative overflow-hidden">
        <div className="absolute right-0 -bottom-10 w-44 h-44 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider block">
              Saldo Aktif MitraPay AWD
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Rp {wallet.balance.toLocaleString('id-ID')}
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold text-white border border-white/20">
            Level {wallet.membershipLevel}
          </span>
        </div>

        {/* Loyalty Points Strip */}
        <div className="mt-4 pt-3 border-t border-blue-500/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Award className="w-4 h-4" />
            <span>{wallet.points} Poin AWD</span>
          </div>
          <span className="text-[10px] text-sky-200">
            Setiap Rp 10.000 Transaksi = 1 Poin
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <button
            onClick={() => setIsTopUpModalOpen(true)}
            className="py-2.5 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Top Up</span>
          </button>

          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95"
          >
            <ArrowUpRight className="w-4 h-4 text-sky-300" />
            <span>Transfer</span>
          </button>

          <button
            onClick={() => {
              showToast('QRIS Pembayaran AWD MitraPay siap dipindai di kasir merchant', 'info');
            }}
            className="py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95"
          >
            <QrCode className="w-4 h-4 text-sky-300" />
            <span>Bayar QRIS</span>
          </button>
        </div>
      </div>

      {/* Loyalty & Tier Progress Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Level Keanggotaan: {wallet.membershipLevel}
          </span>
          <span className="text-stone-400 font-medium">
            {tierInfo.current} / {tierInfo.target} Poin Menuju {tierInfo.next}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-100 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, (tierInfo.current / tierInfo.target) * 100)}%` }}
          />
        </div>

        <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-center justify-between">
          <span>Keuntungan levelmu: <strong>{tierInfo.perks}</strong></span>
          <span className="font-bold text-amber-700 dark:text-amber-300">Tukar Poin →</span>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Riwayat Transaksi MitraPay
          </h3>
          <span className="text-[11px] text-stone-400">Realtime</span>
        </div>

        <div className="divide-y divide-stone-100 dark:divide-stone-700/60">
          {walletTransactions.map((tx) => {
            const isCredit = tx.amount > 0;
            return (
              <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">
                    {tx.title}
                  </h4>
                  <span className="text-[11px] text-stone-400">
                    {tx.referenceId} • {tx.timestamp}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-black text-xs sm:text-sm ${
                      isCredit
                        ? 'text-blue-600 dark:text-sky-400'
                        : 'text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {isCredit ? '+' : ''} Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] block font-semibold text-blue-600">
                    {tx.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Up Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs">
            <button
              onClick={() => setIsTopUpModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/aistudio/Designer_b056b7f0.png"
                alt="AWD"
                className="w-8 h-8 object-contain rounded-lg"
              />
              <div>
                <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 leading-tight">
                  Top Up Saldo MitraPay AWD
                </h3>
                <p className="text-stone-500 text-[11px]">
                  Pilih nominal dan metode transfer instan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[20000, 50000, 100000, 200000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTopUpAmount(amt)}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    topUpAmount === amt
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 ring-2 ring-blue-500/20'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Rp {amt.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <span className="font-bold text-stone-700 dark:text-stone-300 block">
                Metode Pembayaran Top Up
              </span>
              <button
                onClick={() => handleTopUpSubmit('QRIS Realtime')}
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span>QRIS Semua Bank & E-Wallet</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => handleTopUpSubmit('Virtual Account BCA')}
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>Virtual Account BCA / Mandiri / BRI</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => handleTopUpSubmit('Indomaret / Alfamart Arjawinangun')}
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100">
                  <Store className="w-4 h-4 text-red-500" />
                  <span>Alfamart / Indomaret Arjawinangun</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs">
            <button
              onClick={() => setIsTransferModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 mb-1">
              Transfer Saldo MitraPay AWD
            </h3>
            <p className="text-stone-500 mb-4">
              Kirim uang bebas biaya admin ke sesama pengguna AWD
            </p>

            <form onSubmit={handleTransferSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Nomor HP Penerima
                </label>
                <input
                  type="tel"
                  value={transferPhone}
                  onChange={(e) => setTransferPhone(e.target.value)}
                  placeholder="Contoh: 0819-8765-4321"
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Nominal Transfer (Rp)
                </label>
                <input
                  type="number"
                  min="5000"
                  max={wallet.balance}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(parseInt(e.target.value) || 0)}
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Sisa saldo: Rp {wallet.balance.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                Kirim Saldo Sekarang
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
