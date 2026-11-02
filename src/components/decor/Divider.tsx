import React from 'react';

interface DividerProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';
  const lineColor = isDark ? 'from-transparent via-gold/50 to-transparent' : 'from-transparent via-gold/45 to-transparent';
  const dotBorder = isDark ? 'border-gold-bright bg-gold/40' : 'border-gold bg-gold/30';

  return (
    <div
      className={`flex items-center justify-center gap-2.5 w-full max-w-[240px] mx-auto select-none ${className}`}
      aria-hidden="true"
    >
      <span className={`h-[1px] flex-1 bg-gradient-to-r ${lineColor}`} />
      
      {/* Aksen Tiga Segitiga Ipon-ipon Tengah */}
      <span className="w-1.5 h-1.5 rotate-45 bg-gorga/70" />
      <span className={`w-2.5 h-2.5 rotate-45 border ${dotBorder}`} />
      <span className="w-1.5 h-1.5 rotate-45 bg-gorga/70" />
      
      <span className={`h-[1px] flex-1 bg-gradient-to-l ${lineColor}`} />
    </div>
  );
};
