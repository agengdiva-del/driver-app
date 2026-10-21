import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Pill,
  UploadCloud,
  FileText,
  ShieldCheck,
  AlertCircle,
  Plus,
  CheckCircle2,
  Stethoscope,
  X
} from 'lucide-react';
import { Product } from '../../types';

export const PharmacyView: React.FC = () => {
  const { products, addToCart, showToast } = useApp();
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [isSubmittingRx, setIsSubmittingRx] = useState(false);
  const [rxVerified, setRxVerified] = useState(false);

  const pharmacyProducts = products.filter((p) => p.serviceType === 'pharmacy');

  const handleUploadRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prescriptionImage && !patientName) {
      showToast('Harap isi nama pasien dan lampirkan resep dokter', 'warning');
      return;
    }
    setIsSubmittingRx(true);
    setTimeout(() => {
      setIsSubmittingRx(false);
      setRxVerified(true);
      showToast('Resep dokter berhasil diverifikasi oleh Apoteker Kimia Farma!', 'success');
      setIsPrescriptionModalOpen(false);
    }, 1500);
  };

  const handleAddToCartChecked = (product: Product) => {
    if (product.requiresPrescription && !rxVerified) {
      showToast('Produk ini obat keras. Wajib upload resep dokter terlebih dahulu!', 'warning');
      setIsPrescriptionModalOpen(true);
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Pill className="w-5 h-5 text-rose-500" />
          <span>ArjaMed Apotek & Kesehatan 24 Jam</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Obat asli, suplemen, dan alat kesehatan resmi dengan pengawasan apoteker berlisensi SIPA
        </p>
      </div>

      {/* Prescription Upload Card */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white p-4 sm:p-5 rounded-3xl shadow-lg border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.2 bg-white/20 rounded-full text-[10px] font-bold">
                Layanan Resep Dokter
              </span>
              {rxVerified && (
                <span className="px-2 py-0.2 bg-emerald-500 text-white rounded-full text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Resep Terverifikasi
                </span>
              )}
            </div>
            <h3 className="font-extrabold text-sm sm:text-base mt-1">
              Punya Resep dari Dokter / Puskesmas?
            </h3>
            <p className="text-xs text-rose-100">
              Upload foto resep, apoteker kami akan menyiapkan obat sesuai dosis.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPrescriptionModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
        >
          <UploadCloud className="w-4 h-4 text-rose-600" />
          <span>{rxVerified ? 'Update Foto Resep' : 'Upload Resep Dokter'}</span>
        </button>
      </div>

      {/* Regulation Disclaimer */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Peraturan BPOM:</strong> Obat bertanda lingkaran merah bergaris tepi hitam (Obat Keras / Antibiotik) wajib menyertakan resep dokter asli yang masih berlaku.
        </p>
      </div>

      {/* Pharmacy Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {pharmacyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/80 dark:border-stone-700 p-3.5 flex flex-col justify-between shadow-xs hover:border-rose-500/40 transition-all"
          >
            <div>
              <div className="relative h-36 w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-700 mb-2.5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs ${
                    product.requiresPrescription
                      ? 'bg-red-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {product.requiresPrescription ? 'Wajib Resep Dokter' : 'Obat Bebas'}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                <Stethoscope className="w-3 h-3" />
                <span>{product.merchantName}</span>
              </div>

              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-2 mt-1">
                {product.name}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-700/60">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                  Rp {(product.discountPrice || product.price).toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-stone-400">
                  Stok: {product.stock} strip
                </span>
              </div>

              <button
                onClick={() => handleAddToCartChecked(product)}
                className={`w-full py-2 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95 ${
                  product.requiresPrescription && !rxVerified
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {product.requiresPrescription && !rxVerified
                    ? 'Upload Resep Dahulu'
                    : 'Tambah ke Keranjang'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {isPrescriptionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative">
            <button
              onClick={() => setIsPrescriptionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                  Form Verifikasi Resep Dokter
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Sesuai standar kefarmasian Kemenkes RI
                </p>
              </div>
            </div>

            <form onSubmit={handleUploadRx} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Nama Pasien Sesuai KTP / Resep
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Contoh: Ahmad Faiz"
                  required
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Upload Foto Lembar Resep Dokter
                </label>
                <div
                  onClick={() =>
                    setPrescriptionImage(
                      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'
                    )
                  }
                  className="border-2 border-dashed border-rose-300 dark:border-rose-900/60 rounded-2xl p-4 text-center cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
                >
                  {prescriptionImage ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Foto Resep Terlampir (Klik untuk ganti)</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 mx-auto text-rose-400 mb-1" />
                      <p className="font-bold text-stone-700 dark:text-stone-200">
                        Klik untuk upload foto resep
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        Pastikan tulisan dokter, nama klinik & tanggal terbaca jelas
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingRx}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmittingRx ? 'Memverifikasi Resep...' : 'Kirim Resep ke Apoteker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
