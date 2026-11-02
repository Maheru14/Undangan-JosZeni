import React from 'react';

interface GorgaFlourishWatermarkProps {
  className?: string;
  opacity?: number;
}

/**
 * Watermark Sulur Batik Gorga Batak Emas Transparan.
 * Memberikan tekstur semarak adat Batak (Gorga Simeol-meol) yang kaya & megah
 * tanpa mengorbankan keterbacaan teks.
 */
export const GorgaFlourishWatermark: React.FC<GorgaFlourishWatermarkProps> = ({
  className = '',
  opacity = 0.05,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-full bg-repeat"
        style={{
          backgroundImage: 'url(/images/gorga/gorga-flourish.webp)',
          backgroundSize: '240px auto',
          opacity,
        }}
      />
    </div>
  );
};
