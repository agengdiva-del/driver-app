import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Plus, Trash2, CheckCircle2, Navigation } from 'lucide-react';
import { CustomerAddress } from '../../types';

export const AddressManagementModal: React.FC = () => {
  const {
    isAddressModalOpen,
    setIsAddressModalOpen,
    addresses,
    currentAddress,
    setCurrentAddress,
    addAddress,
    deleteAddress,
    showToast
  } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [label, setLabel] = useState<'Home' | 'Office' | 'Apartment' | 'Other'>('Home');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [streetAddress, setStreetAddress] = useState('');
  const [village, setVillage] = useState('Jungjang');
  const [notes, setNotes] = useState('');
  const [lat, setLat] = useState(-6.6455);
  const [lng, setLng] = useState(108.4112);

  if (!isAddressModalOpen) return null;

  const arjawinangunVillages = [
    'Jungjang',
    'Jungjang Wetan',
    'Tegalgubug',
    'Tegalgubug Lor',
    'Kebonturi',
    'Rawagatel',
    'Geyongan',
    'Sende',
    'Karangkendal',
    'Bulak'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress || !recipientName) {
      showToast('Harap lengkapi nama penerima dan alamat jalan', 'warning');
      return;
    }

    addAddress({
      label,
      recipientName,
      phone,
      streetAddress,
      village,
      district: 'Arjawinangun',
      city: 'Kabupaten Cirebon',
      province: 'Jawa Barat',
      latitude: lat,
      longitude: lng,
      notes,
      isDefault: false
    });

    setIsAddingNew(false);
    setStreetAddress('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col justify-between p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Kelola Buku Alamat Pengiriman AWD</span>
          </h3>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {!isAddingNew ? (
            <>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                  Alamat Tersimpan ({addresses.length})
                </span>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Alamat Baru</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      currentAddress.id === addr.id
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-500/20'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                          {addr.label}
                        </span>
                        {currentAddress.id === addr.id && (
                          <span className="px-2 py-0.2 rounded-full bg-blue-600 text-white text-[9px] font-bold">
                            Aktif Digunakan
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300 mt-0.5">
                        {addr.recipientName} ({addr.phone})
                      </p>
                      <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5 leading-relaxed">
                        {addr.streetAddress}, Desa {addr.village}, {addr.district}, {addr.city}
                      </p>
                      {addr.notes && (
                        <p className="text-[10px] text-stone-400 italic mt-0.5">
                          Patokan: {addr.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      {currentAddress.id !== addr.id && (
                        <button
                          onClick={() => {
                            setCurrentAddress(addr);
                            showToast(`Alamat ${addr.label} dipilih sebagai tujuan utama`, 'success');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-blue-600 hover:text-white font-bold text-[10px] text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          Pilih
                        </button>
                      )}
                      {addresses.length > 1 && (
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-500 text-center"
                          title="Hapus Alamat"
                        >
                          <Trash2 className="w-3.5 h-3.5 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Add New Address Form */
            <form onSubmit={handleSave} className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="font-extrabold text-xs text-stone-800 dark:text-stone-200">
                  Formulir Alamat Baru
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-stone-400 hover:text-stone-600 font-bold"
                >
                  Batal
                </button>
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Label Alamat
                </label>
                <div className="flex gap-2">
                  {(['Home', 'Office', 'Other'] as const).map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => setLabel(l)}
                      className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
                        label === l
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    placeholder="Contoh: Faiz"
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Desa / Kelurahan (Kecamatan Arjawinangun)
                </label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {arjawinangunVillages.map((v) => (
                    <option key={v} value={v}>
                      Desa {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Alamat Jalan Lengkap, RT / RW, Nomor Rumah
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                  placeholder="Jl. Pahlawan No. 14 RT 02 / RW 01"
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Catatan Patokan Driver
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sebelah warung kopi, cat pagar abu-abu"
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Pinpoint simulator button */}
              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                    Titik Pin GPS Akurat
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Koordinat: {lat.toFixed(4)}, {lng.toFixed(4)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLat(-6.6455 + (Math.random() - 0.5) * 0.005);
                    setLng(108.4112 + (Math.random() - 0.5) * 0.005);
                    showToast('Titik koordinat diperbarui sesuai GPS', 'info');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Cek Titik GPS</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                Simpan Alamat Ini
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
