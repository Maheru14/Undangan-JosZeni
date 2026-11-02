import React, { useState, useEffect } from 'react';
import { Divider } from '../../components/decor/Divider';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';
import { rsvpStorage, type RsvpEntry } from '../../lib/storageAdapter';
import { RsvpForm } from './RsvpForm';
import { WishList } from './WishList';
import { FloralAccent } from '../../components/decor/FloralAccent';
import { Reveal } from '../../components/layout/Reveal';

export const Rsvp: React.FC = () => {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    void rsvpStorage.getAll().then((data) => {
      setEntries(data);
    });

    if (rsvpStorage.subscribe) {
      const unsubscribe = rsvpStorage.subscribe(
        (newEntry) => {
          setEntries((prev) => {
            if (prev.some((e) => e.id === newEntry.id)) {
              return prev;
            }
            return [newEntry, ...prev];
          });
        },
        (deletedId) => {
          setEntries((prev) => prev.filter((e) => e.id !== deletedId));
        }
      );
      return unsubscribe;
    }
  }, []);

  const handleNewEntry = (savedEntry: RsvpEntry) => {
    setEntries((prev) => {
      if (prev.some((e) => e.id === savedEntry.id)) {
        return prev;
      }
      return [savedEntry, ...prev];
    });
  };

  return (
    <section
      id="rsvp"
      aria-label="Konfirmasi Kehadiran dan Buku Tamu"
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
            Konfirmasi Kehadiran
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
            Konfirmasi Kehadiran &amp; Doa
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed font-light">
            Kehadiran serta doa restu Bapak/Ibu/Saudara/i merupakan kehormatan dan kebahagiaan yang sangat besar bagi kami sekeluarga:
          </p>
        </Reveal>

        <Divider variant="light" className="my-6" />

        {/* SUSUNAN FORM DAN BUKU UCAPAN DENGAN ANIMASI SCROLL KIRI & KANAN */}
        <div className="flex flex-col gap-8 items-stretch mt-8 text-left">
          {/* FORM KONFIRMASI KEHADIRAN - SLIDE FROM LEFT */}
          <Reveal direction="left" distance={60} duration={0.85}>
            <RsvpForm onSuccess={handleNewEntry} />
          </Reveal>

          {/* BUKU UCAPAN & DOA - SLIDE FROM RIGHT */}
          <Reveal direction="right" distance={60} duration={0.85}>
            <WishList entries={entries} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
