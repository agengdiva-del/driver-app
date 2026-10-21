import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  MapPin,
  Camera,
  Weight,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck
} from 'lucide-react';

export const CourierDeliveryView: React.FC = () => {
  const { currentAddress, placeOrder, showToast, setCurrentView } = useApp();

  const [pickupAddress, setPickupAddress] = useState(
    `${currentAddress.streetAddress}, ${currentAddress.village}, ${currentAddress.district}`
  );
  const [destAddress, setDestAddress] = useState(
    'Jl. Sunan Gunung Jati No. 88, Klayan, Cirebon'
  );
  const [packageCategory, setPackageCategory] = useState('Makanan & Kue');
  const [weightKg, setWeightKg] = useState(2);
  const [packageDescription, setPackageDescription] = useState('Paket Oleh-oleh Tahu Gejrot & Kerupuk Melarat');
  const [packagePhoto, setPackagePhoto] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Distance calculation simulation
  const estimatedDistanceKm = 4.5;
  const baseRate = 8000;
  const perKmRate = 2000;
  const weightSurcharge = Math.max(0, weightKg - 1) * 2000;
  const totalCost = baseRate + estimatedDistanceKm * perKmRate + weightSurcharge;

  const categories = [
    'Dokumen',
    'Makanan & Kue',
    'Pakaian & Tekstil',
    'Elektronik',
    'Barang Pecah Belah'
  ];

  const handleSendPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      showToast('Harap setujui ketentuan barang yang dilarang dikirim', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Kurir ArjaSend berhasil dipanggil! Driver menuju lokasi penjemputan.', 'success');
      setCurrentView('orders');
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span>ArjaSend Pengiriman Paket Instan</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Kirim barang, dokumen & makanan aman se-Kecamatan Arjawinangun, Kabupaten Cirebon dan sekitarnya
        </p>
      </div>

      <form onSubmit={handleSendPackage} className="space-y-4">
        {/* Route Card (Pickup -> Dropoff) */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-xs space-y-3">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-400">
            Rute Pengantaran
          </h3>

          <div className="space-y-2">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Alamat Penjemputan (Pickup)
              </label>
              <input
                type="text"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                Alamat Tujuan Pengiriman (Dropoff)
              </label>
              <input
                type="text"
                value={destAddress}
                onChange={(e) => setDestAddress(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Package Details Card */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-xs space-y-3">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-400">
            Detail Paket & Berat
          </h3>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Kategori Paket
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setPackageCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    packageCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Estimasi Berat: <span className="text-blue-600 font-extrabold">{weightKg} Kg</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
              <span>0.5 Kg</span>
              <span>10 Kg</span>
              <span>Maksimal Motor (20 Kg)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Deskripsi / Catatan Barang untuk Driver
            </label>
            <input
              type="text"
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              placeholder="Contoh: Dus warna cokelat, jangan ditumpuk berat"
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Optional Photo Attachment */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Foto Paket (Opsional)
            </label>
            <div
              onClick={() =>
                setPackagePhoto(
                  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80'
                )
              }
              className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-3 text-center cursor-pointer hover:bg-blue-50/40 dark:hover:bg-stone-700/30 transition-colors"
            >
              {packagePhoto ? (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>Foto Paket Terlampir (Klik untuk ganti)</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-stone-500 dark:text-stone-400 text-xs">
                  <Camera className="w-4 h-4 text-blue-500" />
                  <span>Ambil atau pilih foto paket</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Restricted Items Policy Checklist */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-3xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4" />
            <span>Ketentuan Barang Terlarang (Restricted Items)</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Dilarang mengirim: Narkoba, minuman keras, senjata tajam/api, uang tunai tanpa asuransi, barang mudah meledak/terbakar, hewan hidup, dan barang melanggar hukum RI.
          </p>
          <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800 dark:text-stone-200 pt-1">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 accent-blue-600"
            />
            <span>Saya menjamin paket ini aman dan bebas dari barang terlarang</span>
          </label>
        </div>

        {/* Cost Calculation Summary & Order CTA */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-stone-400 block uppercase font-bold tracking-wider">
              Total Tarif Ongkos Kirim Instan ({estimatedDistanceKm} km)
            </span>
            <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              Rp {totalCost.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Termasuk asuransi perlindungan paket hingga Rp 1.000.000
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>{isSubmitting ? 'Mencari Kurir...' : 'Panggil Kurir Sekarang'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
