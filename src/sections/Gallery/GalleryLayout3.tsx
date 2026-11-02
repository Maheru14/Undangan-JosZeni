import React from 'react';
import { Expand, ImageOff } from 'lucide-react';
import { Reveal } from '../../components/layout/Reveal';
import type { GalleryItem } from '../../config/wedding.config';

interface GalleryLayout3Props {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

/**
 * LAYOUT 3: LARGE PORTRAIT SHOWCASE (BESAR SEPERTI PROFIL MEMPELAI)
 * - Skala Besar: Foto potret vertikal megah (aspect-[3/4] / max-w-sm sm:max-w-md) serupa CouplePortrait
 * - 100% Frameless: Tanpa bingkai fisik (border-0) dan tanpa garis pembatas kaku
 * - Sentuhan Gradasi Pinggir (Soft Gradient Masking & Vignette):
 *   1. Masking linier bawah meluruh lembut ke latar kertas krem (#FBF8F3)
 *   2. Soft inner edge feathering di sekeliling pinggiran foto agar menyatu halus
 * - Hairline Pemisah Beraksen Belah Ketupat Gorga di bawah setiap foto
 * - Murni Fotografi: Tanpa teks/kata-kata yang menempel di atas foto
 */
export const GalleryLayout3: React.FC<GalleryLayout3Props> = ({ items, onOpenLightbox }) => {
  return (
    <div className="space-y-12 sm:space-y-16 mt-8">
      {items.map((item, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <Reveal
            key={item.id}
            direction={isEven ? 'left' : 'right'}
            distance={40}
            duration={0.85}
            delay={0.05}
          >
            <div className="w-full flex flex-col items-center">
              {/* KARTU FOTO BESAR BERGRADASI PINGGIR */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenLightbox(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenLightbox(idx);
                  }
                }}
                aria-label={`Buka foto ${idx + 1}: ${item.caption || item.alt}`}
                className="group relative w-full max-w-[320px] sm:max-w-[370px] aspect-[3/4] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga select-none transition-transform duration-500"
              >
                {/* AKSEN BINTANG GORGA 4 SUDUT FLOATING PADA SUDUT ATAS */}
                <div
                  className={`absolute -top-2 ${
                    isEven ? '-left-2' : '-right-2'
                  } w-4 h-4 text-gorga/50 animate-pulse pointer-events-none z-20`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                  </svg>
                </div>

                {/* CONTAINER FOTO DENGAN SOFT GRADIENT MASKING (PERSIS PROFILE MEMPELAI) */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 76%, rgba(0,0,0,0) 99%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 76%, rgba(0,0,0,0) 99%)',
                  }}
                >
                  {/* Foto Asli Resolusi Tinggi */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fb = document.getElementById(`thumb-fallback-l3-${item.id}`);
                      if (fb) fb.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Fallback Box jika gambar gagal dimuat */}
                  <div
                    id={`thumb-fallback-l3-${item.id}`}
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col items-center justify-center p-6 bg-night/90 text-gold-bright"
                  >
                    <ImageOff className="w-8 h-8 mb-2" />
                    <p className="font-display text-xs text-gold-bright font-medium">
                      Foto {idx + 1}
                    </p>
                  </div>

                  {/* SENTUHAN GRADASI TIPIS DI PINGGIRNYA (FEATHERED INSET VIGNETTE) */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      boxShadow: 'inset 0 0 26px 10px rgba(251, 248, 243, 0.7)',
                    }}
                    aria-hidden="true"
                  />

                  {/* HOVER EXPAND OVERLAY HALUS */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Expand className="w-4 h-4 stroke-[1.75]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* HAIRLINE PEMISAH BERAKSEN BELAH KETUPAT (SEPERTI DI BAWAH COUPLE PORTRAIT) */}
              <div
                className="w-48 sm:w-56 flex items-center gap-2 mt-3 select-none"
                aria-hidden="true"
              >
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <span className="w-1 h-1 rotate-45 bg-gorga/70" />
                <span className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold/40" />
                <span className="w-1 h-1 rotate-45 bg-gorga/70" />
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};
