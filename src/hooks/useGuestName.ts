import { useState, useEffect } from 'react';

function parseGuestName(): string {
  if (typeof window === 'undefined') return 'Tamu Undangan';

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const rawParam = searchParams.get('to');

    if (!rawParam) {
      return 'Tamu Undangan';
    }

    // Decode URI component secara aman
    const decoded = decodeURIComponent(rawParam.replace(/\+/g, ' ')).trim();

    // Hapus karakter tak kasat mata (seperti format WhatsApp \u200e) & tag HTML/kurung siku
    const sanitized = decoded
      .replace(/[\u200B-\u200D\u200E\u200F\uFEFF]/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return sanitized || 'Tamu Undangan';
  } catch {
    return 'Tamu Undangan';
  }
}

/**
 * Hook untuk mengekstrak dan men-sanitasi nama tamu dari query parameter URL `?to=`.
 * Menginisialisasi state langsung saat render tanpa cascading re-render di effect.
 */
export function useGuestName(): string {
  const [guestName, setGuestName] = useState<string>(parseGuestName);

  useEffect(() => {
    const onPopState = () => {
      setGuestName(parseGuestName());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return guestName;
}
