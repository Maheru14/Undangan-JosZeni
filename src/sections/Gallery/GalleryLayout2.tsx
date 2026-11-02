import React from 'react';
import { Expand, ImageOff } from 'lucide-react';
import { Reveal } from '../../components/layout/Reveal';
import type { GalleryItem } from '../../config/wedding.config';

interface GalleryLayout2Props {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

/**
 * LAYOUT 2: MODERN FRAMELESS EDITORIAL MOSAIC (MURNI TANPA BINGKAI & TANPA TEKS)
 * - 100% Frameless: Tanpa garis bingkai (border-0) & tanpa ornamen sudut
 * - Bersih Tanpa Teks: Foto tampil utuh tanpa tulisan/kata-kata yang menutupi gambar
 * - Ritme Asimetris Modern: Hero card, duo staggered, panorama senja, dan duo organik
 * - Sudut lengkung rounded-2xl dengan bayangan halus (ambient elevation)
 * - Efek zoom halus (scale-104) saat disentuh/hover dengan transisi lembut
 */
export const GalleryLayout2: React.FC<GalleryLayout2Props> = ({ items, onOpenLightbox }) => {
  return (
    <div className="space-y-3.5 sm:space-y-4 mt-6">
      {/* 1. HERO SPOTLIGHT CARD (FOTO 1 - SPANNING FULL WIDTH) */}
      {items[0] && (
        <Reveal direction="up" distance={30} duration={0.8}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenLightbox(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(0);
              }
            }}
            aria-label={`Buka foto: ${items[0].caption || items[0].alt}`}
            className="group relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.18)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
          >
            {/* Foto Murni Tanpa Tulisan */}
            <img
              src={items[0].src}
              alt={items[0].alt}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                const fb = document.getElementById('thumb-fallback-l2-0');
                if (fb) fb.style.display = 'flex';
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Fallback jika gambar gagal dimuat */}
            <div
              id="thumb-fallback-l2-0"
              style={{ display: 'none' }}
              className="w-full h-full flex items-center justify-center bg-night/90 text-gold-bright"
            >
              <ImageOff className="w-8 h-8" />
            </div>

            {/* Indikator Halus Saat Disentuh / Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Expand className="w-4 h-4 stroke-[1.75]" />
              </span>
            </div>
          </div>
        </Reveal>
      )}

      {/* 2. ASYMMETRIC STAGGERED DUO (FOTO 2 & 3) */}
      {items.length > 2 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Foto 2 */}
          <Reveal direction="left" distance={30} duration={0.8} delay={0.1}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox(1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(1);
                }
              }}
              aria-label={`Buka foto: ${items[1].caption || items[1].alt}`}
              className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
            >
              <img
                src={items[1].thumb}
                alt={items[1].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Expand className="w-3.5 h-3.5 stroke-[1.75]" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Foto 3 - Offset Melayang ke Bawah */}
          <Reveal direction="right" distance={30} duration={0.8} delay={0.15}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox(2)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(2);
                }
              }}
              aria-label={`Buka foto: ${items[2].caption || items[2].alt}`}
              className="group relative w-full aspect-[3/4] mt-3 sm:mt-5 rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
            >
              <img
                src={items[2].thumb}
                alt={items[2].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Expand className="w-3.5 h-3.5 stroke-[1.75]" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* 3. CINEMATIC SUNSET PANORAMA (FOTO 4 - SPANNING FULL WIDTH) */}
      {items[3] && (
        <Reveal direction="up" distance={30} duration={0.8}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenLightbox(3)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(3);
              }
            }}
            aria-label={`Buka foto: ${items[3].caption || items[3].alt}`}
            className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.18)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
          >
            <img
              src={items[3].src}
              alt={items[3].alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Expand className="w-4 h-4 stroke-[1.75]" />
              </span>
            </div>
          </div>
        </Reveal>
      )}

      {/* 4. MODULAR DUO GRID (FOTO 5 & 6) */}
      {items.length > 5 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Foto 5 */}
          <Reveal direction="left" distance={30} duration={0.8}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox(4)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(4);
                }
              }}
              aria-label={`Buka foto: ${items[4].caption || items[4].alt}`}
              className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
            >
              <img
                src={items[4].thumb}
                alt={items[4].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Expand className="w-3.5 h-3.5 stroke-[1.75]" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Foto 6 */}
          <Reveal direction="right" distance={30} duration={0.8} delay={0.1}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox(5)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(5);
                }
              }}
              aria-label={`Buka foto: ${items[5].caption || items[5].alt}`}
              className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
            >
              <img
                src={items[5].thumb}
                alt={items[5].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Expand className="w-3.5 h-3.5 stroke-[1.75]" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* 5. FINALE ROMANTIC DUO (FOTO 7 & 8) */}
      {items.length > 7 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Foto 7 */}
          <Reveal direction="left" distance={30} duration={0.8}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox(6)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(6);
                }
              }}
              aria-label={`Buka foto: ${items[6].caption || items[6].alt}`}
              className="group relative w-full aspect-[3/4] mt-2 rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
            >
              <img
                src={items[6].thumb}
                alt={items[6].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Expand className="w-3.5 h-3.5 stroke-[1.75]" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Foto 8 */}
          <Reveal direction="right" distance={30} duration={0.8} delay={0.1}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox(7)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenLightbox(7);
                }
              }}
              aria-label={`Buka foto: ${items[7].caption || items[7].alt}`}
              className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.16)] bg-[#EFE8DE] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorga transition-shadow duration-500"
            >
              <img
                src={items[7].thumb}
                alt={items[7].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Expand className="w-3.5 h-3.5 stroke-[1.75]" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
};
