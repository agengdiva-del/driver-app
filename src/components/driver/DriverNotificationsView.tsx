import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Clock,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const DriverNotificationsView: React.FC = () => {
  const { showToast } = useApp();

  const driverNotifications = [
    {
      id: 'dn-1',
      title: '⚡ Bonus Insentif Siang Arjawinangun',
      message: 'Selesaikan 3 orderan antara jam 11:00 - 14:00 di area Jungjang & By Pass untuk dapat bonus Rp 25.000.',
      time: 'Baru saja',
      type: 'bonus',
      isNew: true
    },
    {
      id: 'dn-2',
      title: '⚠️ Info Lalu Lintas: Pasar Sandang Tegalgubug',
      message: 'Lalu lintas arah Tegalgubug padat merayap karena hari pasaran. Harap ambil jalur alternatif via Desa Rawagatel.',
      time: '1 jam lalu',
      type: 'warning',
      isNew: true
    },
    {
      id: 'dn-3',
      title: '✓ Penarikan Dompet Driver Sukses',
      message: 'Dana penarikan Rp 150.000 telah berhasil dikirim ke rekening BCA Anda. Cek mutasi rekening.',
      time: 'Kemarin, 21:12',
      type: 'success',
      isNew: false
    },
    {
      id: 'dn-4',
      title: '⭐ Rating Bintang 5 dari Pelanggan',
      message: '"Pengantaran empal gentong sangat cepat dan kuahnya masih hangat! Mantap kang Asep." - Mas Danu',
      time: 'Kemarin, 14:15',
      type: 'rating',
      isNew: false
    },
    {
      id: 'dn-5',
      title: '🛡️ Tips Keselamatan Berkendara Pantura',
      message: 'Selalu gunakan helm standar SNI, nyalakan lampu utama, dan patuhi rambu di perlintasan kereta api Arjawinangun.',
      time: '3 hari lalu',
      type: 'system',
      isNew: false
    }
  ];

  return (
    <div className="space-y-2.5 pb-16 text-xs text-slate-800 dark:text-slate-100 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">Notifikasi Mitra Driver</h2>
            <p className="text-[10px] text-slate-400">Pemberitahuan insentif, info jalan Pantura, & pesanan</p>
          </div>
        </div>

        <button
          onClick={() => showToast('Semua notifikasi telah ditandai dibaca.', 'info')}
          className="text-blue-600 dark:text-blue-400 font-bold text-[10px] hover:underline"
        >
          Tandai Dibaca
        </button>
      </div>

      <div className="space-y-2">
        {driverNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded-2xl border transition-all ${
              notif.isNew
                ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/80 shadow-2xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className={`p-2 rounded-xl shrink-0 ${
                notif.type === 'bonus'
                  ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600'
                  : notif.type === 'warning'
                  ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600'
                  : notif.type === 'success'
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600'
                  : notif.type === 'rating'
                  ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}>
                {notif.type === 'bonus' && <Sparkles className="w-4 h-4" />}
                {notif.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                {notif.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
                {notif.type === 'rating' && <TrendingUp className="w-4 h-4" />}
                {notif.type === 'system' && <ShieldCheck className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
