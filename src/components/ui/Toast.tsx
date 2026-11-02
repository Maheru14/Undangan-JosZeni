import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

/**
 * Komponen Toast Notifikasi Visual.
 * Muncul melayang di bagian bawah tengah layar saat teks berhasil disalin ke clipboard.
 */
export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-night/95 text-on-night border border-gold/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none select-none max-w-[90vw]"
    >
      <CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0 stroke-[2]" />
      <span className="font-body text-xs sm:text-sm font-medium tracking-wide">
        {message}
      </span>
    </div>
  );
};
