import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Navigation,
  ChevronRight,
  Filter,
  CreditCard,
  User,
  ShoppingBag
} from 'lucide-react';

export const DriverHistoryView: React.FC = () => {
  const { driverEarnings, showToast } = useApp();
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week'>('all');
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

  const mockTrips = [
    {
      id: 'trip-1',
      orderNumber: 'AWD-FOOD-9214',
      date: 'Hari ini, 13:20',
      period: 'today',
      service: 'AWD Food',
      merchantName: 'Empal Gentong H. Apud - Arja',
      merchantAddress: 'Jl. Raya By Pass Jungjang No. 18',
      customerName: 'Mas Danu Pratama',
      customerAddress: 'Griya Arjawinangun Indah Blok C-09, Jungjang',
      distanceKm: 2.4,
      durationMin: 14,
      grossDeliveryFee: 12000,
      driverCommission: 10800, // 90%
      platformFee: 1200, // 10%
      paymentMethod: 'QRIS / Non-Tunai',
      itemsCount: 2,
      status: 'Selesai'
    },
    {
      id: 'trip-2',
      orderNumber: 'AWD-FOOD-8812',
      date: 'Hari ini, 10:45',
      period: 'today',
      service: 'AWD Food',
      merchantName: 'Martabak Bangka Arja Jaya',
      merchantAddress: 'Jl. Pasar Darurat Kebonturi No. 5',
      customerName: 'Ibu Hj. Siti Masitoh',
      customerAddress: 'Jl. Ki Bagus Rangin RT 04/02, Jungjang',
      distanceKm: 1.8,
      durationMin: 11,
      grossDeliveryFee: 10000,
      driverCommission: 9000, // 90%
      platformFee: 1000,
      paymentMethod: 'Tunai / COD',
      itemsCount: 1,
      status: 'Selesai'
    },
    {
      id: 'trip-3',
      orderNumber: 'AWD-MART-7731',
      date: 'Kemarin, 16:30',
      period: 'week',
      service: 'AWD Mart UMKM',
      merchantName: 'Toko Kain Sandang H. Hasan',
      merchantAddress: 'Pasar Sandang Tegalgubug Blok B-14',
      customerName: 'Bu Rina Wati',
      customerAddress: 'Desa Rawagatel Blok Manis',
      distanceKm: 4.6,
      durationMin: 22,
      grossDeliveryFee: 16000,
      driverCommission: 14400, // 90%
      platformFee: 1600,
      paymentMethod: 'QRIS / Non-Tunai',
      itemsCount: 4,
      status: 'Selesai'
    },
    {
      id: 'trip-4',
      orderNumber: 'AWD-FOOD-6120',
      date: 'Kemarin, 12:15',
      period: 'week',
      service: 'AWD Food',
      merchantName: 'Nasi Lengko & Tahu Gejrot Mang Toni',
      merchantAddress: 'Perempatan Stasiun Arjawinangun',
      customerName: 'Pak Budi Hartono',
      customerAddress: 'Desa Jungjang Wetan Blok Pon',
      distanceKm: 1.5,
      durationMin: 9,
      grossDeliveryFee: 9000,
      driverCommission: 8100, // 90%
      platformFee: 900,
      paymentMethod: 'Tunai / COD',
      itemsCount: 2,
      status: 'Selesai'
    },
    {
      id: 'trip-5',
      orderNumber: 'AWD-EXPR-5021',
      date: '3 hari lalu, 09:10',
      period: 'week',
      service: 'AWD Kurir Kilat',
      merchantName: 'Dokumen Kantor Notaris Cirebon Barat',
      merchantAddress: 'Jl. By Pass Karanganyar Arjawinangun',
      customerName: 'CV Arja Makmur Sentosa',
      customerAddress: 'Kawasan Pergudangan Tegalgubug',
      distanceKm: 5.2,
      durationMin: 20,
      grossDeliveryFee: 20000,
      driverCommission: 18000, // 90%
      platformFee: 2000,
      paymentMethod: 'Saldo AWD MitraPay',
      itemsCount: 1,
      status: 'Selesai'
    }
  ];

  const filteredTrips = mockTrips.filter((trip) => {
    if (filterPeriod === 'today') return trip.period === 'today';
    if (filterPeriod === 'week') return trip.period === 'today' || trip.period === 'week';
    return true;
  });

  return (
    <div className="space-y-2.5 pb-16 text-xs text-slate-800 dark:text-slate-100 max-w-4xl mx-auto">
      
      {/* HEADER & FILTER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2">
        <div>
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Riwayat Pengantaran Trip</span>
          </h2>
          <p className="text-[10px] text-slate-400">
            Total {driverEarnings.totalTrips} pengantaran sukses di Arjawinangun & sekitarnya
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-[10px] font-bold">
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-2 py-1 rounded-lg transition ${
              filterPeriod === 'all'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-2 py-1 rounded-lg transition ${
              filterPeriod === 'today'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Hari Ini
          </button>
          <button
            onClick={() => setFilterPeriod('week')}
            className={`px-2 py-1 rounded-lg transition ${
              filterPeriod === 'week'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Minggu Ini
          </button>
        </div>
      </div>

      {/* TRIP CARDS LIST */}
      <div className="space-y-2">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => setSelectedTrip(trip)}
            className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition cursor-pointer space-y-2"
          >
            {/* Top row: Order Number & Net Commission */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-xs">
                  {trip.orderNumber}
                </span>
                <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded-md">
                  {trip.service}
                </span>
                <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded-md">
                  {trip.status}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-slate-400 block leading-tight font-medium">Komisi Bersih (90%)</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm leading-tight">
                  +Rp {trip.driverCommission.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Merchant and Customer route */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-start gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase leading-none">Ambil:</span>
                  <p className="font-bold text-slate-900 dark:text-white truncate">{trip.merchantName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{trip.merchantAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase leading-none">Antar:</span>
                  <p className="font-bold text-slate-900 dark:text-white truncate">{trip.customerName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{trip.customerAddress}</p>
                </div>
              </div>
            </div>

            {/* Bottom info row */}
            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {trip.date}
                </span>
                <span>•</span>
                <span>{trip.distanceKm} km ({trip.durationMin} mnt)</span>
                <span>•</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">{trip.paymentMethod}</span>
              </div>

              <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5">
                Detail <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TRIP DETAIL MODAL */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400">
                  {selectedTrip.orderNumber}
                </span>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">Detail Pengantaran AWD</h3>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Waktu Order:</span>
                  <span className="font-bold">{selectedTrip.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Metode Bayar:</span>
                  <span className="font-bold">{selectedTrip.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jarak Tempuh:</span>
                  <span className="font-bold">{selectedTrip.distanceKm} km</span>
                </div>
              </div>

              {/* Rincian Komisi 90% */}
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <div className="flex justify-between text-slate-700 dark:text-slate-200">
                  <span>Total Ongkir Pemesan:</span>
                  <span className="font-mono font-bold">Rp {selectedTrip.grossDeliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span>Potongan Platform (10%):</span>
                  <span className="font-mono text-rose-500">-Rp {selectedTrip.platformFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="pt-1 border-t border-emerald-200 dark:border-emerald-800/80 flex justify-between font-black text-emerald-800 dark:text-emerald-300">
                  <span>Komisi Bersih Driver (90%):</span>
                  <span className="font-mono text-sm">Rp {selectedTrip.driverCommission.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedTrip(null)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
