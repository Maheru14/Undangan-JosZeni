import React from "react";
import { useAppContext } from "../../context/AppContext";

interface MainNavbarProps {
  className?: string;
}

/**
 * Komponen Navbar / Header Utama Halaman Undangan (Main Page).
 * Menampilkan motif tenun kain Ulos Batak otentik yang TEGAS, JELAS, dan KENTARA.
 * Memberikan identitas budaya Batak yang mewah dan kuat di layar mobile maupun desktop.
 */
export const MainNavbar: React.FC<MainNavbarProps> = ({ className = "" }) => {
  const { config, isOpened } = useAppContext();

  // Jika belum dibuka, sembunyikan (Cover yang aktif)
  if (!isOpened) {
    return null;
  }

  const { groom, bride } = config.couple;

  return (
    <header
      role="banner"
      aria-label="Header Menu Undangan"
      className={`sticky top-0 inset-x-0 z-30 w-full h-16 sm:h-18 bg-night border-b-2 border-gold-bright shadow-[0_6px_25px_rgba(0,0,0,0.65)] select-none ${className}`}
    >
      {/* 1. LAPISAN MOTIF KAIN ULOS BATAK YANG SANGAT KENTARA & TEGAS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pola Tenun Ulos Bintang Maratur / Sadum Batak dengan Kontras Tinggi */}
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: "var(--asset-web-pattern, url(/images/gorga/batak-web-sapphire.webp))",
            backgroundSize: "210px auto",
            backgroundPosition: "center center",
            opacity: 0.88,
            filter: "contrast(1.2) brightness(1.15) drop-shadow(0 2px 4px rgba(0,0,0,0.85))",
          }}
        />
        {/* Tint Gorga Transparan untuk Mengikat Warna */}
        <div className="absolute inset-0 bg-gorga/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-night/60" />
      </div>

      {/* Garis Aksen Emas Ganda di Tepian Atas & Bawah */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-bright/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold-bright to-gold/40 pointer-events-none" />

      {/* 2. KONTEN HEADER / NAVBAR DENGAN NAMA MEMPELAI TERPUSAT SEMPURNA */}
      <div className="relative z-10 max-w-xl mx-auto h-full px-4 sm:px-6 flex items-center justify-center">
        {/* Garis Aksen Emas Kiri (Penyeimbang Simetris) */}
        <div className="flex-1 flex items-center justify-end gap-1.5 pr-2.5 sm:pr-4" aria-hidden="true">
          <span className="h-[1px] w-full max-w-[50px] sm:max-w-[90px] bg-gradient-to-r from-transparent via-gold-bright/40 to-gold-bright/70" />
          <span className="w-1.5 h-1.5 rotate-45 border border-gold-bright bg-gold-bright/40" />
        </div>

        {/* Tengah: Nama Kedua Mempelai (Pill Center Megah) */}
        <div className="flex flex-col items-center justify-center px-5 sm:px-7 py-1 rounded-full bg-night/92 border border-gold-bright/70 backdrop-blur-md shadow-[0_2px_14px_rgba(0,0,0,0.7)] shrink-0">
          <span className="font-display text-xs sm:text-sm tracking-[0.24em] text-on-night font-bold drop-shadow uppercase whitespace-nowrap">
            {groom.shortName} <span className="text-gold-bright font-serif font-light mx-0.5">&amp;</span> {bride.shortName}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] font-body tracking-[0.32em] text-gold-bright uppercase font-semibold">
            THE WEDDING
          </span>
        </div>

        {/* Garis Aksen Emas Kanan (Penyeimbang Simetris) */}
        <div className="flex-1 flex items-center justify-start gap-1.5 pl-2.5 sm:pl-4" aria-hidden="true">
          <span className="w-1.5 h-1.5 rotate-45 border border-gold-bright bg-gold-bright/40" />
          <span className="h-[1px] w-full max-w-[50px] sm:max-w-[90px] bg-gradient-to-l from-transparent via-gold-bright/40 to-gold-bright/70" />
        </div>
      </div>
    </header>
  );
};
