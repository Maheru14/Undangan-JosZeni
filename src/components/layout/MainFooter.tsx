import React from "react";
import { useAppContext } from "../../context/AppContext";

interface MainFooterProps {
  className?: string;
}

/**
 * Komponen Footer Halaman Undangan Utama (Main Page).
 * Menghadirkan bingkai kain Ulos Batak otentik yang SANGAT KENTARA & TEGAS di bagian paling bawah card undangan.
 * Menegaskan estetika Batak yang megah tanpa tabrakan dengan floating bottom navigation bar.
 */
export const MainFooter: React.FC<MainFooterProps> = ({ className = "" }) => {
  const { config } = useAppContext();
  const { groom, bride } = config.couple;

  return (
    <footer
      role="contentinfo"
      aria-label="Footer Penutup Kain Ulos Batak"
      className={`relative w-full bg-night text-on-night border-t-2 border-gold-bright overflow-hidden select-none pt-10 pb-28 sm:pb-32 px-4 sm:px-6 shadow-[0_-6px_25px_rgba(0,0,0,0.65)] ${className}`}
    >
      {/* 1. LAPISAN MOTIF KAIN ULOS BATAK YANG SANGAT KENTARA */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: "var(--asset-web-pattern, url(/images/gorga/batak-web-sapphire.webp))",
            backgroundSize: "230px auto",
            backgroundPosition: "center top",
            opacity: 0.85,
            filter: "contrast(1.2) brightness(1.15) drop-shadow(0 2px 4px rgba(0,0,0,0.85))",
          }}
        />
        {/* Lapisan Gradasi Warna Pekat Tradisional yang Menjaga Keterbacaan Teks */}
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/85 to-bg-web/95" />
      </div>

      {/* Garis Aksen Emas Ganda di Tepian Atas Footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold-bright to-gold/40 pointer-events-none" />
      <div className="absolute top-[3px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-bright/40 to-transparent pointer-events-none" />

      {/* 2. KONTEN FOOTER PENUTUP */}
      <div className="relative z-10 max-w-md mx-auto text-center flex flex-col items-center">
        {/* Pembatas Geometris Gorga Batak dengan Kotak Emas */}
        <div className="flex items-center justify-center gap-3 mb-3 text-gold-bright text-xs" aria-hidden="true">
          <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-bright to-gold-bright/40" />
          <span className="text-gold-bright text-base drop-shadow-[0_0_6px_rgba(217,180,94,0.6)]">❖</span>
          <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent via-gold-bright to-gold-bright/40" />
        </div>

        {/* Doa / Berkat Penutup */}
        <div className="inline-block px-4 py-1 rounded-full bg-night/80 border border-gold-bright/40 backdrop-blur-xs mb-2">
          <p className="font-body text-xs sm:text-sm tracking-[0.22em] text-gold-bright uppercase font-bold drop-shadow-sm">
            Doa &amp; Berkat
          </p>
        </div>

        <p className="font-body text-[11px] sm:text-xs text-on-night/85 italic max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-4 font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          &ldquo;Kiranya kasih karunia dan damai sejahtera dari Tuhan Yesus Kristus senantiasa menyertai kita sekalian.&rdquo;
        </p>

        <div className="w-20 h-[1px] bg-gold-bright/40 my-1" aria-hidden="true" />

        {/* Nama Kedua Mempelai & Hak Cipta */}
        <p className="font-display text-sm tracking-[0.22em] text-on-night font-bold uppercase mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          {groom.shortName} &amp; {bride.shortName}
        </p>

        {config.hashtag ? (
          <p className="font-body text-[10px] text-gold-bright/80 tracking-wider mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {config.hashtag}
          </p>
        ) : null}
      </div>
    </footer>
  );
};
