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
 * LAYOUT 4: 3D MOVIE POSTER INFINITE CAROUSEL (SILKY SMOOTH 60 FPS)
 * - Tampilan visual 100% presisi persis seperti aslinya (indikator pill titik dot & tanpa caption tambahan).
 * - Transisi GPU presisi tinggi via `translate3d(x, 0, z)` dan `rotateY` tanpa konflik z-index.
 * - Horizon fade out halus pada offset ±3 agar kartu masuk dan keluar tanpa pernah terputus / pop-in.
 * - Easing bezier ergonomis `cubic-bezier(0.22, 1, 0.36, 1)` (cepat merespons, meluncur anggun).
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

  const handleSelectIndex = useCallback(
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

  // Touch Handlers untuk Swipe Responsif di Smartphone
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
    if (touchDelta > 40) {
      handlePrev();
    } else if (touchDelta < -40) {
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
      if (touchDelta > 40) {
        handlePrev();
      } else if (touchDelta < -40) {
        handleNext();
      }
    }
    mouseStartX.current = null;
    setTouchDelta(0);
    setIsDragging(false);
  };

  // Preload gambar tetangga untuk transisi instan
  useEffect(() => {
    const nextIdx = (activeIndex + 1) % total;
    const prevIdx = (activeIndex - 1 + total) % total;
    [items[nextIdx]?.thumb, items[prevIdx]?.thumb, items[nextIdx]?.src, items[prevIdx]?.src].forEach(
      (src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      },
    );
  }, [activeIndex, items, total]);

  return (
    <div
      className="relative w-full py-2 select-none focus-visible:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Karusel Foto Poster Film. Gunakan tombol panah kiri dan kanan untuk menjelajah."
    >
      {/* ========================================================================= */}
      {/* 3D POSTER STAGE CONTAINER (SINGLE ROOT PERSPECTIVE UNTUK HARDWARE ACCELERATION) */}
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
        <div
          className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, idx) => {
            // Hitung jarak siklus terpendek terhadap activeIndex (modulo N)
            let offset = (idx - activeIndex) % total;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            // Render hingga offset ±3 untuk fading horizon yang sempurna tanpa pop-in
            if (Math.abs(offset) > 3) return null;

            // Parameter Kinematik 3D GPU
            let translateX = '0%';
            let translateZ = 0;
            let scale = 1;
            let rotateY = 0;
            let opacity = 1;
            let zIndex = 30;
            let filter = 'none';
            let boxShadow = '0 24px 50px -10px rgba(0,0,0,0.42), 0 8px 24px -6px rgba(155,44,36,0.22)';

            if (isCenter) {
              translateX = '0%';
              translateZ = 110;
              scale = 1.0;
              rotateY = 0;
              opacity = 1;
              zIndex = 30;
              filter = 'none';
              boxShadow = '0 24px 50px -10px rgba(0,0,0,0.45), 0 8px 24px -6px rgba(155,44,36,0.28)';
            } else if (isPrev) {
              translateX = '-62%';
              translateZ = 0;
              scale = 0.86;
              rotateY = 16;
              opacity = 0.7;
              zIndex = 20;
              filter = 'brightness(0.88)';
              boxShadow = '0 12px 30px -8px rgba(0,0,0,0.28)';
            } else if (isNext) {
              translateX = '62%';
              translateZ = 0;
              scale = 0.86;
              rotateY = -16;
              opacity = 0.7;
              zIndex = 20;
              filter = 'brightness(0.88)';
              boxShadow = '0 12px 30px -8px rgba(0,0,0,0.28)';
            } else if (offset === -2) {
              translateX = '-110%';
              translateZ = -90;
              scale = 0.73;
              rotateY = 26;
              opacity = 0.22;
              zIndex = 10;
              filter = 'brightness(0.72) blur(0.5px)';
              boxShadow = '0 6px 18px -6px rgba(0,0,0,0.2)';
            } else if (offset === 2) {
              translateX = '110%';
              translateZ = -90;
              scale = 0.73;
              rotateY = -26;
              opacity = 0.22;
              zIndex = 10;
              filter = 'brightness(0.72) blur(0.5px)';
              boxShadow = '0 6px 18px -6px rgba(0,0,0,0.2)';
            } else if (offset === -3) {
              translateX = '-150%';
              translateZ = -190;
              scale = 0.6;
              rotateY = 32;
              opacity = 0;
              zIndex = 5;
              filter = 'blur(1.5px)';
              boxShadow = 'none';
            } else if (offset === 3) {
              translateX = '150%';
              translateZ = -190;
              scale = 0.6;
              rotateY = -32;
              opacity = 0;
              zIndex = 5;
              filter = 'blur(1.5px)';
              boxShadow = 'none';
            }

            // Real-time Gesture Drag Shift yang dinamis untuk semua kartu
            const dragFactor = isCenter ? 0.35 : 0.22;
            const dragShift = isDragging ? touchDelta * dragFactor : 0;

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
                className="absolute w-[225px] sm:w-[265px] aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga select-none"
                style={{
                  transform: `translate3d(calc(${translateX} + ${dragShift}px), 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter,
                  boxShadow,
                  transition: isDragging
                    ? 'none'
                    : 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 480ms ease-out, filter 480ms ease-out, box-shadow 480ms ease-out',
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: Math.abs(offset) <= 1 ? 'auto' : 'none',
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
                  onClick={() => handleSelectIndex(dotIdx)}
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
