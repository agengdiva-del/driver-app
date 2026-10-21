import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  Image,
  CheckCheck,
  Bike,
  Store,
  Sparkles,
  Phone
} from 'lucide-react';

export const ChatModal: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendMessage,
    activeOrder,
    showToast
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [activeRecipient, setActiveRecipient] = useState<'driver' | 'merchant'>('driver');

  if (!isChatOpen) return null;

  const quickChips = [
    'Saya tunggu di depan pagar ya pak 🙏',
    'Pesanan sudah sesuai aplikasi ya',
    'Hati-hati di jalan pak',
    'Tolong sambal dipisah ya kang'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleSendChip = (chip: string) => {
    sendMessage(chip);
  };

  const handleSendPhoto = () => {
    sendMessage(
      'Foto patokan rumah (Pagar hijau depan Musholla Al-Falah)',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&auto=format&fit=crop&q=80'
    );
    showToast('Foto terkirim ke driver', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full h-[85vh] flex flex-col justify-between shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="p-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={
                  activeRecipient === 'driver'
                    ? activeOrder?.driver?.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=150&auto=format&fit=crop&q=80'
                }
                alt="Chat Avatar"
                className="w-10 h-10 rounded-2xl object-cover border border-blue-500 shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full ring-2 ring-white dark:ring-stone-900" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                  {activeRecipient === 'driver'
                    ? activeOrder?.driver?.name || 'Kang Asep Kurniawan'
                    : activeOrder?.merchantName || 'Empal Gentong H. Apud'}
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {activeRecipient === 'driver'
                  ? `${activeOrder?.driver?.vehiclePlate || 'E 4521 AR'} • Driver Arja`
                  : 'Merchant Terverifikasi'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Recipient Toggle: Driver vs Merchant */}
            <div className="flex bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => setActiveRecipient('driver')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  activeRecipient === 'driver'
                    ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-stone-500'
                }`}
              >
                Driver
              </button>
              <button
                onClick={() => setActiveRecipient('merchant')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  activeRecipient === 'merchant'
                    ? 'bg-white dark:bg-stone-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-stone-500'
                }`}
              >
                Resto
              </button>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          <div className="text-center my-2">
            <span className="text-[10px] text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-2.5 py-1 rounded-full font-medium">
              Obrolan dienkripsi untuk privasi pelanggan & mitra
            </span>
          </div>

          {chatMessages.map((msg) => {
            const isMe = msg.senderType === 'customer';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-xs ${
                    isMe
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-xs border border-stone-200/60 dark:border-stone-700'
                  }`}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Lampiran"
                      className="w-full max-h-40 object-cover rounded-xl mb-2"
                    />
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-400 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-sky-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Chips & Input Field */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900 space-y-2">
          {/* Quick response chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChip(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:border-blue-500 hover:text-blue-600 transition-colors shrink-0 shadow-xs"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendPhoto}
              className="p-2.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:text-blue-600 text-stone-500 transition-colors shadow-xs"
              title="Kirim Foto Patokan"
            >
              <Image className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Kirim pesan ke ${activeRecipient === 'driver' ? 'driver' : 'resto'}...`}
              className="flex-1 p-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-blue-500 outline-none shadow-xs"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:opacity-40 transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
