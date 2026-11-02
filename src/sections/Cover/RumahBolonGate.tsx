import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { RumahBolonHalfSvg } from './RumahBolonHalfSvg';

interface RumahBolonGateProps {
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Komponen Gerbang Rumah Bolon Terbuka (Split Rumah Bolon Opening Gate).
 * Menggunakan ilustrasi garis vektor autentik Rumah Bolon Batak Toba (tanpa isian warna)
 * di dalam portal lengkung bersih bercahaya emas.
 * Di bagian bawah gerbang, terpasang karangan bunga panggung lebat yang ikut terbelah (split)
 * ke kiri dan kanan secara dramatis saat undangan dibuka oleh pengguna.
 * Nama mempelai pria (JOS) dan wanita (ZENI) diposisikan terpisah di sisi kiri dan kanan atap,
 * sehingga fasad Rumah Bolon tampak utuh dan megah di tengah tanpa tertimpa tulisan.
 */
export const RumahBolonGate: React.FC<RumahBolonGateProps> = ({ leftRef, rightRef }) => {
  const { config } = useAppContext();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex"
      aria-hidden="true"
    >
      {/* BILAH KIRI (Fasad Rumah Bolon Sisi Kiri - viewBox 0 0 300 660) */}
      <div
        ref={leftRef}
        className="w-1/2 h-full relative overflow-hidden bg-night flex items-center justify-end will-change-transform [transform:translateZ(0)]"
      >
        {/* 1. SILUET MOTIF GORGA BATAK OTENTIK (TERHUBUNG MULUS 100% KONTINU TANPA SAMBUNGAN) */}
        <div className="absolute top-0 left-0 w-[100vw] h-full pointer-events-none select-none overflow-hidden z-1">
          <div
            className="w-full h-full bg-repeat opacity-40"
            style={{
              backgroundImage: 'var(--asset-gorga-illustration, url(/images/gorga/batak-gorga-sapphire.webp))',
              backgroundSize: '440px auto',
              backgroundPosition: 'center center',
            }}
          />
        </div>

        {/* 2. LINGKUNGAN / PORTAL EMAS INTI (BERSIH DENGAN PENDARAN EMAS HALUS) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[364px] sm:w-[500px] md:w-[540px] h-[calc(100vh-24px)] sm:h-[calc(100vh-32px)] max-h-[824px] sm:max-h-[760px] pointer-events-none z-5 rounded-full bg-night border border-gold-bright/35 shadow-md">
          {/* Pendaran Cahaya Elegan di Tengah Rumah Bolon */}
          <div className="absolute inset-0 rounded-full bg-radial from-gold-bright/22 via-gorga/15 to-transparent pointer-events-none" />

          {/* Cincin Luar Utama Emas Bersinar */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-gold-bright/85 ring-1 ring-gold-bright/40" />

          {/* Cincin Konsentris Putus-Putus */}
          <div className="absolute inset-2.5 sm:inset-3 rounded-full border border-gold-bright/40 border-dashed" />

          {/* Cincin Dalam Garis Rambut */}
          <div className="absolute inset-5 sm:inset-6 rounded-full border border-gold-bright/20" />

          {/* Aksen Intan 4 Titik Kardinal Batak */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
        </div>

        {/* 3. FASAD RUMAH BOLON SISI KIRI & NAMA MEMPELAI */}
        <div className="relative z-20 h-[36vh] sm:h-[44vh] max-h-[290px] sm:max-h-[420px] w-auto flex items-center justify-end -translate-y-16 sm:-translate-y-20 md:-translate-y-24 pr-0">
          <RumahBolonHalfSvg
            side="left"
            className="h-full w-auto max-w-none object-contain drop-shadow-[0_2px_8px_rgba(216,180,95,0.35)]"
          />

          {/* NAMA MEMPELAI PRIA (JOS) - FLANKING SISI KIRI ATAP */}
          <div className="absolute right-[36%] sm:right-[44%] md:right-[52%] top-[20%] sm:top-[22%] -translate-y-1/2 flex flex-col items-end text-right pr-1.5 sm:pr-4 pointer-events-none select-none whitespace-nowrap">
            {/* Garis Aksen Emas & Intan */}
            <div className="flex items-center gap-1 sm:gap-1.5 mb-1 opacity-85" aria-hidden="true">
              <span className="w-5 sm:w-10 md:w-14 h-[1px] bg-gradient-to-l from-gold to-transparent" />
              <span className="w-1.5 h-1.5 rotate-45 border border-gold-bright bg-gold/50" />
            </div>

            {/* Nama Panggilan Utama */}
            <h2 className="font-display text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gold-bright tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-none drop-shadow-[0_1px_6px_rgba(216,180,95,0.4)]">
              {config.couple.groom.shortName}
            </h2>

            {/* Marga Mempelai Pria */}
            <p className="font-body text-[8px] sm:text-xs md:text-sm text-gold font-semibold tracking-[0.12em] sm:tracking-[0.2em] uppercase mt-1">
              {config.couple.groom.marga}
            </p>

            {/* Gelar Mempelai */}
            <span className="text-[7px] sm:text-[8.5px] text-gorga-bright font-bold tracking-[0.22em] sm:tracking-[0.28em] uppercase mt-0.5">
              THE GROOM
            </span>
          </div>
        </div>

        {/* 4. BUNGA PANGGUNG LURUS BILAH KIRI (MEMBELAH KE KIRI SAAT DIBUKA) */}
        <div className="absolute -bottom-2 sm:-bottom-4 right-0 translate-x-1/2 w-[100vw] h-20 sm:h-28 md:h-36 z-25 pointer-events-none select-none overflow-hidden">
          <div
            className="w-full h-full bg-bottom bg-repeat-x"
            style={{
              backgroundImage: 'var(--asset-flower-stage)',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'repeat-x',
            }}
          />
        </div>
      </div>

      {/* BILAH KANAN (Fasad Rumah Bolon Sisi Kanan - viewBox 300 0 300 660) */}
      <div
        ref={rightRef}
        className="w-1/2 h-full relative overflow-hidden bg-night flex items-center justify-start will-change-transform [transform:translateZ(0)]"
      >
        {/* 1. SILUET MOTIF GORGA BATAK OTENTIK (TERHUBUNG MULUS 100% KONTINU TANPA SAMBUNGAN) */}
        <div className="absolute top-0 right-0 w-[100vw] h-full pointer-events-none select-none overflow-hidden z-1">
          <div
            className="w-full h-full bg-repeat opacity-40"
            style={{
              backgroundImage: 'var(--asset-gorga-illustration, url(/images/gorga/batak-gorga-sapphire.webp))',
              backgroundSize: '440px auto',
              backgroundPosition: 'center center',
            }}
          />
        </div>

        {/* 2. LINGKUNGAN / PORTAL EMAS INTI (BERSIH DENGAN PENDARAN EMAS HALUS) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[364px] sm:w-[500px] md:w-[540px] h-[calc(100vh-24px)] sm:h-[calc(100vh-32px)] max-h-[824px] sm:max-h-[760px] pointer-events-none z-5 rounded-full bg-night border border-gold-bright/35 shadow-md">
          {/* Pendaran Cahaya Elegan di Tengah Rumah Bolon */}
          <div className="absolute inset-0 rounded-full bg-radial from-gold-bright/22 via-gorga/15 to-transparent pointer-events-none" />

          {/* Cincin Luar Utama Emas Bersinar */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-gold-bright/85 ring-1 ring-gold-bright/40" />

          {/* Cincin Konsentris Putus-Putus */}
          <div className="absolute inset-2.5 sm:inset-3 rounded-full border border-gold-bright/40 border-dashed" />

          {/* Cincin Dalam Garis Rambut */}
          <div className="absolute inset-5 sm:inset-6 rounded-full border border-gold-bright/20" />

          {/* Aksen Intan 4 Titik Kardinal Batak */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45 border border-gold-bright bg-night z-10" />
        </div>

        {/* 3. FASAD RUMAH BOLON SISI KANAN & NAMA MEMPELAI */}
        <div className="relative z-20 h-[36vh] sm:h-[44vh] max-h-[290px] sm:max-h-[420px] w-auto flex items-center justify-start -translate-y-16 sm:-translate-y-20 md:-translate-y-24 pl-0">
          <RumahBolonHalfSvg
            side="right"
            className="h-full w-auto max-w-none object-contain drop-shadow-[0_2px_8px_rgba(216,180,95,0.35)]"
          />

          {/* NAMA MEMPELAI WANITA (ZENI) - FLANKING SISI KANAN ATAP */}
          <div className="absolute left-[36%] sm:left-[44%] md:left-[52%] top-[20%] sm:top-[22%] -translate-y-1/2 flex flex-col items-start text-left pl-1.5 sm:pl-4 pointer-events-none select-none whitespace-nowrap">
            {/* Garis Aksen Emas & Intan */}
            <div className="flex items-center gap-1 sm:gap-1.5 mb-1 opacity-85" aria-hidden="true">
              <span className="w-1.5 h-1.5 rotate-45 border border-gold-bright bg-gold/50" />
              <span className="w-5 sm:w-10 md:w-14 h-[1px] bg-gradient-to-r from-gold to-transparent" />
            </div>

            {/* Nama Panggilan Utama */}
            <h2 className="font-display text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gold-bright tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-none drop-shadow-[0_1px_6px_rgba(216,180,95,0.4)]">
              {config.couple.bride.shortName}
            </h2>

            {/* Marga Mempelai Wanita */}
            <p className="font-body text-[8px] sm:text-xs md:text-sm text-gold font-semibold tracking-[0.12em] sm:tracking-[0.2em] uppercase mt-1">
              {config.couple.bride.marga}
            </p>

            {/* Gelar Mempelai */}
            <span className="text-[7px] sm:text-[8.5px] text-gorga-bright font-bold tracking-[0.22em] sm:tracking-[0.28em] uppercase mt-0.5">
              THE BRIDE
            </span>
          </div>
        </div>

        {/* 4. BUNGA PANGGUNG LURUS BILAH KANAN (MEMBELAH KE KANAN SAAT DIBUKA) */}
        <div className="absolute -bottom-2 sm:-bottom-4 left-0 -translate-x-1/2 w-[100vw] h-20 sm:h-28 md:h-36 z-25 pointer-events-none select-none overflow-hidden">
          <div
            className="w-full h-full bg-bottom bg-repeat-x"
            style={{
              backgroundImage: 'var(--asset-flower-stage)',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'repeat-x',
            }}
          />
        </div>
      </div>
    </div>
  );
};
