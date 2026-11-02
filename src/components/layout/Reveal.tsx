import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down' | 'none';
  distance?: number;
  duration?: number;
}

/**
 * Komponen Animasi Scroll Reveal Dua Arah (Bidirectional In & Out).
 * - Saat masuk ke viewport: elemen meluncur masuk dari kiri/kanan/bawah (opacity 0 -> 1).
 * - Saat di-scroll lewat keluar dari viewport: elemen menghilang kembali (opacity 1 -> 0).
 * - Saat di-scroll balik masuk viewport: elemen muncul kembali (play).
 * - Elemen di viewport awal langsung tampil tanpa jeda.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 60,
  duration = 0.75,
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Aksesibilitas: Lewati animasi jika reduced motion aktif
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const isMobile = window.innerWidth < 640;
    const effectiveDistance = isMobile ? Math.min(distance, 25) : distance;

    let initialX = 0;
    let initialY = 0;

    if (direction === 'left') {
      initialX = -effectiveDistance;
    } else if (direction === 'right') {
      initialX = effectiveDistance;
    } else if (direction === 'up') {
      initialY = effectiveDistance;
    } else if (direction === 'down') {
      initialY = -effectiveDistance;
    }

    const rect = el.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInitiallyVisible) {
      // Jika sudah di viewport saat halaman dimuat (misal Hero):
      gsap.fromTo(
        el,
        { opacity: 0, x: initialX * 0.5, y: initialY * 0.5 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay: Math.min(delay, 0.2),
          ease: 'power2.out',
          overwrite: 'auto',
        },
      );
    } else {
      // Set posisi tersembunyi di luar viewport
      gsap.set(el, {
        opacity: 0,
        x: initialX,
        y: initialY,
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Meluncur masuk saat masuk viewport
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          } else {
            // Menghilang kembali saat keluar dari viewport
            gsap.to(el, {
              opacity: 0,
              x: initialX,
              y: initialY,
              duration: 0.45,
              ease: 'power2.in',
              overwrite: 'auto',
            });
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '10px 0px -20px 0px',
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [direction, distance, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
