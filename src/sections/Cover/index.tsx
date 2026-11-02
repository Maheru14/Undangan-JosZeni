import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { MailOpen } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { RumahBolonGate } from './RumahBolonGate';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { FloralAccent } from '../../components/decor/FloralAccent';
import { HangingFloral } from '../../components/decor/HangingFloral';

export const Cover: React.FC = () => {
  const { config, guestName, openInvitation, isOpened } = useAppContext();
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftGateRef = useRef<HTMLDivElement | null>(null);
  const rightGateRef = useRef<HTMLDivElement | null>(null);

  // Kunci scroll halaman belakang saat cover masih aktif (mencegah ghost scroll di iPhone/HP kentang)
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  const handleOpenInvitation = async () => {
    if (isOpening) return;
    setIsOpening(true);

    // 1. Eksekusi pemutaran audio di dalam gesture klik pengguna
    await openInvitation();

    // 2. Deteksi preferensi reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
          onComplete: () => {
            setIsRemoved(true);
            document.body.style.overflow = 'auto';
            const mainEl = document.getElementById('main-content');
            mainEl?.focus();
          },
        });
      }
      return;
    }

    // 3. Urutan Animasi Gerbang Rumah Bolon (GSAP)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsRemoved(true);
        document.body.style.overflow = 'auto';
        const mainEl = document.getElementById('main-content');
        mainEl?.focus();
      },
    });

    // Fade out konten teks atas dan bawah
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
      });
    }

    // Gerbang Rumah Bolon kiri dan kanan terbuka ke samping bersama nama mempelai
    if (leftGateRef.current && rightGateRef.current) {
      tl.to(
        leftGateRef.current,
        {
          xPercent: -105,
          duration: 1.0,
          ease: 'power2.inOut',
          force3D: true,
        },
        '-=0.08',
      );

      tl.to(
        rightGateRef.current,
        {
          xPercent: 105,
          duration: 1.0,
          ease: 'power2.inOut',
          force3D: true,
        },
        '<',
      );
    }

    // Memudarkan wrapper latar penutup
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.2',
      );
    }
  };

  if ((isRemoved && isOpened) || (isOpened && !isOpening)) {
    return null;
  }

  const weddingDate = config.events[0]?.date || config.events[1]?.date || 'Segera Diumumkan';

  return (
    <aside
      ref={containerRef}
      aria-label="Cover Pembuka Undangan Pernikahan"
      className="fixed inset-0 z-50 bg-night text-on-night flex flex-col items-center justify-between py-6 sm:py-8 px-4 overflow-hidden select-none"
    >
      {/* JUDUL SEMANTIK TERSEMBUNYI UNTUK ACCESSIBILITY */}
      <h1 className="sr-only">
        The Wedding of {config.couple.groom.fullName} &amp; {config.couple.bride.fullName}
      </h1>

      {/* ORNAMEN SUDUT DI 4 SUDUT COVER */}
      <CornerOrnament size={48} opacity={0.7} />

      {/* GERBANG RUMAH BOLON DENGAN NAMA MEMPELAI TERPISAH DI KIRI & KANAN */}
      <RumahBolonGate
        leftRef={leftGateRef}
        rightRef={rightGateRef}
      />

      {/* KONTEN TENGAH COVER (BAGIAN ATAS & BAWAH, TENGAH TERBUKA BERSIH UNTUK FASAD RUMAH BOLON) */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-between h-full max-w-sm sm:max-w-md w-full mx-auto pointer-events-auto"
      >
        {/* ZONA 1 (ATAS): GANTUNGAN BUNGA EMAS & ROYAL LABEL THE WEDDING OF */}
        <div className="flex flex-col items-center text-center -mt-2 sm:-mt-1 mb-1">
          {/* Gantungan Bunga Emas Berayun Mulus */}
          <HangingFloral
            cordLength={28}
            flowerClassName="w-56 sm:w-64 h-14 sm:h-16"
            showDroplets={true}
            className="mb-1"
          />

          <div className="flex items-center gap-2 mb-1" aria-hidden="true">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/70" />
            <span className="w-1.5 h-1.5 rotate-45 border border-gold-bright bg-gold/40" />
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/70" />
          </div>

          <p className="font-body text-[10px] sm:text-[11px] tracking-[0.35em] text-gold-bright uppercase font-semibold">
            The Wedding Of
          </p>
        </div>

        {/* ZONA 2 (TENGAH): AREA TERBUKA BEBAS TEKS AGAR FASAD RUMAH BOLON TERLIHAT SEUTUHNYA */}
        <div className="flex-1 w-full pointer-events-none" aria-hidden="true" />

        {/* ZONA 3 (BAWAH): BADGE TANGGAL, KOTAK NAMA TAMU, & TOMBOL BUKA */}
        <div className="w-full flex flex-col items-center text-center space-y-2.5 sm:space-y-3 pb-1 sm:pb-2">
          {/* BADGE TANGGAL PERNIKAHAN ELEGAN (Hanya tampil bila tanggal sudah ditetapkan resmi) */}
          {weddingDate && weddingDate !== 'Segera Diumumkan' && (
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/45 bg-night/85 backdrop-blur-md shadow-xs">
              <span className="w-1 h-1 rotate-45 bg-gold-bright" />
              <span className="font-body text-[9.5px] sm:text-[10.5px] tracking-[0.2em] text-gold uppercase font-semibold">
                {weddingDate}
              </span>
              <span className="w-1 h-1 rotate-45 bg-gold-bright" />
            </div>
          )}

          {/* BINGKAI NAMA TAMU REGAL KOMPAK */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] p-2.5 sm:p-3 rounded-xs bg-gradient-to-b from-surface via-bg to-bg-alt border-2 border-gold/80 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,55,0.2)] overflow-hidden text-ink">
            {/* Ornamen Sudut Kotak Tamu */}
            <CornerOrnament size={20} opacity={0.6} variant="gorga" />

            {/* Inner Border Frame Emas */}
            <div className="relative z-10 px-2.5 py-1.5 sm:py-2 border border-gold/45 rounded-xs flex flex-col items-center bg-surface/60">
              {/* Sentuhan Karangan Bunga Mahkota Kartu Tamu */}
              <FloralAccent variant="crest" className="w-20 sm:w-24 h-10 sm:h-12 mx-auto -mt-1 mb-1 opacity-95 drop-shadow-xs" />

              <p className="font-body text-[9px] sm:text-[9.5px] text-gold-text tracking-[0.2em] uppercase font-bold mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>

              <div className="flex items-center justify-center gap-1.5 w-16 my-0.5">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="w-1 h-1 rotate-45 border border-gold-bright bg-gold/40" />
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/60" />
              </div>

              <h2 className="font-display text-base sm:text-lg md:text-xl text-ink font-bold tracking-wide break-words max-w-full my-0.5 drop-shadow-xs">
                {guestName}
              </h2>

              <p className="font-body text-[10px] sm:text-[10.5px] text-gold-text font-semibold tracking-wider uppercase mt-0.5">
                di Tempat
              </p>

              <p className="text-[8.5px] sm:text-[9px] text-ink-muted/80 mt-1 italic font-light">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>
          </div>

          {/* Tombol Buka Undangan (Aksen Gorga Berwibawa) */}
          <button
            type="button"
            onClick={handleOpenInvitation}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-2.5 sm:py-3 rounded-full text-xs font-body font-semibold tracking-[0.18em] uppercase text-on-night bg-gradient-to-r from-gorga via-gorga-bright to-gorga hover:brightness-110 active:scale-98 transition-all duration-300 border border-gold shadow-[0_4px_20px_var(--shadow-btn)] hover:shadow-[0_6px_28px_var(--shadow-btn)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <MailOpen className="w-3.5 h-3.5 text-on-night transition-transform duration-300 group-hover:scale-110" />
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
