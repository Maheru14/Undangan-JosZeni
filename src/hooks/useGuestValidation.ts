import { useState, useEffect, useCallback } from 'react';
import {
  cleanRawParam,
  fetchLiveGuestList,
  validateGuest,
} from '../lib/guestValidationService';
import type { GuestValidationResult } from '../types/guest';

function getUrlParam(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('to');
  } catch {
    return null;
  }
}

/**
 * Hook komprehensif untuk memvalidasi tamu berdasarkan Google Sheets:
 * - Menangani 3 state: 'general', 'verified', dan 'unregistered'
 * - Sinkronisasi otomatis di latar belakang dengan Google Sheets live
 * - Akses instan (0ms) dari bundel statis & cache lokal
 */
export function useGuestValidation(): GuestValidationResult & {
  refreshLiveList: () => Promise<void>;
  isLoading: boolean;
} {
  const [guestState, setGuestState] = useState<GuestValidationResult>(() => {
    const rawParam = getUrlParam();
    return validateGuest(rawParam);
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const revalidate = useCallback((customParam?: string | null) => {
    const rawParam = customParam !== undefined ? customParam : getUrlParam();
    setGuestState(validateGuest(rawParam));
  }, []);

  const refreshLiveList = useCallback(async () => {
    setIsLoading(true);
    try {
      const liveList = await fetchLiveGuestList();
      const rawParam = getUrlParam();
      const updated = validateGuest(rawParam, liveList);
      setGuestState(updated);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      revalidate();
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [revalidate]);

  // Efek sinkronisasi latar belakang:
  // Jika nama pada URL belum terdaftar (mungkin baru ditambahkan pengantin beberapa saat lalu),
  // lakukan pengecekan langsung ke Google Sheets secara asinkron tanpa men-trigger synchronous cascading render.
  useEffect(() => {
    let isMounted = true;
    const rawParam = getUrlParam();
    const cleaned = cleanRawParam(rawParam);

    if (cleaned && guestState.status === 'unregistered') {
      void fetchLiveGuestList().then((liveList) => {
        if (!isMounted) return;
        const updated = validateGuest(rawParam, liveList);
        if (updated.status !== 'unregistered') {
          setGuestState(updated);
        }
      });
    } else {
      // Sinkronisasi santai di latar belakang saat idle
      const timeoutId = setTimeout(() => {
        void fetchLiveGuestList();
      }, 3000);
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [guestState.status]);

  return {
    ...guestState,
    refreshLiveList,
    isLoading,
  };
}
