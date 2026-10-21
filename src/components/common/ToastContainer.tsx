import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-emerald-600 text-white',
          info: 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900',
          warning: 'bg-amber-500 text-white',
          error: 'bg-rose-600 text-white'
        };

        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'warning'
            ? AlertTriangle
            : toast.type === 'error'
            ? AlertCircle
            : Info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold transition-all duration-300 animate-in slide-in-from-top-4 ${bgColors[toast.type]}`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1 leading-tight">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
