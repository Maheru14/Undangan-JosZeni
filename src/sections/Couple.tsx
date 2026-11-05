import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CouplePortrait } from '../components/ui/CouplePortrait';
import { Divider } from '../components/decor/Divider';
import { FloralAccent } from '../components/decor/FloralAccent';
import { HangingFloral } from '../components/decor/HangingFloral';
import { StageFloralBorder } from '../components/decor/StageFloralBorder';
import { Reveal } from '../components/layout/Reveal';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Couple: React.FC = () => {
  const { config } = useAppContext();
  const { groom, bride } = config.couple;

  return (
    <section
      id="couple"
      aria-label="Profil Kedua Mempelai"
      className="relative pt-20 pb-24 sm:pb-28 px-4 sm:px-6 bg-transparent text-ink overflow-hidden border-t border-line/60"
    >
      <div className="w-full mx-auto">
        {/* Header Section */}
        <Reveal direction="down" distance={30}>
          <div className="text-center">
            {/* Gantungan Bunga Mahkota Berayun Mulus */}
            <HangingFloral cordLength={24} flowerClassName="w-64 sm:w-80 h-16 sm:h-20" className="mb-1 drop-shadow-xs" />

            <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-1">
              The Happy Couple
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
              Kedua Mempelai
            </h2>
            <p className="font-body text-xs sm:text-sm text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed font-light">
              Dengan penuh rasa syukur dan sukacita, kami bermaksud melangsungkan pernikahan:
            </p>
          </div>
        </Reveal>

        <Divider variant="light" className="my-6" />

        {/* EDITORIAL ASYMMETRIC DUO (SALING TATAP / DIPPING OVERLAP) */}
        <div className="space-y-6 sm:space-y-8 mt-6">
          {/* MEMPELAI PRIA (YOSUA) — OFFSET KIRI */}
          <Reveal direction="left" distance={40} duration={0.85}>
            <div className="w-full flex flex-col items-start text-left pl-2 sm:pl-4 max-w-sm sm:max-w-md mr-auto">
              <CouplePortrait
                src={groom.photo}
                alt={groom.fullName}
                label="Mempelai Pria"
                companionSide="right"
                align="left"
              />

              <div className="pl-1 sm:pl-2">
                <h3 className="font-display text-2xl sm:text-3xl text-gold-text font-semibold tracking-wide mt-1">
                  {groom.fullName}
                </h3>
                {groom.title && (
                  <p className="font-body text-xs text-ink-muted tracking-wider uppercase font-semibold mt-1">
                    {groom.title}
                  </p>
                )}

                <div className="mt-4 pt-3.5 pb-3 px-4 sm:px-5 rounded-xs bg-surface-alt/80 border border-gold/40 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 opacity-95">
                    <span className="w-3 h-[1.5px] bg-gold" />
                    <p className="font-body text-[10px] sm:text-[10.5px] tracking-[0.22em] uppercase text-gorga font-bold">
                      Putra Tercinta Dari
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg sm:text-xl text-ink font-semibold tracking-wide leading-snug">
                      {groom.parents.father}
                    </p>
                    <p className="font-serif italic text-sm text-gold-text font-medium leading-none pl-0.5">
                      &amp;
                    </p>
                    <p className="font-serif text-lg sm:text-xl text-ink font-semibold tracking-wide leading-snug">
                      {groom.parents.mother}
                    </p>
                  </div>
                </div>

                {groom.instagram && (
                  <a
                    href={`https://instagram.com/${groom.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${groom.shortName}`}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold/40 bg-surface-alt hover:bg-gorga hover:text-surface text-xs font-body text-gold-text hover:font-medium transition-colors duration-200 min-h-[40px] shadow-xs"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>@{groom.instagram}</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* SIMBOL AMPERSAND ROYAL EMAS DENGAN KARANGAN BUNGA WREATH */}
          <Reveal direction="up" distance={20} delay={0.1}>
            <div className="relative my-6 sm:my-8 w-full flex items-center justify-center" aria-hidden="true">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
              <div className="relative mx-4 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
                {/* Wreath Bunga Melingkar Penyatuan Cinta */}
                <FloralAccent variant="wreath" className="absolute inset-0 w-full h-full opacity-90 drop-shadow-xs" />
                <span className="font-display text-2xl sm:text-3xl text-gorga font-light tracking-widest italic drop-shadow-xs relative z-10">
                  &amp;
                </span>
              </div>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
            </div>
          </Reveal>

          {/* MEMPELAI WANITA (ZENI) — OFFSET KANAN */}
          <Reveal direction="right" distance={40} duration={0.85}>
            <div className="w-full flex flex-col items-end text-right pr-2 sm:pr-4 max-w-sm sm:max-w-md ml-auto">
              <CouplePortrait
                src={bride.photo}
                alt={bride.fullName}
                label="Mempelai Wanita"
                companionSide="left"
                align="right"
              />

              <div className="pr-1 sm:pr-2">
                <h3 className="font-display text-2xl sm:text-3xl text-gold-text font-semibold tracking-wide mt-1">
                  {bride.fullName}
                </h3>
                {bride.title && (
                  <p className="font-body text-xs text-ink-muted tracking-wider uppercase font-semibold mt-1">
                    {bride.title}
                  </p>
                )}

                <div className="mt-4 pt-3.5 pb-3 px-4 sm:px-5 rounded-xs bg-surface-alt/80 border border-gold/40 shadow-xs flex flex-col items-end text-right">
                  <div className="flex items-center gap-2 mb-2 opacity-95">
                    <p className="font-body text-[10px] sm:text-[10.5px] tracking-[0.22em] uppercase text-gorga font-bold">
                      Putri Tercinta Dari
                    </p>
                    <span className="w-3 h-[1.5px] bg-gold" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg sm:text-xl text-ink font-semibold tracking-wide leading-snug">
                      {bride.parents.father}
                    </p>
                    <p className="font-serif italic text-sm text-gold-text font-medium leading-none pr-0.5">
                      &amp;
                    </p>
                    <p className="font-serif text-lg sm:text-xl text-ink font-semibold tracking-wide leading-snug">
                      {bride.parents.mother}
                    </p>
                  </div>
                </div>

                {bride.instagram && (
                  <a
                    href={`https://instagram.com/${bride.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${bride.shortName}`}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold/40 bg-surface-alt hover:bg-gorga hover:text-surface text-xs font-body text-gold-text hover:font-medium transition-colors duration-200 min-h-[40px] shadow-xs"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>@{bride.instagram}</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* KARANGAN BUNGA PANGGUNG DI DASAR SEKSI KEDUA MEMPELAI */}
      <StageFloralBorder position="bottom" heightClassName="h-16 sm:h-20 md:h-24" />
    </section>
  );
};
