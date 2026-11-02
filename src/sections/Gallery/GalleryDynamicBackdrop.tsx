import React, { useState, useEffect } from 'react';

interface GalleryDynamicBackdropProps {
  src: string;
}

/**
 * DYNAMIC AMBIENT BACKDROP UNTUK SECTION GALLERY
 * - Berubah dinamis mengikuti foto yang sedang aktif di-scroll
 * - Transisi cross-fade lembut antar foto (dissolve sinematik)
 * - Foto terlihat jelas (blur halus 2px, opacity 50-60%)
 * - Gradasi tipis di bagian atas, bawah, kiri, dan kanan yang meluruh
 *   secara mulus ke dalam warna latar halaman utama (#FBF8F3)
 */
export const GalleryDynamicBackdrop: React.FC<GalleryDynamicBackdropProps> = ({ src }) => {
  const [state, setState] = useState<{ current: string; previous: string | null }>({
    current: src,
    previous: null,
  });

  // Pola resmi React untuk menyesuaikan state saat prop berubah tanpa cascading effect
  if (state.current !== src) {
    setState({
      current: src,
      previous: state.current,
    });
  }

  // Bersihkan layer sebelumnya setelah transisi selesai
  useEffect(() => {
    if (state.previous) {
      const timer = setTimeout(() => {
        setState((s) => ({ ...s, previous: null }));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [state.previous]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 2.5%, rgba(0,0,0,0.55) 5.5%, black 9%, black 91%, rgba(0,0,0,0.55) 94.5%, rgba(0,0,0,0.12) 97.5%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 2.5%, rgba(0,0,0,0.55) 5.5%, black 9%, black 91%, rgba(0,0,0,0.55) 94.5%, rgba(0,0,0,0.12) 97.5%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* 1. LAYER FOTO SEBELUMNYA */}
      {state.previous && (
        <img
          src={state.previous}
          alt=""
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center filter blur-[2px] scale-105 opacity-0 transition-opacity duration-700 ease-out"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 1.5%, rgba(0,0,0,0.7) 3.5%, black 6%, black 94%, rgba(0,0,0,0.7) 96.5%, rgba(0,0,0,0.18) 98.5%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 1.5%, rgba(0,0,0,0.7) 3.5%, black 6%, black 94%, rgba(0,0,0,0.7) 96.5%, rgba(0,0,0,0.18) 98.5%, transparent 100%)',
          }}
        />
      )}

      {/* 2. LAYER FOTO AKTIF (JELAS, VIBRANT, DAN MENAWAN DENGAN KURVA ELEGAN) */}
      <img
        key={state.current}
        src={state.current}
        alt=""
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center filter blur-[1px] scale-102 opacity-55 sm:opacity-65 transition-opacity duration-700 ease-out"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 1.5%, rgba(0,0,0,0.7) 3.5%, black 6%, black 94%, rgba(0,0,0,0.7) 96.5%, rgba(0,0,0,0.18) 98.5%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 1.5%, rgba(0,0,0,0.7) 3.5%, black 6%, black 94%, rgba(0,0,0,0.7) 96.5%, rgba(0,0,0,0.18) 98.5%, transparent 100%)',
        }}
      />

      {/* 3. GRADASI PINGGIRAN TIPIS: MELEBUR HALUS DI PERIMETER TANPA MEMOTONG FOTO */}
      <div className="absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-bg-main via-bg-main/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-bg-main via-bg-main/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-bg-main via-bg-main/40 to-transparent pointer-events-none z-10" />
    </div>
  );
};
