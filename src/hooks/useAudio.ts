import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseAudioReturn {
  isPlaying: boolean;
  playAudio: () => Promise<void>;
  pauseAudio: () => void;
  toggleAudio: () => void;
}

/**
 * Hook untuk mengelola pemutaran audio latar (BGM).
 * Menangani kebijakan autoplay browser dengan mengeksekusi play() di dalam event gesture.
 */
const DEFAULT_VOLUME = 0.68;

export function useAudio(audioSrc: string): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = (e: Event) => {
      console.warn('Audio playback/loading error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const playAudio = useCallback(async () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(audioSrc);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = DEFAULT_VOLUME;
      audioRef.current = audio;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Autoplay diblokir oleh browser atau file audio belum siap:', err);
      setIsPlaying(false);
    }
  }, [audioSrc]);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      void playAudio();
      return;
    }
    if (audio.paused) {
      void playAudio();
    } else {
      pauseAudio();
    }
  }, [playAudio, pauseAudio]);

  return {
    isPlaying,
    playAudio,
    pauseAudio,
    toggleAudio,
  };
}
