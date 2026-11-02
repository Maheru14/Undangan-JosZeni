import React from 'react';
import { useAppContext } from '../context/AppContext';
import { GorgaWatermark } from '../components/decor/GorgaWatermark';
import { CornerOrnament } from '../components/decor/CornerOrnament';
import { Divider } from '../components/decor/Divider';
import { FloralAccent } from '../components/decor/FloralAccent';
import { StageFloralBorder } from '../components/decor/StageFloralBorder';
import { Reveal } from '../components/layout/Reveal';

export const Doa: React.FC = () => {
  const { config } = useAppContext();
  const { quote } = config;

  return (
    <section
      id="doa"
      aria-label="Ayat Firman Tuhan & Janji Suci"
      className="relative pt-20 pb-24 sm:pb-28 px-6 bg-night text-on-night overflow-hidden text-center border-t border-gold/30 shadow-[inset_0_2px_15px_rgba(0,0,0,0.6)]"
    >
      {/* WATERMARK GORGA VARIAN GELAP */}
      <GorgaWatermark variant="dark" opacity={0.06} />

      <div className="relative z-10 w-full mx-auto">
        {/* SILUET ATAP RUMAH BOLON EMAS DI ATAS AYAT FIRMAN TUHAN */}
        <Reveal direction="down" distance={30}>
          <div className="flex justify-center mb-3" aria-hidden="true">
            <svg viewBox="0 0 120 40" fill="none" className="w-24 sm:w-28 h-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,24 C30,12 50,6 60,6 C70,6 90,12 110,24 C100,20 80,14 60,14 C40,14 20,20 10,24 Z" fill="var(--gorga)" stroke="var(--gold-bright)" strokeWidth="1" />
              <path d="M5,26 C15,18 35,10 60,10 C85,10 105,18 115,26 C105,22 85,16 60,16 C35,16 15,22 5,26 Z" fill="var(--gold-bright)" />
              <circle cx="60" cy="8" r="2" fill="var(--gold-bright)" />
            </svg>
          </div>

          {/* Medallion Bunga Sapphire Bersinar */}
          <FloralAccent variant="crest" className="w-28 sm:w-32 h-16 sm:h-18 mx-auto -mt-1 mb-2 drop-shadow-[0_4px_20px_rgba(46,111,212,0.45)]" />

          <h2 className="font-display text-2xl sm:text-3xl text-on-night font-semibold tracking-wide mb-6 drop-shadow-xs">
            Ayat Firman Tuhan
          </h2>
        </Reveal>

        {/* BINGKAI KARTU AYAT DENGAN ORNAMEN GORGA EMAS */}
        <Reveal direction="up" distance={50} duration={0.85}>
          <div className="relative p-6 sm:p-8 rounded-xs border border-gold/50 bg-night/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Ornamen Sudut Gorga */}
            <CornerOrnament size={36} opacity={0.65} variant="gold" />

            {/* Inner Border Frame */}
            <div className="relative z-10 p-5 sm:p-7 border border-gold/30 rounded-xs">
              {/* Referensi Ayat Alkitab */}
              <p className="font-display text-sm sm:text-base text-gold-bright uppercase tracking-[0.2em] font-semibold mb-4">
                {quote.verse}
              </p>

              {/* Teks Terjemahan Baru LAI */}
              <blockquote className="font-display text-sm sm:text-base text-on-night leading-relaxed sm:leading-loose mb-2 font-normal italic">
                “{quote.translation}”
              </blockquote>

              {quote.source ? (
                <>
                  <Divider variant="dark" className="my-5" />
                  <cite className="not-italic font-body text-[11px] uppercase tracking-[0.22em] text-gold-bright/80 font-medium">
                    {quote.source}
                  </cite>
                </>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>

      {/* KARANGAN BUNGA PANGGUNG DI DASAR SEKSI AYAT FIRMAN TUHAN */}
      <StageFloralBorder position="bottom" heightClassName="h-16 sm:h-20 md:h-24" />
    </section>
  );
};
