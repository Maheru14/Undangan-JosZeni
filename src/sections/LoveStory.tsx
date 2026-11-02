import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Divider } from '../components/decor/Divider';
import { GorgaWatermark } from '../components/decor/GorgaWatermark';
import { CornerOrnament } from '../components/decor/CornerOrnament';
import { FloralAccent } from '../components/decor/FloralAccent';
import { Reveal } from '../components/layout/Reveal';

export const LoveStory: React.FC = () => {
  const { config } = useAppContext();
  const { loveStory } = config;

  if (!loveStory || loveStory.length === 0) {
    return null;
  }

  return (
    <section
      id="story"
      aria-label="Kisah Perjalanan Cinta"
      className="relative py-20 px-6 bg-transparent text-ink overflow-hidden border-t border-line/60"
    >
      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      <div className="relative z-10 w-full mx-auto text-center">
        {/* Header Section */}
        <Reveal direction="down" distance={30}>
          {/* Mahkota Lengkungan Bunga */}
          <FloralAccent variant="arch" className="w-52 sm:w-64 h-12 sm:h-14 mx-auto mb-2 drop-shadow-xs" />

          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-1">
            Our Love Story
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
            Kisah Perjalanan Cinta
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed font-light">
            Untaian kasih yang mengiringi perjalanan kami hingga menuju ikatan suci pernikahan:
          </p>
        </Reveal>

        <Divider variant="light" className="my-6" />

        {/* TIMELINE CONTAINER VERTIKAL DENGAN ANIMASI SCROLL KIRI & KANAN */}
        <div className="relative mt-10 max-w-md mx-auto text-left">
          {/* Garis Vertikal Hairline Emas */}
          <div
            className="absolute left-4 top-2 bottom-2 w-[1px] bg-gold/50"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {loveStory.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={item.year + item.title} className="relative flex items-start pl-10">
                  {/* Titik Node Wajik Emas pada Garis */}
                  <div
                    className="absolute left-4 top-3 w-3.5 h-3.5 -translate-x-1/2 rotate-45 border border-gold bg-[#F4EEE6] flex items-center justify-center z-10 shadow-xs"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gorga" />
                  </div>

                  {/* Konten Kartu Fase dengan Animasi Scroll Kiri / Kanan */}
                  <Reveal
                    direction={isLeft ? 'left' : 'right'}
                    distance={60}
                    duration={0.8}
                    className="w-full"
                  >
                    <div className="relative p-5 rounded-xs bg-surface border border-gold/40 shadow-md transition-all duration-300 hover:border-gold-bright overflow-hidden">
                      {/* Ornamen Sudut Gorga */}
                      <CornerOrnament size={24} opacity={0.5} variant="gold" />

                      {/* Watermark Gorga Halus */}
                      <GorgaWatermark variant="light" opacity={0.02} />

                      <div className="relative z-10">
                        <span className="inline-block font-display text-[11px] tracking-widest text-gorga uppercase mb-1 font-semibold">
                          {item.year}
                        </span>
                        <h3 className="font-display text-lg text-ink font-semibold tracking-wide mb-1.5">
                          {item.title}
                        </h3>
                        <p className="font-body text-xs sm:text-sm text-ink-muted leading-relaxed font-light whitespace-pre-line">
                          {item.story}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
