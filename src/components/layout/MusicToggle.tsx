import React from 'react';
import { Disc3, VolumeX } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

/**
 * Komponen Floating Audio Controller (Piringan Disc Berputar).
 * Muncul melayang di sudut layar setelah cover dibuka.
 * Memenuhi kriteria tap target ≥ 44px, focus state aksesibel, dan animasi adaptif.
 */
export const MusicToggle: React.FC = () => {
  const { audio, isOpened } = useAppContext();
  const { isPlaying, toggleAudio } = audio;

  // Jangan tampilkan tombol bila undangan belum dibuka
  if (!isOpened) {
    return null;
  }

  return (
    <div
      className="fixed z-40 pointer-events-auto"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        className="w-12 h-12 rounded-full bg-night/80 text-gold-bright border border-gold/40 shadow-[0_4px_16px_rgba(42,31,25,0.35)] backdrop-blur-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
      >
        {isPlaying ? (
          <Disc3
            className="w-6 h-6 animate-spin motion-reduce:animate-none"
            style={{ animationDuration: '3.5s' }}
          />
        ) : (
          <VolumeX className="w-5 h-5 text-on-night/70" />
        )}
      </button>
    </div>
  );
};
