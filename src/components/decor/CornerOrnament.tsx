import React from "react";

interface CornerOrnamentProps {
  size?: number;
  className?: string;
  opacity?: number;
  variant?: "gold" | "gorga";
  topOffset?: string | number;
  bottomOffset?: string | number;
  showTop?: boolean;
  showBottom?: boolean;
}

interface CornerSVGProps {
  size: number;
  opacity: number;
  mainStroke: string;
  accentStroke: string;
}

const CornerSVG: React.FC<CornerSVGProps> = ({ size, opacity, mainStroke, accentStroke }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    {/* Garis Sudut Siku 90 Derajat */}
    <path d="M2,46 L2,2 L46,2" stroke={mainStroke} strokeWidth="1.5" />
    <path d="M6,42 L6,6 L42,6" stroke={accentStroke} strokeWidth="0.8" strokeDasharray="3 2" />

    {/* Motif Ipon-ipon Segitiga Batak di Sudut */}
    <path d="M2,2 L14,14 L2,26 Z" fill={mainStroke} opacity="0.3" stroke={mainStroke} strokeWidth="1" />
    <path d="M2,2 L26,2 L14,14 Z" fill={mainStroke} opacity="0.3" stroke={mainStroke} strokeWidth="1" />
    <circle cx="10" cy="10" r="2" fill={accentStroke} />
  </svg>
);

export const CornerOrnament: React.FC<CornerOrnamentProps> = ({
  size = 48,
  className = "",
  opacity = 0.75,
  variant = "gold",
  topOffset = "0.5rem",
  bottomOffset = "0.5rem",
  showTop = true,
  showBottom = true,
}) => {
  const mainStroke = variant === "gorga" ? "var(--gorga, #174382)" : "var(--gold, #B38E46)";
  const accentStroke = variant === "gorga" ? "var(--gold-bright, #DFC48A)" : "var(--gorga, #174382)";

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {showTop && (
        <>
          <div className="absolute left-2" style={{ top: topOffset }}>
            <CornerSVG size={size} opacity={opacity} mainStroke={mainStroke} accentStroke={accentStroke} />
          </div>
          <div className="absolute right-2 -scale-x-100" style={{ top: topOffset }}>
            <CornerSVG size={size} opacity={opacity} mainStroke={mainStroke} accentStroke={accentStroke} />
          </div>
        </>
      )}

      {showBottom && (
        <>
          <div className="absolute left-2 -scale-y-100" style={{ bottom: bottomOffset }}>
            <CornerSVG size={size} opacity={opacity} mainStroke={mainStroke} accentStroke={accentStroke} />
          </div>
          <div className="absolute right-2 -scale-x-100 -scale-y-100" style={{ bottom: bottomOffset }}>
            <CornerSVG size={size} opacity={opacity} mainStroke={mainStroke} accentStroke={accentStroke} />
          </div>
        </>
      )}
    </div>
  );
};
