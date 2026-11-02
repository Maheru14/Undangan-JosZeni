import React from 'react';

interface PhotoFrameProps {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'square';
  className?: string;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  aspectRatio = 'portrait',
  className = '',
}) => {
  return (
    <div className={`relative p-2.5 bg-gradient-to-b from-surface to-bg-alt border border-gold/40 rounded-t-[48px] rounded-b-xs shadow-[0_4px_20px_rgba(43,30,26,0.1)] select-none ${className}`}>
      {/* Garis Border Ganda Khas Rumah Bolon */}
      <div className="relative overflow-hidden rounded-t-[42px] rounded-b-xs border border-gold/60 p-1">
        <div className={`relative overflow-hidden rounded-t-[38px] rounded-b-xs ${aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
      
      {/* Aksen Puncak Atap Runcing Mini */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-gold bg-surface" />
    </div>
  );
};
