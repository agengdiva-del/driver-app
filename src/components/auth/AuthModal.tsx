import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Smartphone,
  Mail,
  Lock,
  User,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  LogIn
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginWithPhone,
    loginWithEmail,
    loginWithGoogle,
    loginAsGuest
  } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [method, setMethod] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [email, setEmail] = useState('aluncell@gmail.com');
  const [password, setPassword] = useState('********');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('8829');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'whatsapp') {
      if (!otpStep) {
        setOtpStep(true);
        return;
      }
      loginWithPhone(phone, 'whatsapp');
    } else if (method === 'phone') {
      if (!otpStep) {
        setOtpStep(true);
        return;
      }
      loginWithPhone(phone, 'sms');
    } else {
      loginWithEmail(email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 shadow-2xl relative text-xs space-y-4">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto w-20 h-20 mb-2 p-1 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-sky-400 shadow-lg">
            <img
              src="/assets/aistudio/Designer_b056b7f0.png"
              alt="AWD Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <span className="font-black text-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent tracking-wider">
            AWD ARJAWINANGUN
          </span>
          <h2 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 mt-0.5">
            {authMode === 'login' ? 'Masuk ke Layanan AWD By Wong Nangun' : 'Daftar Akun Baru Pelanggan AWD'}
          </h2>
          <p className="text-stone-500 text-[11px] mt-0.5">
            Hyperlocal Delivery & Marketplace Arjawinangun
          </p>
        </div>

        {/* Method Switcher */}
        <div className="grid grid-cols-3 gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl text-[11px] font-bold">
          <button
            type="button"
            onClick={() => {
              setMethod('whatsapp');
              setOtpStep(false);
            }}
            className={`py-1.5 rounded-xl transition-all ${
              method === 'whatsapp'
                ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-stone-500'
            }`}
          >
            WhatsApp OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod('phone');
              setOtpStep(false);
            }}
            className={`py-1.5 rounded-xl transition-all ${
              method === 'phone'
                ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-stone-500'
            }`}
          >
            SMS OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod('email');
              setOtpStep(false);
            }}
            className={`py-1.5 rounded-xl transition-all ${
              method === 'email'
                ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-stone-500'
            }`}
          >
            Email
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {authMode === 'register' && (
            <div>
              <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ahmad Faiz"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {(method === 'whatsapp' || method === 'phone') && !otpStep && (
            <div>
              <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Nomor Handphone (Aktif di WhatsApp)
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812-3456-7890"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {otpStep && (
            <div>
              <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Masukkan Kode OTP 4 Digit (Simulasi: 8829)
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={4}
                required
                className="w-full text-center tracking-widest text-lg font-mono font-black py-2.5 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 outline-none"
              />
              <span className="text-[10px] text-stone-400 text-center block mt-1">
                Kode OTP telah dikirimkan ke {phone} via {method.toUpperCase()}
              </span>
            </div>
          )}

          {method === 'email' && (
            <>
              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
          >
            {otpStep
              ? 'Verifikasi & Masuk'
              : method === 'email'
              ? 'Masuk dengan Email'
              : 'Kirim Kode OTP'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px bg-stone-200 dark:bg-stone-800 flex-1" />
          <span className="text-[10px] text-stone-400 uppercase">Atau</span>
          <div className="h-px bg-stone-200 dark:bg-stone-800 flex-1" />
        </div>

        {/* Social / Guest Logins */}
        <div className="space-y-2">
          <button
            onClick={loginWithGoogle}
            className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 font-bold text-stone-700 dark:text-stone-200 flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Masuk dengan Google</span>
          </button>

          <button
            onClick={loginAsGuest}
            className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold transition-colors"
          >
            Lanjut sebagai Tamu (Guest Mode)
          </button>
        </div>
      </div>
    </div>
  );
};
