import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Camera, CheckCircle2, UploadCloud, AlertCircle } from 'lucide-react';

export const KycModal: React.FC = () => {
  const { isKycModalOpen, setIsKycModalOpen, currentUser, submitKyc, showToast } = useApp();

  const [ktpName, setKtpName] = useState(currentUser?.fullName || '');
  const [nikNumber, setNikNumber] = useState('3209141910950002');
  const [ktpPhoto, setKtpPhoto] = useState<string | null>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isKycModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ktpPhoto || !selfiePhoto) {
      showToast('Harap lampirkan foto KTP dan foto selfie wajah', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitKyc(ktpName, ktpPhoto);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs space-y-4">
        <button
          onClick={() => setIsKycModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-md shrink-0">
            <img
              src="/assets/aistudio/Designer_b056b7f0.png"
              alt="AWD"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
              Verifikasi Identitas Resmi (KYC) AWD
            </h3>
            <p className="text-stone-500 text-[11px]">
              Buka limit saldo MitraPay hingga Rp 20.000.000 & nikmati promo eksklusif
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Nama Lengkap Sesuai e-KTP
            </label>
            <input
              type="text"
              value={ktpName}
              onChange={(e) => setKtpName(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Nomor Induk Kependudukan (NIK 16 Digit)
            </label>
            <input
              type="text"
              value={nikNumber}
              onChange={(e) => setNikNumber(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono font-bold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload KTP */}
          <div>
            <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
              1. Foto e-KTP Asli
            </label>
            <div
              onClick={() =>
                setKtpPhoto('https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80')
              }
              className="border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-2xl p-3 text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors"
            >
              {ktpPhoto ? (
                <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Foto e-KTP Terunggah</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-stone-500">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <span>Klik untuk foto e-KTP</span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Selfie */}
          <div>
            <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
              2. Foto Selfie Wajah dengan e-KTP
            </label>
            <div
              onClick={() =>
                setSelfiePhoto('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80')
              }
              className="border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-2xl p-3 text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors"
            >
              {selfiePhoto ? (
                <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Foto Selfie Terunggah</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-stone-500">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <span>Klik untuk foto selfie memegang KTP</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Memproses Verifikasi AI & Dukcapil...' : 'Ajukan Verifikasi Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};
