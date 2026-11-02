import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Calendar, Volume2, VolumeX } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useCountdown } from '../hooks/useCountdown';
import { Divider } from '../components/decor/Divider';
import { GorgaWatermark } from '../components/decor/GorgaWatermark';
import { FloralAccent } from '../components/decor/FloralAccent';
import { HangingFloral } from '../components/decor/HangingFloral';
import { StageFloralBorder } from '../components/decor/StageFloralBorder';
import { Reveal } from '../components/layout/Reveal';

export const Hero: React.FC = () => {
  const { config, isOpened, audio } = useAppContext();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(config.countdown.targetIsoDate);

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const hasAnimatedOnOpen = useRef<boolean>(false);

  // Kontrol Autoplay & Auto-Pause saat Scroll (Intersection Observer)
  useEffect(() => {
    const videoEl = videoRef.current;
    const sectionEl = sectionRef.current;
    if (!videoEl || !sectionEl) return;

    // Jika undangan belum dibuka, pastikan video dalam keadaan pause
    if (!isOpened) {
      videoEl.pause();
      return;
    }

    // Beri jeda 1000ms agar animasi gerbang split-gate selesai bergeser sepenuhnya terlebih dahulu
    // sehingga GPU dan video decoder di smartphone tidak berebut thread di awal
    const playTimer = setTimeout(() => {
      void videoEl.play().catch(() => {});
    }, 1000);

    // Observer: Otomatis pause video saat tamu scroll menjauh dari section Hero
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      {
        threshold: 0.15, // Aktif saat minimal 15% section terlihat
      },
    );

    observer.observe(sectionEl);

    return () => {
      clearTimeout(playTimer);
      observer.disconnect();
    };
  }, [isOpened]);

  // Animasi masuk halus untuk video saat halaman pertama kali dibuka
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container || !isOpened || hasAnimatedOnOpen.current) return;

    hasAnimatedOnOpen.current = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(container, { opacity: 1, scale: 1 });
      return;
    }

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.9,
        ease: 'power2.out',
      },
    );
  }, [isOpened]);

  // Handler Suara Video (Mute / Unmute dengan sinkronisasi ke BGM)
  const toggleVideoSound = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isVideoMuted) {
      // Unmute video -> jeda musik BGM agar tidak bentrok
      videoEl.muted = false;
      setIsVideoMuted(false);
      audio.pauseAudio();
    } else {
      // Mute video -> lanjutkan musik BGM
      videoEl.muted = true;
      setIsVideoMuted(true);
      void audio.playAudio();
    }
  };

  const mainEvent = config.events[0] || config.events[1]; // Pemberkatan / Acara Utama

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Salam Pembuka dan Hitung Mundur"
      className="relative min-h-[920px] pt-12 pb-24 sm:pb-28 px-4 sm:px-6 flex flex-col items-center justify-start text-center bg-bg-main text-ink overflow-hidden"
    >
      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      {/* OPSI B: LENGKUNGAN KUBAH KATEDRAL MEWAH (ROYAL CATHEDRAL ARCH PORTAL) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-x-2.5 sm:inset-x-5 top-4 sm:top-6 max-w-xl mx-auto h-[880px] sm:h-[930px] z-0 pointer-events-none select-none rounded-t-[180px] sm:rounded-t-[220px] rounded-b-[36px] sm:rounded-b-[44px] p-[1.5px] bg-gradient-to-b from-gold/65 via-gold/30 to-gold/50 shadow-[0_20px_60px_rgba(7,18,36,0.16),0_2px_12px_rgba(179,142,70,0.22)]"
        aria-hidden="true"
      >
        {/* INNER CONTAINER DENGAN DOUBLE BORDER EMAS & VIGNETTE DALAM */}
        <div className="relative w-full h-full rounded-t-[178px] sm:rounded-t-[218px] rounded-b-[34px] sm:rounded-b-[42px] overflow-hidden bg-bg-main/30 ring-1 ring-inset ring-gold/25 ring-offset-1 ring-offset-bg-main/40">
          <video
            ref={videoRef}
            src="/video/hero-prewed.mp4"
            poster="/video/hero-poster.jpg"
            autoPlay={false}
            muted={isVideoMuted}
            loop
            playsInline
            preload={isOpened ? 'auto' : 'none'}
            className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.98]"
          />

          {/* GRADASI PENCAHAYAAN MEWAH (CINEMATIC LIGHTING): MELINDUNGI KETERBACAAN TEKS & KONTEN */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-main/85 via-bg-main/20 via-35% to-bg-main/90 pointer-events-none z-10" />

          {/* INNER DEPTH VIGNETTE: SENSASI KEDALAMAN SEPERTI JENDELA KATEDRAL KERAJAAN */}
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(7,18,36,0.25)] pointer-events-none z-10" />

          {/* AKSEN MAHKOTA LENGKUNG EMAS DI TITIK PUNCAK KUBAH */}
          <div className="absolute top-3 inset-x-0 flex justify-center items-center gap-1.5 opacity-70 z-20">
            <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
          </div>
        </div>
      </div>

      {/* 1. BLOK HEADER & LOGO RUMAH BOLON */}
      <Reveal direction="down" distance={30} duration={0.8} className="relative z-10 w-full flex flex-col items-center">
        {/* SILUET ILUSTRASI RUMAH BOLON AUTENTIK */}
        <div className="w-20 sm:w-24 h-auto mb-3" aria-hidden="true">
          <img
            src="/images/rumah-bolon/rumah-bolon-full.svg"
            alt=""
            decoding="async"
            className="w-full h-auto object-contain drop-shadow-[0_4px_16px_rgba(216,180,95,0.45)]"
          />
        </div>

        {/* Gantungan Bunga Mahkota Header Berayun Mulus */}
        <HangingFloral
          cordLength={28}
          flowerClassName="w-64 sm:w-80 h-16 sm:h-20"
          showDroplets={true}
          className="mb-1 drop-shadow-xs"
        />

        {/* Salam Pembuka */}
        {config.greeting.traditional ? (
          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-bold mb-1">
            {config.greeting.traditional}
          </p>
        ) : null}
        <p className="font-body text-xs sm:text-sm text-ink-muted italic mb-3 max-w-sm mx-auto leading-relaxed font-light">
          {config.greeting.opening}
        </p>

        <Divider variant="light" className="my-2" />

        {/* Subtitle */}
        <p className="font-body text-[11px] tracking-[0.25em] text-gold-text uppercase my-2 font-medium">
          Pernikahan
        </p>

        {/* Nama Mempelai Monumental (Berada anggun di atas video background) */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-text font-semibold tracking-wide leading-tight mt-2 mb-8 drop-shadow-sm [text-shadow:0_2px_16px_rgba(255,253,249,0.95)]">
          {config.couple.groom.shortName}
          <span className="inline-block text-2xl sm:text-4xl text-gorga font-light mx-2 sm:mx-3">
            &amp;
          </span>
          {config.couple.bride.shortName}
        </h1>
      </Reveal>

      {/* RUANG PANDANG VIDEO SINEMATIK TENGAH (MEMBERI RUANG AGAR MOMEN KEDUA MEMPELAI TERLIHAT JELAS) */}
      <div className="relative z-10 w-full h-[180px] sm:h-[220px] flex items-end justify-end px-4 mb-2 pointer-events-auto">
        {/* Tombol Mute / Unmute Video Halus di Pojok Kanan */}
        <button
          type="button"
          onClick={toggleVideoSound}
          aria-label={isVideoMuted ? 'Nyalakan audio video' : 'Bisukan audio video'}
          className="p-2 rounded-full bg-surface/85 text-gorga border border-gold/40 shadow-sm backdrop-blur-xs hover:bg-surface transition-all active:scale-95 cursor-pointer"
        >
          {isVideoMuted ? (
            <VolumeX className="w-3.5 h-3.5 stroke-[1.75]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 stroke-[1.75]" />
          )}
        </button>
      </div>

      {/* 2. BLOK TANGGAL & HITUNG MUNDUR (BERADA DI ATAS GRADASI BAWAH VIDEO) */}
      <Reveal direction="up" distance={30} duration={0.8} className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center mt-2">
        {/* Tanggal Monumental */}
        {mainEvent && (
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 bg-surface/95 text-ink font-body text-xs sm:text-sm mb-6 shadow-sm backdrop-blur-xs">
            <Calendar className="w-3.5 h-3.5 text-gorga stroke-[1.5]" />
            <span className="font-medium tracking-wide">{mainEvent.date}</span>
          </div>
        )}

        {/* HITUNG MUNDUR (COUNTDOWN) */}
        {config.countdown.targetIsoDate && !isNaN(new Date(config.countdown.targetIsoDate).getTime()) ? (
          !isExpired ? (
            <div className="w-full">
              {/* Sentuhan Medallion Bunga di Atas Countdown */}
              <FloralAccent variant="crest" className="w-16 h-9 mx-auto -mb-1 opacity-80" />

              <p className="font-body text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-3 font-medium">
                Menghitung Hari Menuju Hari Bahagia
              </p>

              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {/* HARI */}
                <div className="p-2.5 sm:p-3 rounded-xs bg-surface border border-gold/40 shadow-xs flex flex-col items-center">
                  <span className="font-display text-xl sm:text-2xl font-semibold text-gorga tabular-nums">
                    {days}
                  </span>
                  <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-muted mt-0.5">
                    Hari
                  </span>
                </div>

                {/* JAM */}
                <div className="p-2.5 sm:p-3 rounded-xs bg-surface border border-gold/40 shadow-xs flex flex-col items-center">
                  <span className="font-display text-xl sm:text-2xl font-semibold text-gorga tabular-nums">
                    {String(hours).padStart(2, '0')}
                  </span>
                  <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-muted mt-0.5">
                    Jam
                  </span>
                </div>

                {/* MENIT */}
                <div className="p-2.5 sm:p-3 rounded-xs bg-surface border border-gold/40 shadow-xs flex flex-col items-center">
                  <span className="font-display text-xl sm:text-2xl font-semibold text-gorga tabular-nums">
                    {String(minutes).padStart(2, '0')}
                  </span>
                  <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-muted mt-0.5">
                    Menit
                  </span>
                </div>

                {/* DETIK */}
                <div className="p-2.5 sm:p-3 rounded-xs bg-surface border border-gold/40 shadow-xs flex flex-col items-center">
                  <span className="font-display text-xl sm:text-2xl font-semibold text-gorga tabular-nums">
                    {String(seconds).padStart(2, '0')}
                  </span>
                  <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-wider text-gold-text mt-0.5">
                    Detik
                  </span>
                </div>
              </div>
            </div>
          ) : null
        ) : (
          <div className="w-full">
            <p className="font-body text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-3 font-medium">
              Menghitung Hari Menuju Hari Bahagia
            </p>

            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {[
                { label: 'Hari', val: '-' },
                { label: 'Jam', val: '-' },
                { label: 'Menit', val: '-' },
                { label: 'Detik', val: '-' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-2.5 sm:p-3 rounded-xs bg-surface border border-gold/40 shadow-xs flex flex-col items-center"
                >
                  <span className="font-display text-xl sm:text-2xl font-semibold text-gorga tabular-nums">
                    {item.val}
                  </span>
                  <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-muted mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Reveal>

      {/* KARANGAN BUNGA PANGGUNG MEWAH DI DASAR HERO SECTION */}
      <StageFloralBorder position="bottom" heightClassName="h-16 sm:h-22 md:h-26" />
    </section>
  );
};
