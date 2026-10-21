import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Code2, Database, Copy, Check, Layers, ShieldCheck, Terminal } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA, FLUTTER_CLEAN_ARCHITECTURE_TREE } from '../../data/blueprintData';

export const ArchitectureSchemaModal: React.FC = () => {
  const { isBlueprintModalOpen, setIsBlueprintModalOpen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'flutter' | 'rules'>('sql');
  const [copied, setCopied] = useState(false);

  if (!isBlueprintModalOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Teks blueprint berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col justify-between shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-xs">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                Enterprise Blueprint & Supabase Schema
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                24 PostgreSQL Tables • Flutter Clean Architecture • PostGIS Geospatial Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeTab === 'sql' ? SUPABASE_SQL_SCHEMA : FLUTTER_CLEAN_ARCHITECTURE_TREE)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Kode'}</span>
            </button>
            <button
              onClick={() => setIsBlueprintModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-4 pt-3 flex gap-2 border-b border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase PostgreSQL Schema (24 Tabel)</span>
          </button>

          <button
            onClick={() => setActiveTab('flutter')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'flutter'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flutter Clean Architecture Tree</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin & Platform Rules</span>
          </button>
        </div>

        {/* Code / Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-[11px] leading-relaxed text-slate-200">
          {activeTab === 'sql' && (
            <pre className="whitespace-pre overflow-x-auto text-emerald-400">
              <code>{SUPABASE_SQL_SCHEMA}</code>
            </pre>
          )}

          {activeTab === 'flutter' && (
            <pre className="whitespace-pre overflow-x-auto text-sky-400">
              <code>{FLUTTER_CLEAN_ARCHITECTURE_TREE}</code>
            </pre>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 text-slate-300 font-sans text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  1. Biaya Layanan Aplikasi (Platform Fee)
                </h4>
                <p className="text-slate-400">
                  Ditetapkan Rp 1.000 hingga Rp 2.500 per transaksi belanja pelanggan (Default konfigurasi sistem: Rp 1.500). Biaya ini dialokasikan untuk pemeliharaan server, keamanan transaksi dan operasional tim mediasi lokal.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  2. Komisi Pengantaran Driver (Delivery Commission)
                </h4>
                <p className="text-slate-400">
                  Komisi platform hanya 10% dari ongkos kirim. Driver independen berhak menerima 90% bersih dari tarif ongkos kirim secara instan ke dompet MitraPay.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  3. Standar Verifikasi Mitra (Merchant & Driver Enforcement)
                </h4>
                <p className="text-slate-400">
                  Hanya merchant yang telah melewati verifikasi izin usaha UMKM/SIPA (untuk apotek) yang dapat menerima pesanan. Hanya driver yang telah diverifikasi SIM & STNK kendaraan yang dapat menerima tugas pengantaran.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
