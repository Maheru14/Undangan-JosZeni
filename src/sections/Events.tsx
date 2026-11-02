import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Divider } from '../components/decor/Divider';
import { GorgaWatermark } from '../components/decor/GorgaWatermark';
import { CornerOrnament } from '../components/decor/CornerOrnament';
import { FloralAccent } from '../components/decor/FloralAccent';
import { HangingFloral } from '../components/decor/HangingFloral';
import { StageFloralBorder } from '../components/decor/StageFloralBorder';
import { Reveal } from '../components/layout/Reveal';

export const Events: React.FC = () => {
  const { config } = useAppContext();
  const { events } = config;

  return (
    <section
      id="events"
      aria-label="Rangkaian Acara Pernikahan"
      className="relative pt-20 pb-24 sm:pb-28 px-6 bg-transparent text-ink overflow-hidden border-t border-line/60"
    >
      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      <div className="relative z-10 w-full mx-auto text-center">
        {/* Header Section */}
        <Reveal direction="down" distance={30}>
          {/* Gantungan Bunga Mahkota Berayun Mulus */}
          <HangingFloral cordLength={22} flowerClassName="w-52 sm:w-64 h-12 sm:h-14" className="mb-2 drop-shadow-xs" />

          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-1">
            Wedding Events
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
            Rangkaian Acara
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed font-light">
            Rangkaian acara pernikahan yang akan diselenggarakan pada:
          </p>
        </Reveal>

        <Divider variant="light" className="my-6" />

        {/* STACK KARTU ACARA BERGANTIAN DARI KIRI & KANAN */}
        <div className="space-y-6 text-left mt-8">
          {events.map((evt, index) => {
            const isLeft = index % 2 === 0;

            return (
              <Reveal
                key={evt.id}
                direction={isLeft ? 'left' : 'right'}
                distance={70}
                duration={0.8}
              >
                <article className="relative p-5 sm:p-6 rounded-xs bg-surface border border-gold/40 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-gold-bright overflow-hidden">
                  {/* Ornamen Sudut Gorga */}
                  <CornerOrnament size={28} opacity={0.65} variant="gorga" />

                  {/* Aksen Bunga Sudut Kartu Acara */}
                  <FloralAccent variant="corner" className="absolute -top-3 -right-3 w-16 h-16 sm:w-20 sm:h-20 opacity-20 pointer-events-none rotate-90" />

                  {/* Watermark Gorga Halus di Dalam Card */}
                  <GorgaWatermark variant="light" opacity={0.03} />

                  <div className="relative z-10">
                    {/* Header Badge & Nomor Agenda */}
                    <div className="flex items-center justify-between mb-3 border-b border-gold/25 pb-2.5">
                      <span className="font-display text-[11px] text-gorga uppercase tracking-widest border border-gold/40 px-2.5 py-0.5 rounded-xs bg-surface-alt font-semibold">
                        Agenda 0{index + 1}
                      </span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-gold-bright mr-8" />
                    </div>

                    {/* Judul Acara */}
                    <h3 className="font-display text-xl text-ink font-semibold tracking-wide mb-3">
                      {evt.name}
                    </h3>

                    <div className="space-y-2.5 font-body text-xs sm:text-sm text-ink-muted">
                      {/* Hari & Tanggal */}
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-gorga mt-0.5 shrink-0 stroke-[1.5]" />
                        <span className="font-medium text-ink">{evt.date}</span>
                      </div>

                      {/* Waktu */}
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-gorga mt-0.5 shrink-0 stroke-[1.5]" />
                        <span className="text-ink">{evt.time}</span>
                      </div>

                      {/* Lokasi Gedung */}
                      <div className="flex items-start gap-2.5 pt-2 border-t border-line/60">
                        <MapPin className="w-4 h-4 text-gorga mt-0.5 shrink-0 stroke-[1.5]" />
                        <div>
                          <p className="font-medium text-ink">{evt.venueName}</p>
                          <p className="text-xs text-ink-muted mt-0.5 leading-relaxed font-light">
                            {evt.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Peta Google Maps */}
                  <div className="pt-4 mt-4 border-t border-line/60 relative z-10">
                    {evt.mapsUrl && evt.mapsUrl !== '#' ? (
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Buka peta lokasi ${evt.name} di Google Maps`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs border border-gold text-gorga bg-surface-alt hover:bg-gorga hover:text-white active:bg-gorga active:text-white active:scale-98 transition-colors duration-200 text-xs font-body font-semibold tracking-wider min-h-[44px] shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
                        <span>Buka Google Maps</span>
                      </a>
                    ) : (
                      <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs border border-gold/30 text-ink-muted/70 bg-surface-alt/50 text-xs font-body font-medium tracking-wider min-h-[44px] cursor-not-allowed">
                        <MapPin className="w-3.5 h-3.5 stroke-[1.5] text-gold/60" />
                        <span>Peta Lokasi Segera Hadir</span>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* KARANGAN BUNGA PANGGUNG DI DASAR SEKSI RANGKAIAN ACARA */}
      <StageFloralBorder position="bottom" heightClassName="h-16 sm:h-20 md:h-24" />
    </section>
  );
};
