import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  MapPin,
  CreditCard,
  Award,
  Users,
  LifeBuoy,
  Lock,
  Smartphone,
  LogOut,
  ChevronRight,
  Share2,
  Copy,
  AlertTriangle,
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';
import { Complaint } from '../../types';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    setIsKycModalOpen,
    setIsAddressModalOpen,
    wallet,
    complaints,
    addComplaint,
    logout,
    showToast,
    setCurrentView
  } = useApp();

  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [complaintCategory, setComplaintCategory] = useState<Complaint['category']>('Order Problem');
  const [complaintSubject, setComplaintSubject] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const referralCode = 'ARJAWARGA26';

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    showToast('Kode referral ARJAWARGA26 disalin! Bagikan ke temanmu.', 'success');
  };

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintSubject || !complaintDesc) {
      showToast('Harap isi subjek dan detail kendala', 'warning');
      return;
    }
    addComplaint(complaintCategory, complaintSubject, complaintDesc);
    setIsComplaintModalOpen(false);
    setComplaintSubject('');
    setComplaintDesc('');
  };

  return (
    <div className="space-y-4 pb-24 text-xs">
      {/* Header Profile Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                currentUser?.avatarUrl ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
              }
              alt="Avatar"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-xs"
            />
            {currentUser?.verificationStatus === 'verified' && (
              <span className="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 rounded-full text-white ring-2 ring-white dark:ring-stone-900">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                {currentUser?.fullName || 'Pengguna AWD Arjawinangun'}
              </h2>
            </div>
            <p className="text-stone-500 dark:text-stone-400 mt-0.5">
              {currentUser?.phone} • {currentUser?.email}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                  currentUser?.verificationStatus === 'verified'
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {currentUser?.verificationStatus === 'verified' ? 'Akun Terverifikasi (KYC Sukses)' : 'Belum Verifikasi'}
              </span>
              <span className="px-2 py-0.2 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                Member {wallet.membershipLevel}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsKycModalOpen(true)}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-bold hover:bg-blue-100 transition-colors"
        >
          {currentUser?.verificationStatus === 'verified' ? 'Status KYC' : 'Verifikasi KYC'}
        </button>
      </div>

      {/* Referral System Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-800 text-white rounded-3xl p-4 shadow-md space-y-2.5 border border-blue-400/30">
        <div className="flex items-start justify-between">
          <div>
            <span className="px-2 py-0.2 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider text-sky-200">
              Program Ajak Teman AWD (Referral)
            </span>
            <h3 className="font-extrabold text-sm sm:text-base mt-1">
              Dapatkan 100 Poin Tiap Teman yang Bergabung
            </h3>
            <p className="text-sky-100 text-[11px]">
              Ajak tetangga dan rekan di Arjawinangun memakai aplikasi AWD
            </p>
          </div>
          <Users className="w-8 h-8 text-white/30 shrink-0" />
        </div>

        <div className="flex items-center justify-between bg-black/20 backdrop-blur-xs p-2.5 rounded-2xl border border-white/20">
          <div>
            <span className="text-[10px] text-sky-200 block">Kode Referral Unikmu:</span>
            <span className="font-mono font-black text-sm tracking-widest text-white">
              {referralCode}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReferral}
              className="px-3 py-1.5 rounded-xl bg-white text-blue-800 font-bold hover:bg-blue-50 flex items-center gap-1 shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between text-[11px] text-sky-100 pt-1">
          <span>Teman Terdaftar: <strong>4 Orang</strong></span>
          <span>Total Poin Didapat: <strong>400 Poin</strong></span>
        </div>
      </div>

      {/* Account Navigation List */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 divide-y divide-stone-100 dark:divide-stone-700/60 shadow-xs overflow-hidden">
        {/* Saved Addresses */}
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                Buku Alamat Pengiriman
              </span>
              <span className="text-[11px] text-stone-400">
                Kelola alamat rumah, kantor, atau kerabat di Arjawinangun
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* MitraPay Wallet Dashboard */}
        <button
          onClick={() => setCurrentView('wallet')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                Dompet MitraPay & Poin Loyalitas
              </span>
              <span className="text-[11px] text-stone-400">
                Saldo Rp {wallet.balance.toLocaleString('id-ID')} • {wallet.points} Poin
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Complaints & Help Desk */}
        <button
          onClick={() => setIsComplaintModalOpen(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                Pusat Bantuan & Pengaduan Kendala
              </span>
              <span className="text-[11px] text-stone-400">
                Ajukan komplain pesanan, refund dana & masalah akun
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
            {complaints.length} Tiket
          </span>
        </button>

        {/* Security & 2FA */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                Verifikasi 2 Langkah (2FA WhatsApp OTP)
              </span>
              <span className="text-[11px] text-stone-400">
                Keamanan tambahan saat login di perangkat baru
              </span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                showToast(
                  !twoFactorEnabled ? '2FA WhatsApp OTP diaktifkan' : '2FA dinonaktifkan',
                  'info'
                );
              }}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600" />
          </label>
        </div>

        {/* Account Blocking & Appeal Info */}
        <button
          onClick={() => setIsAppealModalOpen(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-750 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                Kebijakan Keamanan & Banding Akun
              </span>
              <span className="text-[11px] text-stone-400">
                Status akun: <strong>Normal (Bebas Pelanggaran)</strong>
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full p-3.5 flex items-center gap-3 text-rose-600 font-bold hover:bg-rose-50/60 dark:hover:bg-rose-950/20 transition-colors text-left"
        >
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600">
            <LogOut className="w-4 h-4" />
          </div>
          <span>Keluar dari Akun</span>
        </button>
      </div>

      {/* Complaints Modal */}
      {isComplaintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col justify-between p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-blue-600" />
                <span>Pusat Pengaduan Layanan</span>
              </h3>
              <button
                onClick={() => setIsComplaintModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {/* Existing tickets */}
              <div className="space-y-2">
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                  Tiket Terdaftar
                </span>
                {complaints.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-800 dark:text-stone-100">
                        {c.ticketNumber} • {c.category}
                      </span>
                      <span className="px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                        {c.status}
                      </span>
                    </div>
                    <p className="font-semibold text-stone-700 dark:text-stone-200">{c.subject}</p>
                    <p className="text-stone-500 text-[11px]">{c.description}</p>
                    {c.resolutionNote && (
                      <p className="text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl mt-1">
                        Solusi CS: {c.resolutionNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Form to submit new complaint */}
              <form onSubmit={handleCreateComplaint} className="pt-2 border-t border-stone-200 dark:border-stone-700 space-y-2.5">
                <span className="font-bold text-stone-800 dark:text-stone-200 block">
                  Buat Tiket Keluhan Baru
                </span>

                <div>
                  <label className="font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    Kategori Keluhan
                  </label>
                  <select
                    value={complaintCategory}
                    onChange={(e) => setComplaintCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                  >
                    <option value="Order Problem">Masalah Pesanan (Kekurangan Menu/Salah)</option>
                    <option value="Delivery Problem">Masalah Pengantaran (Driver Terlambat/Nyasar)</option>
                    <option value="Payment Problem">Masalah Pembayaran / Saldo MitraPay</option>
                    <option value="Refund Request">Permintaan Pengembalian Dana (Refund)</option>
                    <option value="Account Issue">Masalah Akun & Login</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    Subjek Keluhan
                  </label>
                  <input
                    type="text"
                    value={complaintSubject}
                    onChange={(e) => setComplaintSubject(e.target.value)}
                    placeholder="Contoh: Sambal empal gentong tertinggal"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-600 dark:text-stone-400 block mb-1">
                    Detail Masalah
                  </label>
                  <textarea
                    value={complaintDesc}
                    onChange={(e) => setComplaintDesc(e.target.value)}
                    rows={2}
                    placeholder="Jelaskan secara ringkas agar tim mediasi MitraArja segera menindaklanjuti..."
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  Ajukan Tiket Keluhan
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Account Security & Appeal Modal */}
      {isAppealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-5 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs space-y-3">
            <button
              onClick={() => setIsAppealModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Sistem Proteksi & Anti-Fraud MitraArja</span>
            </h3>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              MitraArja menerapkan sistem pendeteksi fraud otomatis demi melindungi UMKM & Driver independen di Arjawinangun. Pelanggaran berat meliputi:
            </p>

            <ul className="list-disc pl-4 space-y-1 text-stone-500 text-[11px]">
              <li>Order Fiktif (Fake Orders) yang merugikan driver</li>
              <li>Penyalahgunaan Promo & Multi-Akun (Promo Abuse)</li>
              <li>Spam pesanan tanpa penyelesaian pembayaran</li>
              <li>Payment abuse / chargeback palsu</li>
            </ul>

            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
              <div className="font-bold text-stone-800 dark:text-stone-100">
                Fitur Pengajuan Banding (Appeal Request)
              </div>
              <p className="text-[11px] text-stone-500">
                Jika akunmu terkena status Warning atau Suspended karena kekeliruan sistem, kamu dapat mengajukan banding langsung ke tim kepatuhan MitraArja.
              </p>
            </div>

            <button
              onClick={() => {
                showToast('Akun Anda dalam status SEHAT (Tidak ada sanksi aktif)', 'success');
                setIsAppealModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold shadow-md"
            >
              Cek Status Integritas Akun
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
