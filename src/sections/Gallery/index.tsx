import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Divider } from '../../components/decor/Divider';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';
import { Lightbox } from './Lightbox';
import { HangingFloral } from '../../components/decor/HangingFloral';
import { StageFloralBorder } from '../../components/decor/StageFloralBorder';
import { Reveal } from '../../components/layout/Reveal';
import { GalleryLayout1 } from './GalleryLayout1';
import { GalleryLayout2 } from './GalleryLayout2';
import { GalleryLayout3 } from './GalleryLayout3';
import { GalleryLayout4 } from './GalleryLayout4';
import { GalleryDynamicBackdrop } from './GalleryDynamicBackdrop';

export type GalleryLayoutVariant = 'layout-1' | 'layout-2' | 'layout-3' | 'layout-4';

/**
 * Pilihan varian layout galeri (dapat disesuaikan sesuai preferensi):
 * - 'layout-1': Klasik berbingkai emas & ornamen sudut Gorga
 * - 'layout-2': Editorial asimetris tanpa bingkai (frameless mosaic)
 * - 'layout-3': Potret besar megah seperti profil mempelai dengan gradasi pinggir tipis (tanpa bingkai)
 * - 'layout-4': Karusel 3D Poster Film berputar tanpa batas dengan dynamic ambient background bergradasi
 */
export const ACTIVE_GALLERY_LAYOUT: GalleryLayoutVariant = 'layout-4';

export const Gallery: React.FC = () => {
  const { config } = useAppContext();
  const { gallery } = config;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  const renderActiveLayout = () => {
    switch (ACTIVE_GALLERY_LAYOUT as GalleryLayoutVariant) {
      case 'layout-1':
        return <GalleryLayout1 items={gallery} onOpenLightbox={openLightbox} />;
      case 'layout-2':
        return <GalleryLayout2 items={gallery} onOpenLightbox={openLightbox} />;
      case 'layout-3':
        return <GalleryLayout3 items={gallery} onOpenLightbox={openLightbox} />;
      case 'layout-4':
      default:
        return (
          <GalleryLayout4
            items={gallery}
            onOpenLightbox={openLightbox}
            onActiveIndexChange={setActivePhotoIndex}
          />
        );
    }
  };

  return (
    <section
      id="gallery"
      aria-label="Galeri Dokumentasi Foto"
      className="relative pt-20 pb-24 sm:pb-28 px-4 sm:px-6 bg-transparent text-ink overflow-hidden border-t border-line/60"
    >
      {/* DYNAMIC AMBIENT BACKDROP: BERUBAH MENGIKUTI FOTO YANG DI-SCROLL */}
      {ACTIVE_GALLERY_LAYOUT === 'layout-4' && gallery[activePhotoIndex] && (
        <GalleryDynamicBackdrop src={gallery[activePhotoIndex].src} />
      )}

      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      <div className="relative z-10 w-full mx-auto text-center">
        {/* Header Section */}
        <Reveal direction="down" distance={30}>
          {/* Gantungan Bunga Mahkota Berayun Mulus */}
          <HangingFloral cordLength={22} flowerClassName="w-52 sm:w-64 h-12 sm:h-14" className="mb-2 drop-shadow-xs" />

          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-1">
            Momen Na Uli
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
            Galeri Kebersamaan
          </h2>
        </Reveal>

        <Divider variant="light" className="my-6" />

        {/* KONTEN GALERI TERPILIH */}
        {renderActiveLayout()}
      </div>

      {/* LIGHTBOX MODAL */}
      <Lightbox
        isOpen={isOpen}
        currentIndex={currentIndex}
        items={gallery}
        onClose={() => setIsOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* KARANGAN BUNGA PANGGUNG DI DASAR SEKSI GALERI FOTO */}
      <StageFloralBorder position="bottom" heightClassName="h-16 sm:h-20 md:h-24" />
    </section>
  );
};
