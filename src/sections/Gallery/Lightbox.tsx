import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import type { GalleryItem } from '../../config/wedding.config';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentItem = items[currentIndex];

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

  if (!isOpen || !currentItem) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Foto Galeri"
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-md p-4 sm:p-8 select-none"
    >
      {/* Tombol Tutup (Tap Target 48x48px) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup Penampil Foto"
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-night/70 text-on-night hover:text-gold-bright border border-gold/30 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright cursor-pointer"
      >
        <X className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Tombol Panah Kiri (Sebelumnya) */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Foto Sebelumnya"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-night/70 text-on-night hover:text-gold-bright border border-gold/30 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Kontainer Foto Utama (Murni Foto Tanpa Caption & Tanpa Bingkai) */}
      <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-transparent flex items-center justify-center min-w-[260px] min-h-[300px] max-h-[88vh]">
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = document.getElementById(`lightbox-fallback-${currentItem.id}`);
              if (fallback) fallback.style.display = 'flex';
            }}
            className="max-h-[88vh] w-auto max-w-full object-contain rounded-2xl"
          />

          {/* Fallback Tonal bila file gambar belum ada */}
          <div
            id={`lightbox-fallback-${currentItem.id}`}
            style={{ display: 'none' }}
            className="w-80 h-96 flex-col items-center justify-center p-6 text-center text-ink-muted bg-bg-alt rounded-2xl"
          >
            <ImageOff className="w-10 h-10 text-gold-text mb-3 stroke-[1.25]" />
          </div>
        </div>
      </div>

      {/* Tombol Panah Kanan (Berikutnya) */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Foto Berikutnya"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-night/70 text-on-night hover:text-gold-bright border border-gold/30 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 stroke-[1.5]" />
      </button>
    </div>
  );
};
