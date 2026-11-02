import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, User, Clock } from 'lucide-react';
import type { GuestMoment } from '../../lib/guestMomentsAdapter';

interface GuestLightboxProps {
  moments: GuestMoment[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function formatRelativeTime(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Baru saja';
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays === 1) return 'Kemarin';
    return `${diffDays} hari yang lalu`;
  } catch {
    return 'Beberapa waktu lalu';
  }
}

export const GuestLightbox: React.FC<GuestLightboxProps> = ({
  moments,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentMoment = moments[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentMoment) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Foto Momen Tamu"
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-md p-4 sm:p-8 select-none"
    >
      {/* Tombol Tutup */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup Penampil Foto"
        className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-night/70 text-on-night hover:text-gold-bright border border-gold/30 flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-5 h-5 stroke-[1.5]" />
      </button>

      {/* Tombol Panah Kiri */}
      {moments.length > 1 && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Foto Sebelumnya"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-night/70 text-on-night hover:text-gold-bright border border-gold/30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>
      )}

      {/* Kontainer Foto Utama */}
      <div className="relative max-w-2xl max-h-[85vh] w-full flex flex-col items-center justify-center">
        <div className="relative overflow-hidden rounded-xs border border-gold/40 shadow-2xl bg-bg-alt flex items-center justify-center max-h-[70vh]">
          <img
            src={currentMoment.imageUrl}
            alt={`Foto momen oleh ${currentMoment.guestName}`}
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.4';
            }}
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Informasi Pengunggah & Caption */}
        <div className="mt-3 text-center w-full max-w-md px-4">
          <div className="flex items-center justify-center gap-3 text-gold-bright text-xs font-body font-medium">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{currentMoment.guestName}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gold-bright/60" />
            <span className="flex items-center gap-1 text-[11px] text-on-night/70 font-light">
              <Clock className="w-3 h-3 stroke-[1.25]" />
              <span>{formatRelativeTime(currentMoment.createdAt)}</span>
            </span>
          </div>

          {currentMoment.caption && (
            <p className="font-body text-xs sm:text-sm text-on-night mt-1.5 leading-relaxed font-light italic">
              &ldquo;{currentMoment.caption}&rdquo;
            </p>
          )}

          <p className="font-body text-[10px] text-on-night/50 mt-1 uppercase tracking-widest">
            Foto {currentIndex + 1} dari {moments.length}
          </p>
        </div>
      </div>

      {/* Tombol Panah Kanan */}
      {moments.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Foto Berikutnya"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-night/70 text-on-night hover:text-gold-bright border border-gold/30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.5]" />
        </button>
      )}
    </div>
  );
};
