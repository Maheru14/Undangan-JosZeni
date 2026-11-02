import React from 'react';
import { FloralAccent, type FloralVariant } from './FloralAccent';

interface HangingFloralProps {
  className?: string;
  variant?: FloralVariant;
  cordLength?: number; // Panjang tali gantungan dalam pixel (default: 36)
  flowerClassName?: string;
  showDroplets?: boolean;
}

/**
 * GANTUNGAN BUNGA PERNIKAHAN DENGAN TALI EMAS & AYUNAN MULUS
 * - Tali gantungan benang emas (golden cord) berporos di langit-langit (top center)
 * - Rangkaian bunga mewah (floral garland) di tengah
 * - Titisan kristal emas (hanging droplets) di bawah
 * - Seluruh rangkaian berayun smooth ke kiri dan kanan dengan CSS GPU hardware acceleration
 * - 100% Super ringan: 0 KB JS overhead, 60 FPS
 */
export const HangingFloral: React.FC<HangingFloralProps> = ({
  className = '',
  variant = 'arch',
  cordLength = 36,
  flowerClassName = 'w-64 sm:w-80 h-16 sm:h-20',
  showDroplets = true,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center pointer-events-none select-none animate-floral-sway ${className}`}
      style={{ transformOrigin: '50% 0%' }}
      aria-hidden="true"
    >
      {/* 1. TALI & CINCIN GANTUNGAN EMAS DARI LANGIT-LANGIT */}
      <svg
        className="w-64 sm:w-80 overflow-visible"
        height={cordLength}
        viewBox={`0 0 320 ${cordLength}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hangingGoldCord" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.4" />
            <stop offset="40%" stopColor="var(--gold)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--gold-bright)" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Cincin Gantungan Atas */}
        <circle cx="160" cy="5" r="4" stroke="var(--gold-bright)" strokeWidth="1.2" fill="none" />
        <circle cx="160" cy="5" r="1.5" fill="var(--gold-bright)" />

        {/* Tali Gantungan Kiri & Kanan (Mengikat Bunga) */}
        <line
          x1="160"
          y1="9"
          x2="70"
          y2={cordLength}
          stroke="url(#hangingGoldCord)"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
        <line
          x1="160"
          y1="9"
          x2="250"
          y2={cordLength}
          stroke="url(#hangingGoldCord)"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />

        {/* Tali Tengah Halus */}
        <line
          x1="160"
          y1="9"
          x2="160"
          y2={cordLength}
          stroke="url(#hangingGoldCord)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Manik-Manik Emas Pengikat Bunga */}
        <circle cx="70" cy={cordLength - 1} r="2.5" fill="var(--gold-bright)" />
        <circle cx="250" cy={cordLength - 1} r="2.5" fill="var(--gold-bright)" />
        <circle cx="160" cy={cordLength - 1} r="2" fill="var(--gold-bright)" />
      </svg>

      {/* 2. RANGKAIAN BUNGA GANTUNG UTAMA */}
      <div className={`relative -mt-1 drop-shadow-xs ${flowerClassName}`}>
        <FloralAccent variant={variant} sway={false} className="w-full h-full" />
      </div>

      {/* 3. TITISAN KRISTAL / DROLET EMAS DI BAWAH BUNGA */}
      {showDroplets && (
        <svg
          className="w-64 sm:w-80 -mt-2 sm:-mt-2.5 overflow-visible"
          height="22"
          viewBox="0 0 320 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Droplet Tengah */}
          <line x1="160" y1="0" x2="160" y2="12" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="2 1.5" />
          <polygon points="160,20 156.5,14 160,9 163.5,14" fill="var(--gold-bright)" stroke="var(--gold)" strokeWidth="0.5" />

          {/* Droplet Kiri */}
          <line x1="110" y1="0" x2="110" y2="8" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.7" />
          <polygon points="110,14 107.5,10 110,6 112.5,10" fill="var(--gold-bright)" fillOpacity="0.85" />

          {/* Droplet Kanan */}
          <line x1="210" y1="0" x2="210" y2="8" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.7" />
          <polygon points="210,14 207.5,10 210,6 212.5,10" fill="var(--gold-bright)" fillOpacity="0.85" />
        </svg>
      )}
    </div>
  );
};
