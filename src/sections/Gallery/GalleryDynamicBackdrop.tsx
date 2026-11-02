import React, { useState } from 'react';

interface GalleryDynamicBackdropProps {
  src: string;
}

/**
 * DYNAMIC AMBIENT BACKDROP UNTUK SECTION GALLERY (FLUID LIQUID CROSSFADE)
 * - Menggunakan arsitektur 2-Slot Alternating Image Layer permanen di DOM.
 * - Tanpa unmount/remount dengan `key`, sehingga 100% bebas flicker/kedipan putih.
 * - Cross-fade dissolve sinematik 600ms yang sangat halus antar foto.
 * - Gradasi multi-arah meluruh lembut ke dalam palet latar halaman (#F7FAFD / #FBF8F3).
 */
export const GalleryDynamicBackdrop: React.FC<GalleryDynamicBackdropProps> = ({ src }) => {
  // Dua slot gambar permanen: satu aktif (visible), satu standby (hidden)
  const [slots, setSlots] = useState<{
    activeSlot: 0 | 1;
    prevPropSrc: string;
    slot0: string;
    slot1: string;
  }>({
    activeSlot: 0,
    prevPropSrc: src,
    slot0: src,
    slot1: src,
  });

  // Pola resmi React: sesuaikan state langsung saat prop berubah tanpa effect cascading
  if (src !== slots.prevPropSrc) {
    if (slots.activeSlot === 0) {
      setSlots({
        activeSlot: 1,
        prevPropSrc: src,
        slot0: slots.slot0,
        slot1: src,
      });
    } else {
      setSlots({
        activeSlot: 0,
        prevPropSrc: src,
        slot0: src,
        slot1: slots.slot1,
      });
    }
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 3%, rgba(0,0,0,0.6) 6%, black 10%, black 90%, rgba(0,0,0,0.6) 94%, rgba(0,0,0,0.15) 97%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 3%, rgba(0,0,0,0.6) 6%, black 10%, black 90%, rgba(0,0,0,0.6) 94%, rgba(0,0,0,0.15) 97%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* SLOT 0 LAYER */}
      <img
        src={slots.slot0}
        alt=""
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center filter blur-[1.5px] scale-102 pointer-events-none transition-opacity duration-600 ease-in-out ${
          slots.activeSlot === 0 ? 'opacity-55 sm:opacity-65' : 'opacity-0'
        }`}
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 2%, rgba(0,0,0,0.7) 4%, black 7%, black 93%, rgba(0,0,0,0.7) 96%, rgba(0,0,0,0.2) 98%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 2%, rgba(0,0,0,0.7) 4%, black 7%, black 93%, rgba(0,0,0,0.7) 96%, rgba(0,0,0,0.2) 98%, transparent 100%)',
          willChange: 'opacity',
        }}
      />

      {/* SLOT 1 LAYER */}
      <img
        src={slots.slot1}
        alt=""
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center filter blur-[1.5px] scale-102 pointer-events-none transition-opacity duration-600 ease-in-out ${
          slots.activeSlot === 1 ? 'opacity-55 sm:opacity-65' : 'opacity-0'
        }`}
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 2%, rgba(0,0,0,0.7) 4%, black 7%, black 93%, rgba(0,0,0,0.7) 96%, rgba(0,0,0,0.2) 98%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 2%, rgba(0,0,0,0.7) 4%, black 7%, black 93%, rgba(0,0,0,0.7) 96%, rgba(0,0,0,0.2) 98%, transparent 100%)',
          willChange: 'opacity',
        }}
      />

      {/* GRADASI PINGGIRAN TIPIS: MELEBUR HALUS DI PERIMETER TANPA MEMOTONG FOTO */}
      <div className="absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-bg-main via-bg-main/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-bg-main via-bg-main/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-bg-main via-bg-main/40 to-transparent pointer-events-none z-10" />
    </div>
  );
};
