import React from 'react';
import { Home, Heart, Calendar, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useScrollSpy } from '../../hooks/useScrollSpy';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Utama', icon: Home },
  { id: 'couple', label: 'Mempelai', icon: Heart },
  { id: 'events', label: 'Acara', icon: Calendar },
  { id: 'gallery', label: 'Galeri', icon: ImageIcon },
  { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
];

const SECTION_IDS = ['hero', 'couple', 'events', 'doa', 'story', 'gallery', 'gift', 'rsvp', 'closing'];

/**
 * Komponen Floating Bottom Navigation Bar (Dock Bawah).
 * Terhubung ke useScrollSpy untuk mendeteksi seksi yang aktif saat digulir.
 * Memenuhi batas tap target sentuh minimal 44x44px per item.
 */
export const BottomNav: React.FC = () => {
  const { isOpened } = useAppContext();
  const activeSection = useScrollSpy(SECTION_IDS, 35);

  // Jangan tampilkan navigasi sebelum cover dibuka
  if (!isOpened) {
    return null;
  }

  const handleNavClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Navigasi Menu Cepat Undangan"
      className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-night/85 border border-gold/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          // Tandai aktif jika seksi persis sama atau berada dalam rumpun seksi terkait
          const isActive =
            activeSection === item.id ||
            (item.id === 'couple' && activeSection === 'story') ||
            (item.id === 'events' && activeSection === 'doa') ||
            (item.id === 'rsvp' && (activeSection === 'gift' || activeSection === 'closing'));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-label={`Pindah ke bagian ${item.label}`}
              className={`relative flex flex-col items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright ${
                isActive
                  ? 'text-gold-bright font-semibold'
                  : 'text-on-night/70 hover:text-on-night'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
              <span className="text-[9px] font-body mt-0.5 tracking-tight hidden sm:block">
                {item.label}
              </span>

              {/* Titik Penanda Indikator Aktif */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gold-bright" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
