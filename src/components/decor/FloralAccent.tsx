import React from 'react';

export type FloralVariant = 'corner' | 'wreath' | 'bouquet' | 'arch' | 'crest' | 'stage';

export interface FloralAccentProps {
  variant: FloralVariant;
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  /**
   * Mengaktifkan ayunan pendulum halus (sway) khas gantungan bunga.
   * Default bernilai true untuk variant 'arch' dan 'crest'.
   */
  sway?: boolean | 'subtle' | 'normal';
}

const variantTokens: Record<FloralVariant, string> = {
  corner: 'var(--asset-flower-corner)',
  wreath: 'var(--asset-flower-wreath)',
  bouquet: 'var(--asset-flower-bouquet)',
  arch: 'var(--asset-flower-arch)',
  crest: 'var(--asset-flower-crest)',
  stage: 'var(--asset-flower-stage)',
};

export const FloralAccent: React.FC<FloralAccentProps> = ({
  variant,
  className = '',
  style = {},
  opacity = 1,
  flipHorizontal = false,
  flipVertical = false,
  sway = variant === 'arch' || variant === 'crest',
}) => {
  const isSwayActive = Boolean(sway);
  const swayClass =
    sway === 'subtle'
      ? 'animate-floral-sway-subtle'
      : isSwayActive
        ? 'animate-floral-sway'
        : '';

  const transform = [
    flipHorizontal ? 'scaleX(-1)' : '',
    flipVertical ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`pointer-events-none select-none ${swayClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className="w-full h-full bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: variantTokens[variant],
          opacity,
          ...(transform ? { transform } : {}),
        }}
      />
    </div>
  );
};
