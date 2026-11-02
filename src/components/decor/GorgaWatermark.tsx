import React from 'react';

interface GorgaWatermarkProps {
  variant?: 'light' | 'dark';
  className?: string;
  opacity?: number;
}

export const GorgaWatermark: React.FC<GorgaWatermarkProps> = ({
  variant = 'light',
  className = '',
  opacity,
}) => {
  const strokeColor = variant === 'dark' ? '#D9B45E' : '#B8924A';
  const defaultOpacity = variant === 'dark' ? 0.08 : 0.05;
  const appliedOpacity = opacity !== undefined ? opacity : defaultOpacity;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      style={{ opacity: appliedOpacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`gorga-pattern-${variant}`}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Pola Geometris Ipon-ipon (Segitiga Belah Ketupat Berjejer) */}
            <path
              d="M0,30 L15,15 L30,30 L45,15 L60,30 L45,45 L30,30 L15,45 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
            {/* Titik Mata Pusat Keharmonisan */}
            <circle cx="30" cy="30" r="2.5" fill={strokeColor} />
            <circle cx="0" cy="30" r="1.5" fill={strokeColor} />
            <circle cx="60" cy="30" r="1.5" fill={strokeColor} />
            <circle cx="30" cy="0" r="1.5" fill={strokeColor} />
            <circle cx="30" cy="60" r="1.5" fill={strokeColor} />
            {/* Garis Hairline diagonal pendukung */}
            <path d="M0,0 L60,60 M60,0 L0,60" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#gorga-pattern-${variant})`} />
      </svg>
    </div>
  );
};
