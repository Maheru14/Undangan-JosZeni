import React, { useState } from 'react';

interface CouplePortraitProps {
  src: string;
  alt: string;
  label?: string;
  companionSide?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export const CouplePortrait: React.FC<CouplePortraitProps> = ({
  src,
  alt,
  label,
  companionSide = 'right',
  align = 'center',
  className = '',
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const alignContainerClass =
    align === 'left'
      ? 'items-start sm:items-start'
      : align === 'right'
        ? 'items-end sm:items-end'
        : 'items-center';

  return (
    <figure className={`relative flex flex-col select-none ${alignContainerClass} ${className}`}>
      <div className="relative w-64 sm:w-72 h-80 sm:h-92 flex items-end">
        {/* AUTHENTIC BATAK ULOS TAPESTRY BANNER (PITA KAIN ULOS DENGAN RAMBU-RAMBU & FINIAL EMAS) */}
        <div
          className={`absolute z-0 pointer-events-none select-none flex flex-col items-center ${
            companionSide === 'right'
              ? '-right-7 sm:-right-9'
              : '-left-7 sm:-left-9'
          } top-6 sm:top-8 bottom-1 w-11 sm:w-12`}
          aria-hidden="true"
        >
          {/* TOP: FINIAL EMAS & BATAK 4-POINT STAR */}
          <div className="flex flex-col items-center w-full mb-1">
            <div className="w-3.5 h-3.5 text-gold drop-shadow-xs animate-pulse">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
              </svg>
            </div>
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-gold/80 to-transparent mt-0.5" />
          </div>

          {/* BODY: KAIN TENUN BATAK OTENTIK (FULL PATTERN TERLIHAT JELAS & ELEGAN) */}
          <div className="relative flex-1 w-full overflow-hidden rounded-xs shadow-[0_4px_16px_rgba(184,146,74,0.22)] border-x border-gold/25">
            <div
              className="w-full h-full bg-cover bg-top opacity-90 select-none pointer-events-none"
              style={{
                backgroundImage: 'var(--asset-border-strip, url(/images/gorga/batak-border-sapphire.webp))',
              }}
              aria-hidden="true"
            />
            {/* Silk sheen highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* BOTTOM: RAMBU-RAMBU ULOS (AUTHENTIC WOVEN FRINGE TASSELS) */}
          <div
            className="w-full h-7 overflow-visible -mt-0.5"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
            }}
          >
            <svg viewBox="0 0 48 28" className="w-full h-full overflow-visible" fill="none">
              <line x1="2" y1="1" x2="46" y2="1" stroke="var(--gold)" strokeWidth="1.5" strokeOpacity="0.85" />
              {/* Fringe threads (Rambu Ulos) with rhythmic lengths and authentic Batak colors */}
              <line x1="5" y1="2" x2="5" y2="17" stroke="var(--gold)" strokeWidth="1" strokeOpacity="0.8" />
              <line x1="9" y1="2" x2="9" y2="23" stroke="var(--gorga)" strokeWidth="1.2" strokeOpacity="0.9" />
              <line x1="13" y1="2" x2="13" y2="16" stroke="var(--night)" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="17" y1="2" x2="17" y2="25" stroke="var(--gold)" strokeWidth="1.2" strokeOpacity="0.85" />
              <line x1="21" y1="2" x2="21" y2="21" stroke="var(--gorga)" strokeWidth="1.2" strokeOpacity="0.9" />
              <line x1="25" y1="2" x2="25" y2="26" stroke="var(--gold)" strokeWidth="1.3" strokeOpacity="1" />
              <line x1="29" y1="2" x2="29" y2="20" stroke="var(--gorga)" strokeWidth="1.2" strokeOpacity="0.85" />
              <line x1="33" y1="2" x2="33" y2="24" stroke="var(--night)" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="37" y1="2" x2="37" y2="16" stroke="var(--gold)" strokeWidth="1" strokeOpacity="0.8" />
              <line x1="41" y1="2" x2="41" y2="22" stroke="var(--gorga)" strokeWidth="1.2" strokeOpacity="0.9" />
              <line x1="45" y1="2" x2="45" y2="14" stroke="var(--gold)" strokeWidth="1" strokeOpacity="0.75" />
              {/* Tassel bead accents */}
              <circle cx="9" cy="23" r="1" fill="var(--gold)" />
              <circle cx="17" cy="25" r="1.1" fill="var(--gold)" />
              <circle cx="25" cy="26" r="1.2" fill="var(--gold)" />
              <circle cx="33" cy="24" r="1.1" fill="var(--gold)" />
              <circle cx="41" cy="22" r="1" fill="var(--gold)" />
            </svg>
          </div>
        </div>

        {/* FOTO POTRET DENGAN LENGKUNG KUBAH ELEGAN & GRADASI PINGGIR */}
        {!hasError ? (
          <div
            className="relative z-10 w-full h-full overflow-hidden rounded-t-[72px] sm:rounded-t-[84px] rounded-b-2xl shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            style={{
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 99%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 99%)',
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />

            {/* Sentuhan Gradasi Halus & Inner Shadow di Sekeliling Pinggirannya Agar Tidak Kotak */}
            <div
              className="absolute inset-0 pointer-events-none rounded-t-[72px] sm:rounded-t-[84px] rounded-b-2xl"
              style={{
                boxShadow: 'inset 0 0 18px 4px rgba(251, 248, 243, 0.55)',
              }}
              aria-hidden="true"
            />

            {/* Kontur Garis Emas Halus (Hairline Gold Contour) */}
            <div
              className="absolute inset-0 pointer-events-none rounded-t-[72px] sm:rounded-t-[84px] rounded-b-2xl ring-1 ring-gold/30"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 bg-surface-alt/40 border border-line rounded-xs">
            <p className="font-display text-xs text-gorga uppercase tracking-widest font-semibold">
              {label || 'Foto Mempelai'}
            </p>
            <p className="font-body text-[11px] text-ink-muted/80 mt-1 italic">
              [Menunggu foto resmi]
            </p>
          </div>
        )}
      </div>

      {/* HAIRLINE PEMISAH DENGAN AKSEN TRIPLE BELAH KETUPAT */}
      <div
        className={`w-52 sm:w-60 flex items-center gap-2 mt-2 mb-4 ${
          align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
        }`}
        aria-hidden="true"
      >
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <span className="w-1 h-1 rotate-45 bg-gorga/70" />
        <span className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold/40" />
        <span className="w-1 h-1 rotate-45 bg-gorga/70" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
      </div>
    </figure>
  );
};
