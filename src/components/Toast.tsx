'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            )}
            {toast.type === 'warning' && (
              <AlertCircle className="w-5 h-5 text-[#FF5722]" strokeWidth={1.75} />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900">
              {toast.title}
            </p>
            {toast.description && (
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      ))}
    </aside>
  );
};
