import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Upload, 
  Camera, 
  AlertCircle, 
  ShieldCheck, 
  Smartphone, 
  UserCheck, 
  Bike, 
  Car, 
  FileText, 
  CreditCard, 
  PhoneCall,
  Check,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DriverVerificationStatus } from '../../types';

export const DriverRegistrationModal: React.FC = () => {
  const { 
    isDriverRegistrationModalOpen, 
    setIsDriverRegistrationModalOpen, 
    driverProfile, 
    registerDriver, 
    updateDriverStatus, 
    setCurrentView,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');

  // Form states
  const [fullName, setFullName] = useState(driverProfile?.fullName || 'Kang Asep Kurniawan');
  const [phone, setPhone] = useState(driverProfile?.phone || '0813-8822-4411');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(true);

  const [email, setEmail] = useState(driverProfile?.email || 'asep.kurniawan@gmail.com');
  const [password, setPassword] = useState('pass12345');
  const [confirmPassword, setConfirmPassword] = useState('pass12345');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>((driverProfile?.gender as 'Laki-laki' | 'Perempuan') || 'Laki-laki');
  const [birthDate, setBirthDate] = useState(driverProfile?.birthDate || '1995-07-21');

  // Photos
  const [profilePhoto, setProfilePhoto] = useState(driverProfile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
  const [ktpPhoto, setKtpPhoto] = useState(driverProfile?.ktpPhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80');

  // Address
  const [address, setAddress] = useState(driverProfile?.address || 'Jl. Ki Bagus Rangin No. 18 RT 02 / RW 01');
  const [village, setVillage] = useState(driverProfile?.village || 'Jungjang');
  const [district, setDistrict] = useState(driverProfile?.district || 'Arjawinangun');

  // Vehicle
  const [vehicleType, setVehicleType] = useState<'Motor' | 'Mobil'>(driverProfile?.vehicleType || 'Motor');
  const [vehicleBrandModel, setVehicleBrandModel] = useState(driverProfile?.vehicleBrandModel || 'Honda Vario 160cc CBS');
  const [vehiclePlate, setVehiclePlate] = useState(driverProfile?.vehiclePlate || 'E 4521 AR');
  const [vehicleColor, setVehicleColor] = useState(driverProfile?.vehicleColor || 'Biru Metalik AWD');
  const [vehiclePhoto, setVehiclePhoto] = useState(driverProfile?.vehiclePhoto || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80');
  
  // Licenses
  const [simNumber, setSimNumber] = useState(driverProfile?.simNumber || '3209142107950001');
  const [simPhoto, setSimPhoto] = useState(driverProfile?.simPhoto || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&auto=format&fit=crop&q=80');
  const [stnkPhoto, setStnkPhoto] = useState(driverProfile?.stnkPhoto || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=300&auto=format&fit=crop&q=80');

  // Payment & Emergency
  const [bankAccountOrEwallet, setBankAccountOrEwallet] = useState(driverProfile?.bankAccountOrEwallet || 'BCA - 0128392101 (a.n Asep Kurniawan)');
  const [emergencyContactName, setEmergencyContactName] = useState(driverProfile?.emergencyContactName || 'Ibu Siti Khodijah (Istri)');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(driverProfile?.emergencyContactPhone || '0819-2233-4455');

  // Terms
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isDriverRegistrationModalOpen) return null;

  const handleSendOtp = () => {
    if (!phone) {
      showToast('Masukkan nomor HP aktif terlebih dahulu', 'warning');
      return;
    }
    setOtpSent(true);
    setOtpCode('8829'); // Simulated OTP
    showToast(`Kode OTP SMS/WhatsApp telah dikirim: 8829`, 'info');
  };

  const handleVerifyOtp = () => {
    if (otpCode === '8829' || otpCode.length === 4) {
      setIsPhoneVerified(true);
      showToast('Nomor HP berhasil diverifikasi dengan OTP!', 'success');
    } else {
      showToast('Kode OTP salah. Masukkan 8829 untuk demo.', 'error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      showToast('Harap setujui syarat dan ketentuan mitra driver AWD', 'warning');
      return;
    }

    if (!isPhoneVerified) {
      showToast('Verifikasi nomor HP Anda dengan OTP terlebih dahulu', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Konfirmasi kata sandi tidak cocok', 'error');
      return;
    }

    registerDriver({
      fullName,
      phone,
      email,
      password,
      confirmPassword,
      profilePhoto,
      ktpPhoto,
      gender,
      birthDate,
      address,
      village,
      district,
      vehicleType,
      vehicleBrandModel,
      vehiclePlate,
      vehicleColor,
      vehiclePhoto,
      simNumber,
      simPhoto,
      stnkPhoto,
      bankAccountOrEwallet,
      emergencyContactName,
      emergencyContactPhone,
      termsAccepted
    });

    setActiveTab('status');
  };

  const handleSimulateUpload = (setter: (url: string) => void, label: string) => {
    const samples = [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=80'
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    setter(picked);
    showToast(`Foto ${label} berhasil diperbarui`, 'success');
  };

  const villagesList = [
    'Jungjang',
    'Jungjang Wetan',
    'Kebonturi',
    'Arjawinangun',
    'Tegalgubug',
    'Tegalgubug Lor',
    'Rawagatel',
    'Geyongan',
    'Karangkerta',
    'Bulak',
    'Sende'
  ];

  const currentStatus: DriverVerificationStatus = driverProfile?.status || 'Menunggu Verifikasi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-blue-100 dark:border-slate-800 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 text-white flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg ring-2 ring-white/30 shrink-0 overflow-hidden">
              <img 
                src="/assets/aistudio/Designer_b056b7f0.png" 
                alt="AWD Driver" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white tracking-tight">Form Pendaftaran App Driver</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-blue-950 px-2 py-0.5 rounded-full">
                  Kemitraan AWD
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Pengantaran pesanan merchant kepada pelanggan di Arjawinangun & Cirebon
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDriverRegistrationModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Status Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 shrink-0">
          <div className="flex gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'form'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Formulir Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'status'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>Status Akun:</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                currentStatus === 'Disetujui'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : currentStatus === 'Ditolak'
                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                  : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
              }`}>
                {currentStatus}
              </span>
            </button>
          </div>

          {/* Quick status switch simulator for testing */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="text-[10px]">Tes Status:</span>
            <button
              type="button"
              onClick={() => updateDriverStatus('Menunggu Verifikasi')}
              className={`px-2 py-1 rounded text-[10px] font-semibold border transition ${
                currentStatus === 'Menunggu Verifikasi' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Review
            </button>
            <button
              type="button"
              onClick={() => updateDriverStatus('Disetujui')}
              className={`px-2 py-1 rounded text-[10px] font-semibold border transition ${
                currentStatus === 'Disetujui' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Setujui
            </button>
            <button
              type="button"
              onClick={() => updateDriverStatus('Ditolak', 'Foto STNK & SIM tidak terlihat jelas.')}
              className={`px-2 py-1 rounded text-[10px] font-semibold border transition ${
                currentStatus === 'Ditolak' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Tolak
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'status' ? (
            /* STATUS VIEW */
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Status Banner */}
              <div className={`p-6 rounded-2xl border text-center ${
                currentStatus === 'Disetujui'
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                  : currentStatus === 'Ditolak'
                  ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                  : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
              }`}>
                <div className="inline-flex p-4 rounded-full mb-3 shadow-inner bg-white dark:bg-slate-900">
                  {currentStatus === 'Disetujui' ? (
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  ) : currentStatus === 'Ditolak' ? (
                    <XCircle className="w-12 h-12 text-rose-600 dark:text-rose-400" />
                  ) : (
                    <Clock className="w-12 h-12 text-amber-500 animate-pulse" />
                  )}
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-white dark:bg-slate-800 shadow-sm">
                  Status: {currentStatus}
                </div>

                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentStatus === 'Disetujui' && 'Selamat! Anda Resmi Jadi Mitra Driver AWD'}
                  {currentStatus === 'Menunggu Verifikasi' && 'Pendaftaran Sedang Ditinjau Tim Verifikator AWD'}
                  {currentStatus === 'Ditolak' && 'Pendaftaran Belum Dapat Disetujui'}
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                  {currentStatus === 'Disetujui' &&
                    'Akun Anda telah disetujui. Anda dapat menyalakan mode Online, menerima orderan pengantaran dari resto/merchant Arjawinangun, serta mendapatkan komisi 90%!'}
                  {currentStatus === 'Menunggu Verifikasi' &&
                    'Tim verifikator kami sedang memeriksa KTP, SIM, STNK, dan kelayakan kendaraan. Proses biasanya memakan waktu 5-15 menit pada jam operasional.'}
                  {currentStatus === 'Ditolak' &&
                    (driverProfile?.rejectionReason || 'Ada dokumen yang tidak sesuai standar kelayakan AWD. Silakan periksa kembali foto SIM & STNK Anda.')}
                </p>

                {/* Next actions */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {currentStatus === 'Disetujui' ? (
                    <button
                      onClick={() => {
                        setIsDriverRegistrationModalOpen(false);
                        setCurrentView('driver');
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2"
                    >
                      <span>Buka Aplikasi Driver AWD</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : currentStatus === 'Ditolak' ? (
                    <button
                      onClick={() => setActiveTab('form')}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Perbaiki Dokumen & Ajukan Ulang</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateDriverStatus('Disetujui');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Simulasikan Persetujuan Langsung</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Driver Summary Profile */}
              {driverProfile && (
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Ringkasan Data Pendaftar
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Nama:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{driverProfile.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">No. HP:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{driverProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Kendaraan:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{driverProfile.vehicleType} • {driverProfile.vehicleBrandModel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Plat Nomor:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{driverProfile.vehiclePlate}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <span className="text-slate-400">Wilayah:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{driverProfile.village}, {driverProfile.district}, Cirebon</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: DATA KURIR / IDENTITAS */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    1. Data Diri & Identitas Kurir / Pengemudi
                  </h4>
                </div>

                {/* Nama Lengkap */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nama Lengkap Sesuai Identitas
                    </label>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                      Wajib
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Contoh: Asep Kurniawan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Nomor HP Aktif + OTP */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nomor HP Aktif
                    </label>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                      Wajib · OTP
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        setIsPhoneVerified(false);
                      }}
                      placeholder="0812-xxxx-xxxx"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-3.5 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold text-xs transition"
                    >
                      {otpSent ? 'Kirim Ulang' : 'Kirim OTP'}
                    </button>
                  </div>

                  {/* OTP Input box */}
                  {otpSent && (
                    <div className="mt-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-blue-900 dark:text-blue-200">
                          Masukkan 4 digit OTP:
                        </span>
                        <input
                          type="text"
                          maxLength={4}
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value)}
                          placeholder="8829"
                          className="w-20 px-2 py-1 text-center font-mono font-bold text-sm bg-white dark:bg-slate-900 rounded-lg border border-blue-300 dark:border-blue-700"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
                      >
                        Verifikasi
                      </button>
                    </div>
                  )}

                  {isPhoneVerified && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Nomor HP terverifikasi</span>
                    </div>
                  )}
                </div>

                {/* Email (Opsional) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      Opsional
                    </span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Contoh: asep.driver@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Kata Sandi & Konfirmasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Kata Sandi
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Konfirmasi Kata Sandi
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Jenis Kelamin & Tanggal Lahir */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Jenis Kelamin
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        Opsional
                      </span>
                    </div>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Tanggal Lahir
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib (Usia Min. 18)
                      </span>
                    </div>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={e => setBirthDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Foto Profil & Foto KTP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Foto Profil */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Foto Profil Driver</span>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">Wajib</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img 
                        src={profilePhoto} 
                        alt="Profil" 
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shrink-0" 
                      />
                      <button
                        type="button"
                        onClick={() => handleSimulateUpload(setProfilePhoto, 'Profil')}
                        className="flex-1 py-2 px-3 rounded-lg border border-dashed border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Ganti Foto</span>
                      </button>
                    </div>
                  </div>

                  {/* Foto KTP */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Foto KTP Asli</span>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">Wajib Verifikasi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img 
                        src={ktpPhoto} 
                        alt="KTP" 
                        className="w-16 h-12 rounded-lg object-cover border border-slate-300 dark:border-slate-600 shrink-0" 
                      />
                      <button
                        type="button"
                        onClick={() => handleSimulateUpload(setKtpPhoto, 'KTP')}
                        className="flex-1 py-2 px-3 rounded-lg border border-dashed border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload KTP</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* SECTION 2: ALAMAT TEMPAT TINGGAL */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    2. Alamat Domisili Tempat Tinggal
                  </h4>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Alamat Tempat Tinggal (Jalan / RT / RW)
                    </label>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                      Wajib
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Contoh: Jl. Ki Bagus Rangin No. 18, RT 02 / RW 01"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Desa / Kelurahan
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <select
                      value={village}
                      onChange={e => setVillage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {villagesList.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Kecamatan
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      placeholder="Arjawinangun"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: KENDARAAN & DOKUMEN (SIM & STNK) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <Bike className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    3. Data Kendaraan & Legalitas (SIM & STNK)
                  </h4>
                </div>

                {/* Jenis Kendaraan */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Jenis Kendaraan
                    </label>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                      Wajib
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVehicleType('Motor')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition ${
                        vehicleType === 'Motor'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Sepeda Motor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVehicleType('Mobil')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition ${
                        vehicleType === 'Mobil'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      <span>Mobil / Niaga</span>
                    </button>
                  </div>
                </div>

                {/* Merek & Tipe, Plat, Warna */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Merek & Tipe
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={vehicleBrandModel}
                      onChange={e => setVehicleBrandModel(e.target.value)}
                      placeholder="Contoh: Vario 160"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nomor Polisi
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={vehiclePlate}
                      onChange={e => setVehiclePlate(e.target.value.toUpperCase())}
                      placeholder="E 4521 AR"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold uppercase outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Warna Kendaraan
                      </label>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                        Wajib
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={vehicleColor}
                      onChange={e => setVehicleColor(e.target.value)}
                      placeholder="Hitam / Biru"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Upload Foto Kendaraan, SIM & STNK */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Foto Kendaraan */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Foto Kendaraan</span>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1 rounded">Wajib</span>
                    </div>
                    <img src={vehiclePhoto} alt="Kendaraan" className="w-full h-16 rounded object-cover mb-2" />
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(setVehiclePhoto, 'Kendaraan')}
                      className="w-full py-1 px-2 rounded border border-dashed border-blue-400 text-blue-600 dark:text-blue-400 text-[11px] font-semibold flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                    </button>
                  </div>

                  {/* Foto SIM */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Nomor & Foto SIM</span>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1 rounded">Wajib SIM C/A</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={simNumber}
                      onChange={e => setSimNumber(e.target.value)}
                      placeholder="Nomor SIM"
                      className="w-full px-2 py-1 mb-1.5 rounded border border-slate-200 dark:border-slate-700 text-[11px] bg-slate-50 dark:bg-slate-800 outline-none"
                    />
                    <img src={simPhoto} alt="SIM" className="w-full h-12 rounded object-cover mb-2" />
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(setSimPhoto, 'SIM')}
                      className="w-full py-1 px-2 rounded border border-dashed border-blue-400 text-blue-600 dark:text-blue-400 text-[11px] font-semibold flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload SIM</span>
                    </button>
                  </div>

                  {/* Foto STNK */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Foto STNK</span>
                      <span className="text-[9px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1 rounded">Wajib STNK Aktif</span>
                    </div>
                    <img src={stnkPhoto} alt="STNK" className="w-full h-16 rounded object-cover mb-2" />
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(setStnkPhoto, 'STNK')}
                      className="w-full py-1 px-2 rounded border border-dashed border-blue-400 text-blue-600 dark:text-blue-400 text-[11px] font-semibold flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload STNK</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 4: PEMBAYARAN & KONTAK DARURAT */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    4. Rekening Pembayaran & Kontak Darurat (Opsional)
                  </h4>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nomor Rekening / E-Wallet (Pencairan Pendapatan)
                    </label>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      Opsional
                    </span>
                  </div>
                  <input
                    type="text"
                    value={bankAccountOrEwallet}
                    onChange={e => setBankAccountOrEwallet(e.target.value)}
                    placeholder="Contoh: BCA 0128392101 a.n Asep / DANA 0813..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nama Kontak Darurat
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        Opsional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={emergencyContactName}
                      onChange={e => setEmergencyContactName(e.target.value)}
                      placeholder="Nama Istri / Orang Tua / Saudara"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nomor HP Kontak Darurat
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        Opsional
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={emergencyContactPhone}
                      onChange={e => setEmergencyContactPhone(e.target.value)}
                      placeholder="0819-xxxx-xxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: PERSETUJUAN SYARAT & KETENTUAN */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    required
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="termsAgreement" className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                    <span className="font-bold text-slate-900 dark:text-white">Persetujuan Syarat & Ketentuan Kemitraan: </span>
                    Saya menyatakan bahwa data yang saya masukkan adalah benar dan valid. Saya setuju mematuhi standar pelayanan prima AWD (Arjawinangun Delivery By Wong Nangun), menjaga integritas pesanan, serta menerima skema bagi hasil 90% untuk mitra driver dan 10% untuk biaya platform & asuransi aplikasi.
                    <span className="text-rose-500 font-bold ml-1">*Wajib</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDriverRegistrationModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kirim Pendaftaran Driver</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
