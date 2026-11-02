import React from 'react';
import { useAppContext } from '../context/AppContext';
import { GorgaWatermark } from '../components/decor/GorgaWatermark';
import { FloralAccent } from '../components/decor/FloralAccent';
import { StageFloralBorder } from '../components/decor/StageFloralBorder';
import { Reveal } from '../components/layout/Reveal';

export const Closing: React.FC = () => {
  const { config } = useAppContext();

  return (
    <footer
      id="closing"
      aria-label="Ucapan Terima Kasih dan Penutup"
      className="relative pt-20 pb-28 sm:pb-32 px-6 bg-transparent text-ink overflow-hidden text-center border-t border-line/60"
    >
      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      <div className="relative z-10 w-full mx-auto flex flex-col items-center">
        {/* SILUET ATAP RUMAH BOLON EMAS PENUTUP */}
        <Reveal direction="down" distance={40}>
          <div className="w-24 sm:w-28 h-auto mb-4 drop-shadow-[0_2px_10px_rgba(184,146,74,0.3)]" aria-hidden="true">
            <svg viewBox="0 0 120 40" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,24 C30,12 50,6 60,6 C70,6 90,12 110,24 C100,20 80,14 60,14 C40,14 20,20 10,24 Z" fill="var(--gorga)" stroke="var(--gold)" strokeWidth="1" />
              <path d="M5,26 C15,18 35,10 60,10 C85,10 105,18 115,26 C105,22 85,16 60,16 C35,16 15,22 5,26 Z" fill="var(--gold-bright)" />
              <circle cx="60" cy="8" r="2" fill="var(--gorga)" />
            </svg>
          </div>
        </Reveal>

        {/* Buket Bunga Pernikahan Penutup */}
        <FloralAccent variant="bouquet" className="w-32 sm:w-40 h-32 sm:h-40 mx-auto mb-4 drop-shadow-md" />

        {/* Salam Penutup */}
        <Reveal direction="left" distance={30} delay={0.1}>
          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-2">
            Ungkapan Terima Kasih
          </p>
        </Reveal>

        {/* Pesan Terima Kasih */}
        <Reveal direction="right" distance={30} delay={0.15}>
          <p className="font-body text-xs sm:text-sm text-ink-muted leading-relaxed mb-6 max-w-sm font-light">
            {config.closingMessage}
          </p>
        </Reveal>

        {/* Nama Mempelai */}
        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="font-display text-2xl sm:text-3xl text-gold-text tracking-wide mb-1 font-semibold">
            {config.couple.groom.shortName} &amp; {config.couple.bride.shortName}
          </p>

          <p className="font-body text-xs text-ink-muted tracking-wider mb-6">
            Beserta Seluruh Keluarga Besar {config.couple.groom.marga} &amp; {config.couple.bride.marga.replace(/^br\.\s*/i, '')}
          </p>
        </Reveal>

        {/* Hairline Divider & Hashtag Resmi (jika ada) */}
        {config.hashtag ? (
          <>
            <div className="w-20 h-[1px] bg-gold/40 mb-5" aria-hidden="true" />
            <Reveal direction="up" distance={20} delay={0.25}>
              <p className="font-body text-xs tracking-[0.2em] text-gorga uppercase font-medium">
                {config.hashtag}
              </p>
            </Reveal>
          </>
        ) : null}
      </div>

      {/* KARANGAN BUNGA PANGGUNG MEWAH DI DASAR CLOSING FOOTER */}
      <StageFloralBorder position="bottom" heightClassName="h-18 sm:h-24 md:h-28" />
    </footer>
  );
};
