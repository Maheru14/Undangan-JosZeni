import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Plus, ZoomIn, Clock, Lock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Divider } from '../../components/decor/Divider';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { Reveal } from '../../components/layout/Reveal';
import { guestMomentsStorage, type GuestMoment } from '../../lib/guestMomentsAdapter';
import { UploadMomentModal } from './UploadMomentModal';
import { GuestLightbox } from './GuestLightbox';

function formatRelativeTime(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Baru saja';
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return 'Kemarin';
    return `${diffDays} hari lalu`;
  } catch {
    return 'Baru saja';
  }
}

export const GuestMoments: React.FC = () => {
  const { config } = useAppContext();
  const [moments, setMoments] = useState<GuestMoment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  // Kunci upload sampai tanggal & jam Hari-H pernikahan tiba
  const unlockIsoDate =
    config.moments?.unlockIsoDate ||
    config.events?.[0]?.isoDate ||
    config.countdown?.targetIsoDate ||
    '';

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (!unlockIsoDate || !unlockIsoDate.trim()) return false;
    const target = new Date(unlockIsoDate).getTime();
    if (isNaN(target)) return false;
    return Date.now() >= target;
  });

  useEffect(() => {
    if (!unlockIsoDate || !unlockIsoDate.trim()) return;
    const target = new Date(unlockIsoDate).getTime();
    if (isNaN(target)) return;

    const interval = setInterval(() => {
      if (Date.now() >= target) {
        setIsUnlocked(true);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [unlockIsoDate]);

  const formattedUnlockTime = useMemo(() => {
    if (!unlockIsoDate || !unlockIsoDate.trim()) return null;
    const d = new Date(unlockIsoDate);
    if (isNaN(d.getTime())) return null;
    return (
      d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB'
    );
  }, [unlockIsoDate]);

  useEffect(() => {
    // 1. Ambil data foto momen dari Supabase
    void guestMomentsStorage.getAll().then((data) => {
      setMoments(data);
    });

    // 2. Langganan Supabase Realtime (foto baru langsung muncul tanpa reload)
    if (guestMomentsStorage.subscribe) {
      const unsubscribe = guestMomentsStorage.subscribe((newMoment) => {
        setMoments((prev) => {
          if (prev.some((m) => m.id === newMoment.id)) return prev;
          return [newMoment, ...prev];
        });
      });
      return unsubscribe;
    }
  }, []);

  const handleUploadSuccess = (newMoment: GuestMoment) => {
    setMoments((prev) => {
      if (prev.some((m) => m.id === newMoment.id)) return prev;
      return [newMoment, ...prev];
    });
  };

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section
      id="moments"
      aria-label="Foto Keseruan Hari-H"
      className="relative py-20 px-6 bg-transparent text-ink overflow-hidden border-t border-line/60"
    >
      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      <div className="relative z-10 w-full mx-auto text-center">
        {/* Header Section */}
        <Reveal direction="down" distance={30}>
          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-1">
            Foto Hari-H
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
            Foto Keseruan Hari-H
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed font-light">
            Setiap senyum dan kehadiran Anda adalah anugerah. Abadikan dan bagikan momen keseruan Anda di Hari-H pernikahan Jos &amp; Zeni:
          </p>
        </Reveal>

        {/* Tombol CTA / Status Kunci Upload Foto Hari-H */}
        <Reveal direction="down" distance={20} delay={0.15}>
          <div className="mt-6 flex justify-center">
            {isUnlocked ? (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-gradient-to-r from-gorga via-gorga-bright to-gorga hover:brightness-110 text-on-night border border-gold active:scale-98 transition-all duration-200 text-xs sm:text-sm font-body font-semibold tracking-wider cursor-pointer shadow-[0_4px_16px_var(--shadow-btn)]"
              >
                <Camera className="w-4 h-4 stroke-[1.75]" />
                <span>Bagikan Foto Hari-H</span>
                <Plus className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-surface-alt border border-gold/40 text-ink/80 text-xs sm:text-sm font-body font-medium select-none shadow-xs">
                  <Lock className="w-4 h-4 text-gorga stroke-[1.75]" />
                  <span>Fitur Unggah Dibuka pada Hari-H</span>
                </div>
                <p className="font-body text-[11px] text-ink-muted/80 max-w-sm text-center leading-normal font-light">
                  {formattedUnlockTime
                    ? `Fitur unggah foto keseruan otomatis dibuka pada ${formattedUnlockTime}.`
                    : 'Fitur unggah foto keseruan akan dibuka pada Hari-H saat acara pernikahan dimulai.'}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <Divider variant="light" className="my-7" />

        {/* FEED FOTO KESERUAN HARI-H */}
        {moments.length === 0 ? (
          <Reveal direction="up" distance={30}>
            <div className="relative p-8 rounded-xs bg-surface border border-gold/40 shadow-sm max-w-md mx-auto text-center overflow-hidden">
              <CornerOrnament size={20} opacity={0.5} variant="gorga" />
              <div className="w-12 h-12 rounded-full bg-gorga/10 text-gorga mx-auto flex items-center justify-center mb-3">
                <Camera className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-display text-base font-semibold text-ink">
                Belum Ada Foto Hari-H
              </h4>
              <p className="font-body text-xs text-ink-muted mt-1 leading-relaxed font-light">
                {isUnlocked
                  ? 'Jadilah yang pertama mengunggah foto keseruan Anda di Hari-H pernikahan!'
                  : 'Foto keseruan di Hari-H pernikahan akan tampil di sini saat acara berlangsung.'}
              </p>
              {isUnlocked && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xs border border-gold text-gorga bg-[#F4EEE6] hover:bg-gorga hover:text-white transition-colors text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Unggah Foto Pertama</span>
                </button>
              )}
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
            {moments.map((moment, idx) => (
              <Reveal
                key={moment.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                distance={50}
                duration={0.7}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(idx);
                    }
                  }}
                  aria-label={`Buka foto dari ${moment.guestName}`}
                  className="group relative aspect-4/5 rounded-xs overflow-hidden bg-[#F4EEE6] border border-gold/40 shadow-md hover:border-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer flex flex-col justify-end text-left"
                >
                  {/* Foto */}
                  <img
                    src={moment.imageUrl}
                    alt={`Foto oleh ${moment.guestName}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay Bawah */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />

                  {/* Icon Zoom saat hover */}
                  <div className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-night/70 text-gold-bright border border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>

                  {/* Keterangan & Pengunggah di Bagian Bawah Card */}
                  <div className="relative z-10 p-2.5 sm:p-3 text-on-night">
                    <div className="flex items-center justify-between gap-1 text-[10px] text-gold-bright font-body font-medium">
                      <span className="truncate max-w-[90px] sm:max-w-[120px]">
                        {moment.guestName}
                      </span>
                      <span className="flex items-center gap-0.5 text-[9px] text-on-night/60 shrink-0">
                        <Clock className="w-2.5 h-2.5 stroke-[1.25]" />
                        <span>{formatRelativeTime(moment.createdAt)}</span>
                      </span>
                    </div>

                    {moment.caption && (
                      <p className="font-body text-[11px] text-on-night/90 leading-tight mt-1 line-clamp-2 font-light">
                        {moment.caption}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* MODAL UPLOAD FOTO MOMEN HARI-H */}
      <UploadMomentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
        isUnlocked={isUnlocked}
      />

      {/* LIGHTBOX PENAMPIL FOTO MOMEN */}
      <GuestLightbox
        moments={moments}
        currentIndex={activePhotoIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() =>
          setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : moments.length - 1))
        }
        onNext={() =>
          setActivePhotoIndex((prev) => (prev < moments.length - 1 ? prev + 1 : 0))
        }
      />
    </section>
  );
};
