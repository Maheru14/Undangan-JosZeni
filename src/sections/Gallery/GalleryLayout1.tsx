import React from 'react';
import { ImageOff, ZoomIn } from 'lucide-react';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { Reveal } from '../../components/layout/Reveal';
import type { GalleryItem } from '../../config/wedding.config';

interface GalleryLayout1Props {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

/**
 * LAYOUT 1: KLASIK BERBINGKAI & ORNAMEN SUDUT GORGA
 * - Grid seragam 2 kolom
 * - Rasio aspek 4:5
 * - Bingkai garis emas (border border-gold/40)
 * - Ornamen sudut Gorga pada setiap foto
 * - Fallback tonal bertema Batak
 */
export const GalleryLayout1: React.FC<GalleryLayout1Props> = ({ items, onOpenLightbox }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
      {items.map((item, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <Reveal
            key={item.id}
            direction={isLeft ? 'left' : 'right'}
            distance={50}
            duration={0.8}
          >
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
              aria-label={`Buka foto: ${item.caption || item.alt}`}
              className="group relative aspect-4/5 rounded-xs overflow-hidden bg-[#F4EEE6] border border-gold/40 shadow-md hover:border-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
            >
              {/* Ornamen Sudut Gorga Mini */}
              <CornerOrnament size={20} opacity={0.65} variant="gorga" />

              {/* Gambar / Fallback Tonal */}
              <img
                src={item.thumb}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  const fallback = document.getElementById(`thumb-fallback-l1-${item.id}`);
                  if (fallback) fallback.style.display = 'flex';
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tonal Fallback Box jika gambar lokal belum diisi */}
              <div
                id={`thumb-fallback-l1-${item.id}`}
                style={{ display: 'none' }}
                className="w-full h-full flex-col items-center justify-center p-3 text-center bg-night/90 text-on-night/70 border border-dashed border-gold/40"
              >
                <ImageOff className="w-5 h-5 text-gold-bright mb-1 stroke-[1.25]" />
                <p className="font-display text-[11px] text-gold-bright font-medium leading-tight">
                  {item.caption || `Foto 0${idx + 1}`}
                </p>
                <span className="text-[9px] text-on-night/50 mt-0.5 italic">
                  [Foto {idx + 1}]
                </span>
              </div>

              {/* Overlay Hover Icon */}
              <div className="absolute inset-0 bg-night/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2 rounded-full bg-night/90 text-gold-bright border border-gold-bright shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};
