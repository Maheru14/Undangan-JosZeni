import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { weddingConfig, type WeddingConfig } from '../config/wedding.config';
import { useGuestValidation } from '../hooks/useGuestValidation';
import { useAudio, type UseAudioReturn } from '../hooks/useAudio';
import type { GuestValidationStatus } from '../types/guest';

export interface AppContextType {
  isOpened: boolean;
  openInvitation: () => Promise<void>;
  guestName: string;
  guestStatus: GuestValidationStatus;
  guestQuota: number;
  isRsvpAllowed: boolean;
  guestCategory?: string;
  refreshGuestList: () => Promise<void>;
  audio: UseAudioReturn;
  config: WeddingConfig;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('opened') === '1' || params.get('opened') === 'true';
    }
    return false;
  });

  const guestValidation = useGuestValidation();
  const audio = useAudio(weddingConfig.audio.src);

  const openInvitation = useCallback(async () => {
    setIsOpened(true);
    // Memulai pemutaran audio di dalam thread gesture pengguna
    await audio.playAudio();
  }, [audio]);

  const value = useMemo<AppContextType>(
    () => ({
      isOpened,
      openInvitation,
      guestName: guestValidation.name,
      guestStatus: guestValidation.status,
      guestQuota: guestValidation.quota,
      isRsvpAllowed: guestValidation.isRsvpAllowed,
      guestCategory: guestValidation.category,
      refreshGuestList: guestValidation.refreshLiveList,
      audio,
      config: weddingConfig,
    }),
    [isOpened, openInvitation, guestValidation, audio],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext harus digunakan di dalam AppContextProvider');
  }
  return context;
}
