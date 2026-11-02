import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { weddingConfig, type WeddingConfig } from '../config/wedding.config';
import { useGuestName } from '../hooks/useGuestName';
import { useAudio, type UseAudioReturn } from '../hooks/useAudio';

export interface AppContextType {
  isOpened: boolean;
  openInvitation: () => Promise<void>;
  guestName: string;
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
  const guestName = useGuestName();
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
      guestName,
      audio,
      config: weddingConfig,
    }),
    [isOpened, openInvitation, guestName, audio],
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
