import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  Zap,
  Droplets,
  HeartPulse,
  Wifi,
  Tv,
  Wallet,
  CheckCircle2,
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

type PpobTab = 'pulsa' | 'data' | 'pln' | 'pdam' | 'bpjs' | 'ewallet';

export const PpobView: React.FC = () => {
  const { wallet, topUpWallet, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<PpobTab>('pulsa');
  const [phoneNumber, setPhoneNumber] = useState('0812-3456-7890');
  const [plnMeterNumber, setPlnMeterNumber] = useState('1423 5567 8901');
  const [pdamNumber, setPdamNumber] = useState('09876543');
  const [selectedDenom, setSelectedDenom] = useState<number>(25000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentPpob, setRecentPpob] = useState<Array<{ title: string; target: string; amount: number; time: string }>>([
    { title: 'Pulsa Telkomsel', target: '0812-3456-7890', amount: 25000, time: '3 hari lalu' },
    { title: 'Token Listrik PLN', target: '1423 5567 8901', amount: 50000, time: '1 minggu lalu' },
    { title: 'PDAM Tirta Jati Cirebon', target: '09876543', amount: 48500, time: 'Bulan lalu' }
  ]);

  const pulsaDenominations = [
    { nominal: 10000, price: 11000 },
    { nominal: 25000, price: 26000 },
    { nominal: 50000, price: 50500 },
    { nominal: 100000, price: 99500 }
  ];

  const dataPackages = [
    { name: 'Internet Max 10 GB (30 Hari)', price: 35000, desc: 'Kuota 24 Jam di semua jaringan 4G/5G' },
    { name: 'Internet OMG 25 GB (30 Hari)', price: 65000, desc: 'Termasuk kuota nonton YouTube, TikTok & Maxstream' },
    { name: 'Unlimited Arja Hebat (30 Hari)', price: 95000, desc: 'Akses tanpa batas semua aplikasi lokal' }
  ];

  const plnTokens = [
    { nominal: 20000, price: 22000 },
    { nominal: 50000, price: 52000 },
    { nominal: 100000, price: 102000 },
    { nominal: 200000, price: 202000 }
  ];

  const handlePayPpob = (title: string, amount: number, target: string) => {
    if (wallet.balance < amount) {
      showToast('Saldo MitraPay kurang, silakan isi saldo terlebih dahulu', 'error');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setRecentPpob((prev) => [{ title, target, amount, time: 'Baru saja' }, ...prev]);
      showToast(`Transaksi ${title} ke ${target} sebesar Rp ${amount.toLocaleString('id-ID')} Sukses!`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-teal-600" />
          <span>Pulsa & Tagihan PPOB Arjawinangun</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Isi pulsa, paket data, bayar tagihan listrik PLN, PDAM Tirta Jati Cirebon & BPJS instan
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[
          { id: 'pulsa', label: 'Pulsa', icon: Smartphone },
          { id: 'data', label: 'Paket Data', icon: Wifi },
          { id: 'pln', label: 'Listrik PLN', icon: Zap },
          { id: 'pdam', label: 'PDAM Cirebon', icon: Droplets },
          { id: 'bpjs', label: 'BPJS Kes', icon: HeartPulse },
          { id: 'ewallet', label: 'Topup E-Wallet', icon: Wallet }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PpobTab)}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-bold leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Form Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Pulsa Tab */}
        {activeTab === 'pulsa' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Nomor Handphone (Telkomsel / Indosat / XL / Tri)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  Telkomsel Arja
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
                Pilih Nominal Pulsa
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {pulsaDenominations.map((item) => (
                  <button
                    key={item.nominal}
                    onClick={() => setSelectedDenom(item.nominal)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedDenom === item.nominal
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 ring-2 ring-teal-500/20'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-750'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100 block">
                      Rp {item.nominal.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      Harga: <strong>Rp {item.price.toLocaleString('id-ID')}</strong>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePayPpob('Pulsa Reguler', selectedDenom + 1000, phoneNumber)}
              disabled={isProcessing}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? 'Memproses Pulsa...' : `Bayar Pulsa Rp ${selectedDenom.toLocaleString('id-ID')}`}
            </button>
          </div>
        )}

        {/* Data Tab */}
        {activeTab === 'data' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Nomor Tujuan Paket Data
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              {dataPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-3 hover:border-teal-500 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      {pkg.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      {pkg.desc}
                    </p>
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400 block mt-1">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePayPpob(pkg.name, pkg.price, phoneNumber)}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shrink-0 shadow-xs"
                  >
                    Beli Paket
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLN Tab */}
        {activeTab === 'pln' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Nomor Meter / ID Pelanggan PLN
              </label>
              <input
                type="text"
                value={plnMeterNumber}
                onChange={(e) => setPlnMeterNumber(e.target.value)}
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                ID Pelanggan: 142355678901 a/n AHMAD FAIZ (R1/900VA)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {plnTokens.map((item) => (
                <button
                  key={item.nominal}
                  onClick={() => setSelectedDenom(item.nominal)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedDenom === item.nominal
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 ring-2 ring-teal-500/20'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-750'
                  }`}
                >
                  <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100 block">
                    Token Rp {item.nominal.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Harga: <strong>Rp {item.price.toLocaleString('id-ID')}</strong>
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePayPpob('Token Listrik PLN', selectedDenom + 2000, plnMeterNumber)}
              disabled={isProcessing}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? 'Mengenerate Token 20 Digit...' : `Beli Token Listrik Rp ${selectedDenom.toLocaleString('id-ID')}`}
            </button>
          </div>
        )}

        {/* PDAM Tab */}
        {activeTab === 'pdam' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Wilayah PDAM: Tirta Jati Kabupaten Cirebon
              </label>
              <input
                type="text"
                value={pdamNumber}
                onChange={(e) => setPdamNumber(e.target.value)}
                placeholder="Masukkan Nomor Sambungan PDAM"
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-700 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Nama Pelanggan:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">Ahmad Faiz (Jungjang)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Tagihan Bulan Ini:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">Oktober 2026 (22 m³)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 dark:border-stone-700">
                <span className="font-bold text-stone-800 dark:text-stone-200">Total Tagihan:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Rp 48.500</span>
              </div>
            </div>

            <button
              onClick={() => handlePayPpob('Tagihan PDAM Tirta Jati Cirebon', 48500, pdamNumber)}
              disabled={isProcessing}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? 'Memproses Tagihan...' : 'Bayar Tagihan PDAM Rp 48.500'}
            </button>
          </div>
        )}

        {/* BPJS / E-Wallet tabs */}
        {(activeTab === 'bpjs' || activeTab === 'ewallet') && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                {activeTab === 'bpjs' ? 'Nomor Kartu BPJS Kesehatan (13 Digit)' : 'Pilih E-Wallet (GoPay, OVO, DANA, ShopeePay)'}
              </label>
              <input
                type="text"
                placeholder={activeTab === 'bpjs' ? '0001234567891' : '0812-3456-7890 (No HP Terdaftar)'}
                className="w-full p-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={() => handlePayPpob(activeTab.toUpperCase(), 50000, '0812-3456-7890')}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Lanjutkan Pembayaran Instan
            </button>
          </div>
        )}
      </div>

      {/* Transaction History & Favorite Numbers */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-xs space-y-3">
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Transaksi Terakhir & Nomor Favorit</span>
        </h3>
        <div className="divide-y divide-stone-100 dark:divide-stone-700/60">
          {recentPpob.map((rec, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-stone-800 dark:text-stone-100 block">
                  {rec.title}
                </span>
                <span className="text-[11px] text-stone-400">
                  {rec.target} • {rec.time}
                </span>
              </div>
              <span className="font-bold text-teal-600 dark:text-teal-400">
                Rp {rec.amount.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
