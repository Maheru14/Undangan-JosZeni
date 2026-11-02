import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Expand, ImageOff } from 'lucide-react';
import { Reveal } from '../../components/layout/Reveal';
import type { GalleryItem } from '../../config/wedding.config';

interface GalleryLayout4Props {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
  onActiveIndexChange?: (index: number) => void;
}

/**
 * LAYOUT 4: 3D MOVIE POSTER INFINITE CAROUSEL (COVERFLOW POSTER FILM)
 * - Foto Utama di Tengah (Center Stage) dengan Rasio Poster Film (aspect-[2/3])
 * - Foto Sebelumnya & Selanjutnya Terlihat di Belakang Kiri & Kanan (Depth Perspective 3D)
 * - Infinite Loop / Scroll Tanpa Batas dengan Siklus Berputar
 * - Dynamic Ambient Background: Ditangani oleh GalleryDynamicBackdrop di root section
 *   dengan gradasi tipis di bagian atas, kiri, dan kanan yang meluruh halus ke latar halaman utama
 * - Dukungan Swipe Sentuh (Touch Drag), Tombol Panah Elegan, dan Indikator Pill
 * - 100% Frameless & Bebas Teks di Foto: Klik foto tengah membuka Lightbox resolusi tinggi
 */
export const GalleryLayout4: React.FC<GalleryLayout4Props> = ({
  items,
  onOpenLightbox,
  onActiveIndexChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const total = items.length;

  const updateActiveIndex = useCallback(
    (newIndex: number) => {
      setActiveIndex(newIndex);
      onActiveIndexChange?.(newIndex);
    },
    [onActiveIndexChange],
  );

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + total) % total;
      onActiveIndexChange?.(next);
      return next;
    });
  }, [total, onActiveIndexChange]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % total;
      onActiveIndexChange?.(next);
      return next;
    });
  }, [total, onActiveIndexChange]);

  // Sinkronisasi inisial index ke parent
  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  // Keyboard navigation untuk aksesibilitas (panah kiri / kanan)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext],
  );

  // Touch Handlers untuk Swipe Responsif
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDelta(currentX - touchStart);
  };

  const onTouchEnd = () => {
    if (touchStart === null) return;
    if (touchDelta > 45) {
      handlePrev();
    } else if (touchDelta < -45) {
      handleNext();
    }
    setTouchStart(null);
    setTouchDelta(0);
    setIsDragging(false);
  };

  // Mouse Pointer Handlers untuk Desktop Dragging
  const mouseStartX = useRef<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current === null || !isDragging) return;
    setTouchDelta(e.clientX - mouseStartX.current);
  };

  const onMouseUp = () => {
    if (mouseStartX.current !== null) {
      if (touchDelta > 45) {
        handlePrev();
      } else if (touchDelta < -45) {
        handleNext();
      }
    }
    mouseStartX.current = null;
    setTouchDelta(0);
    setIsDragging(false);
  };

  // Preload gambar tetangga untuk transisi mulus
  useEffect(() => {
    const nextIdx = (activeIndex + 1) % total;
    const prevIdx = (activeIndex - 1 + total) % total;
    [items[nextIdx]?.src, items[prevIdx]?.src].forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [activeIndex, items, total]);

  return (
    <div
      className="relative w-full py-2 select-none focus-visible:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Karusel Foto Poster Film. Gunakan tombol panah kiri dan kanan untuk menjelajah."
    >
      {/* ========================================================================= */}
      {/* COVERFLOW 3D POSTER STAGE CONTAINER */}
      {/* ========================================================================= */}
      <div
        className="relative z-10 w-full max-w-lg mx-auto py-6 sm:py-8 overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1000px]">
          {items.map((item, idx) => {
            // Hitung jarak siklus terpendek terhadap activeIndex (modulo N)
            let offset = (idx - activeIndex) % total;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Transformasi 3D Film Poster
            let translateX = '0%';
            let scale = 1;
            let rotateY = 0;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              translateX = '0%';
              scale = 1;
              rotateY = 0;
              opacity = 1;
              zIndex = 30;
            } else if (isPrev) {
              translateX = '-64%';
              scale = 0.84;
              rotateY = 12;
              opacity = 0.6;
              zIndex = 20;
            } else if (isNext) {
              translateX = '64%';
              scale = 0.84;
              rotateY = -12;
              opacity = 0.6;
              zIndex = 20;
            } else if (offset === -2) {
              translateX = '-115%';
              scale = 0.7;
              rotateY = 20;
              opacity = 0;
              zIndex = 10;
            } else if (offset === 2) {
              translateX = '115%';
              scale = 0.7;
              rotateY = -20;
              opacity = 0;
              zIndex = 10;
            }

            // Tambahkan dragging offset kecil saat digeser
            const dragShift = isCenter && isDragging ? touchDelta * 0.2 : 0;

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={isCenter ? 0 : -1}
                onClick={() => {
                  if (isCenter) {
                    onOpenLightbox(idx);
                  } else if (isPrev) {
                    handlePrev();
                  } else if (isNext) {
                    handleNext();
                  }
                }}
                onKeyDown={(e) => {
                  if (isCenter && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onOpenLightbox(idx);
                  }
                }}
                aria-label={
                  isCenter
                    ? `Foto Utama ${idx + 1} dari ${total}: ${item.caption || item.alt}. Klik untuk memperbesar.`
                    : isPrev
                      ? `Foto Sebelumnya ${idx + 1}. Klik untuk beralih.`
                      : `Foto Selanjutnya ${idx + 1}. Klik untuk beralih.`
                }
                className="absolute w-[225px] sm:w-[265px] aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga select-none"
                style={{
                  transform: `translateX(calc(${translateX} + ${dragShift}px)) scale(${scale}) perspective(900px) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  boxShadow: isCenter
                    ? '0 20px 45px -10px rgba(0,0,0,0.38), 0 10px 20px -5px rgba(155,44,36,0.2)'
                    : '0 10px 25px -8px rgba(0,0,0,0.2)',
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, box-shadow 0.5s ease',
                }}
              >
                {/* Foto Resolusi Teroptimasi untuk Carousel */}
                <img
                  src={item.thumb || item.src}
                  alt={item.alt}
                  loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const fb = document.getElementById(`thumb-fallback-l4-${item.id}`);
                    if (fb) fb.style.display = 'flex';
                  }}
                  className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Fallback Box jika gambar lokal belum termuat */}
                <div
                  id={`thumb-fallback-l4-${item.id}`}
                  style={{ display: 'none' }}
                  className="w-full h-full flex flex-col items-center justify-center p-4 bg-night/90 text-gold-bright text-center"
                >
                  <ImageOff className="w-7 h-7 mb-1" />
                  <p className="font-display text-xs text-gold-bright">
                    Foto {idx + 1}
                  </p>
                </div>

                {/* Sentuhan Gradasi Tipis di Pinggiran Poster Agar Menyatu Anggun */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow: 'inset 0 0 16px 2px rgba(251, 248, 243, 0.35)',
                  }}
                  aria-hidden="true"
                />

                {/* Indikator Hover Khusus Foto Tengah */}
                {isCenter && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 hover:scale-100 transition-transform duration-300">
                      <Expand className="w-4 h-4 stroke-[1.75]" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. KONTROL NAVIGASI (PANAH KIRI / KANAN & INDIKATOR PILL) */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center mt-2 space-y-4">
        {/* Tombol Panah Melingkar */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto sebelumnya"
            className="w-10 h-10 rounded-full bg-surface/90 text-ink border border-gold/40 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga hover:bg-gorga hover:text-white active:bg-gorga active:text-white active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Indikator Titik & Nomor Momen */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-alt/80 backdrop-blur-xs border border-gold/30">
            {items.map((_, dotIdx) => {
              const isActive = dotIdx === activeIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => updateActiveIndex(dotIdx)}
                  aria-label={`Pindah ke foto ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-6 bg-gorga'
                      : 'w-2 bg-gold/40 hover:bg-gold/80'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Foto selanjutnya"
            className="w-10 h-10 rounded-full bg-surface/90 text-ink border border-gold/40 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga hover:bg-gorga hover:text-white active:bg-gorga active:text-white active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* Hairline Pemisah Beraksen Tiga Belah Ketupat */}
        <Reveal direction="up" distance={15}>
          <div className="w-44 sm:w-52 flex items-center gap-2 pt-1 select-none" aria-hidden="true">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <span className="w-1 h-1 rotate-45 bg-gorga/70" />
            <span className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold/40" />
            <span className="w-1 h-1 rotate-45 bg-gorga/70" />
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
          </div>
        </Reveal>
      </div>
    </div>
  );
};
