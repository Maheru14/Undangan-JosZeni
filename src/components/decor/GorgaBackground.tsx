import React from 'react';

interface GorgaBackgroundProps {
  className?: string;
  opacity?: number;
}

/**
 * Komponen Latar Belakang Web Adat Batak Global (Warna Gelap di Luar Card).
 * Bingkai motif tenun Ulos Bintang Maratur & Geometris Batak TETAP pada posisinya (fixed)
 * di sisi ATAS (header) dan BAWAH (footer) layar:
 * - Tidak menghilang saat di-scroll
 * - Tidak baru muncul jika di-scroll ke bawah
 * - Tetap ramping di tepian atas & bawah, TIDAK sampai ke tengah layar.
 * Bagian tengah layar dibiarkan bersih dengan gradasi malam pekat yang mewah.
 */
export const GorgaBackground: React.FC<GorgaBackgroundProps> = ({
  className = '',
  opacity = 0.55,
}) => {
  return (
    <aside
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-bg-web ${className}`}
    >
      {/* 1. LAPISAN DASAR GRADASI MALAM PEKAT (FIXED DI SELURUH LAYAR) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, var(--bg-web-gradient-from, #060D1A), var(--bg-web-gradient-via, #09162D), var(--bg-web-gradient-to, #040810))',
        }}
      />
      <div className="absolute inset-0 bg-radial from-gold-bright/10 via-transparent to-black/85" />

      {/* 2. BINGKAI KAIN ULOS SISI ATAS / HEADER (FIXED, TIDAK HILANG SAAT SCROLL) */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 pointer-events-none overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage:
              'var(--asset-web-pattern, url(/images/gorga/batak-web-sapphire.webp))',
            backgroundSize: '220px auto',
            backgroundPosition: 'center top',
            opacity,
            filter: 'drop-shadow(0 0 2px rgba(216, 180, 95, 0.35))',
          }}
        />
        {/* Garis Hairline Emas Halus di Tepian Paling Atas */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-bright/40 to-transparent" />
      </div>

      {/* 3. BINGKAI KAIN ULOS SISI BAWAH / FOOTER (FIXED, SELALU ADA, TIDAK BARU MUNCUL SAAT SCROLL) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage:
              'var(--asset-web-pattern, url(/images/gorga/batak-web-sapphire.webp))',
            backgroundSize: '220px auto',
            backgroundPosition: 'center bottom',
            opacity,
            filter: 'drop-shadow(0 0 2px rgba(216, 180, 95, 0.35))',
          }}
        />
        {/* Garis Hairline Emas Halus di Tepian Paling Bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-bright/40 to-transparent" />
      </div>
    </aside>
  );
};
