import { useState, useEffect } from 'react';

/**
 * Hook untuk melacak ID section yang sedang aktif di viewport menggunakan IntersectionObserver.
 * Berguna untuk sinkronisasi BottomNav dan navigasi cepat.
 */
export function useScrollSpy(sectionIds: string[], offsetPercent = 30): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: `-${offsetPercent}% 0px -${100 - offsetPercent - 10}% 0px`,
          threshold: 0,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds, offsetPercent]);

  return activeSection;
}
