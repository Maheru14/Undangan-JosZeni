import React from 'react';

interface StageFloralBorderProps {
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  position?: 'bottom' | 'top' | 'relative';
  heightClassName?: string;
  flipVertical?: boolean;
}

/**
 * Komponen Karangan Bunga Panggung Lurus Lebar (Straight Stage Floral Runner).
 * Terbentang horizontal memanjang dari tepi kiri hingga tepi kanan halaman secara merata (lurus),
 * menyerupai dekorasi barisan bunga di tepi depan panggung pertunjukan pelaminan megah.
 * Bebas noda hitam dengan transparansi murni dan proporsi bunga alami (tidak gepeng).
 * Mendukung tema aktif (Royal Sapphire Navy & Emas untuk Palet #2, atau Red Gorga untuk Palet #1).
 */
export const StageFloralBorder: React.FC<StageFloralBorderProps> = ({
  className = '',
  style = {},
  opacity = 1,
  position = 'bottom',
  heightClassName = 'h-16 sm:h-20 md:h-24',
  flipVertical = false,
}) => {
  const positionClass =
    position === 'bottom'
      ? 'absolute bottom-0 inset-x-0 z-15 pointer-events-none'
      : position === 'top'
        ? 'absolute top-0 inset-x-0 z-15 pointer-events-none'
        : 'relative w-full pointer-events-none';

  return (
    <div
      className={`${positionClass} w-full overflow-hidden select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className={`w-full ${heightClassName} bg-bottom bg-repeat-x transition-opacity duration-500 ${
          flipVertical ? 'scale-y-[-1]' : ''
        }`}
        style={{
          backgroundImage: 'var(--asset-flower-stage)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'repeat-x',
          opacity,
        }}
      />
    </div>
  );
};
