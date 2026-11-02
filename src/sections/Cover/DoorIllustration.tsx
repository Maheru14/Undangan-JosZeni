import React from 'react';

interface DoorIllustrationProps {
  className?: string;
}

/**
 * Komponen Ilustrasi Pintu Gerbang Megah Adat Batak (Royal Sapphire Double Arched Door).
 * Menggantikan latar biru polos di dalam portal lingkaran/arch Cover.
 * Dirancang dengan warna yang sama (Royal Sapphire & Midnight Navy dengan aksen benang emas Batak),
 * menampilkan arsitektur daun pintu ganda (double door) simetris:
 * - Dua daun pintu (kiri & kanan) yang terbelah sempurna di garis tengah (x = 250).
 * - Kusen lengkung bertingkat (arched casing) dengan bevel & highlight 3D.
 * - Alur papan kayu panel vertikal (vertical wooden slats) dengan bayangan & sorotan cahaya.
 * - Balok palang pintu horizontal (transom & lock rails) dengan deretan paku payung emas antik (rivets).
 * - Panel-panel bertingkat (recessed beveled panels) berukir motif Batak Gorga Ipon-ipon.
 * - Sepasang tarikan/gagang pintu antik emas (ornate gold door pull handles) di daun pintu kiri & kanan.
 * - Engsel plat tembaga/emas di sisi luar.
 */
export const DoorIllustration: React.FC<DoorIllustrationProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 800"
        preserveAspectRatio="none"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 1. GRADASI DASAR KAYU BIRU SAPPHIRE MALAM */}
          <linearGradient id="doorBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050E1E" />
            <stop offset="18%" stopColor="#081832" />
            <stop offset="50%" stopColor="#0D2447" />
            <stop offset="82%" stopColor="#081832" />
            <stop offset="100%" stopColor="#040A16" />
          </linearGradient>

          {/* 2. GRADASI PANEL TENGGELAM (INNER RECESSED PANELS) */}
          <linearGradient id="panelFieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#030812" />
            <stop offset="25%" stopColor="#061224" />
            <stop offset="75%" stopColor="#07152B" />
            <stop offset="100%" stopColor="#02060E" />
          </linearGradient>

          {/* 3. GRADASI KUSEN LENGKUNG TEPI (OUTER ARCH FRAME) */}
          <linearGradient id="casingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#030710" />
            <stop offset="8%" stopColor="#0C203F" />
            <stop offset="50%" stopColor="#0F284E" />
            <stop offset="92%" stopColor="#0C203F" />
            <stop offset="100%" stopColor="#030710" />
          </linearGradient>

          {/* 4. GRADASI EMAS CHAMPAGNE KUNINGAN ANTIK (ANTIQUE GOLD) */}
          <linearGradient id="goldPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC48A" />
            <stop offset="35%" stopColor="#FFF3D4" />
            <stop offset="70%" stopColor="#B38E46" />
            <stop offset="100%" stopColor="#6E5220" />
          </linearGradient>

          {/* 5. GRADASI HANDLE TARIKAN PINTU (3D GOLD PULL BAR) */}
          <linearGradient id="goldHandleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A5B22" />
            <stop offset="30%" stopColor="#DFC48A" />
            <stop offset="50%" stopColor="#FFF8E7" />
            <stop offset="75%" stopColor="#B38E46" />
            <stop offset="100%" stopColor="#543B12" />
          </linearGradient>

          {/* 6. GRADASI RIVET / PAKU EMAS ANTIK */}
          <radialGradient id="rivetGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF4D6" />
            <stop offset="45%" stopColor="#DFC48A" />
            <stop offset="85%" stopColor="#9C7733" />
            <stop offset="100%" stopColor="#4A3410" />
          </radialGradient>

          {/* 7. RADIAL GLOW PUSAT PINTU (AMALGAMASI CAHAYA EMAS DANAU TOBA) */}
          <radialGradient id="centerDoorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DFC48A" stopOpacity="0.14" />
            <stop offset="40%" stopColor="#2E6FD4" stopOpacity="0.10" />
            <stop offset="75%" stopColor="#174382" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* 8. MOTIF GORGA IPON-IPON PATTERN (GEOMETRIS GERIGI GIGI IKAN KHAS BATAK) */}
          <pattern id="gorgaIponH" x="0" y="0" width="14" height="7" patternUnits="userSpaceOnUse">
            <path
              d="M0 7 L3.5 0 L7 7 L10.5 0 L14 7 Z"
              fill="none"
              stroke="#DFC48A"
              strokeWidth="0.75"
              opacity="0.30"
            />
          </pattern>

          {/* 9. FILTER DROP SHADOW UNTUK TARIKAN PINTU 3D */}
          <filter id="handleShadow" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* ================================================================= */}
        {/* LAPISAN 1: DASAR DAUN PINTU KAYU SAPPHIRE DENGAN RADIUS CAPSULE   */}
        {/* ================================================================= */}
        <rect x="0" y="0" width="500" height="800" rx="250" fill="url(#doorBaseGrad)" />

        {/* Ambient Glow Emas & Sapphire di Tengah Daun Pintu */}
        <rect x="0" y="0" width="500" height="800" rx="250" fill="url(#centerDoorGlow)" />

        {/* ================================================================= */}
        {/* LAPISAN 2: PAPAN KAYU VERTIKAL (VERTICAL WOOD PLANKS)             */}
        {/* Garis-garis alur papan kayu di kedua bilah pintu                  */}
        {/* ================================================================= */}
        <g opacity="0.55">
          {/* Papan Bilah Kiri (x: 48 sampai 216) */}
          {[48, 76, 104, 132, 160, 188, 216].map((x) => (
            <g key={`plank-left-${x}`}>
              <line x1={x} y1="15" x2={x} y2="785" stroke="#02060E" strokeWidth="1.5" />
              <line x1={x + 1} y1="15" x2={x + 1} y2="785" stroke="#1D3E6B" strokeWidth="0.8" opacity="0.65" />
            </g>
          ))}

          {/* Papan Bilah Kanan (x: 284 sampai 452) */}
          {[284, 312, 340, 368, 396, 424, 452].map((x) => (
            <g key={`plank-right-${x}`}>
              <line x1={x} y1="15" x2={x} y2="785" stroke="#02060E" strokeWidth="1.5" />
              <line x1={x + 1} y1="15" x2={x + 1} y2="785" stroke="#1D3E6B" strokeWidth="0.8" opacity="0.65" />
            </g>
          ))}
        </g>

        {/* ================================================================= */}
        {/* LAPISAN 3: KUSEN PINTU LENGKUNG TEPI (ARCHED DOOR CASING)         */}
        {/* ================================================================= */}
        {/* Frame Bevel Luar */}
        <path
          d="M 250 14 
             C 120 14, 14 120, 14 250 
             L 14 550 
             C 14 680, 120 786, 250 786 
             C 380 786, 486 680, 486 550 
             L 486 250 
             C 486 120, 380 14, 250 14 Z"
          fill="none"
          stroke="#0D2549"
          strokeWidth="10"
          opacity="0.75"
        />
        {/* Hairline Emas Kusen */}
        <path
          d="M 250 20 
             C 124 20, 20 124, 20 250 
             L 20 550 
             C 20 676, 124 780, 250 780 
             C 376 780, 480 676, 480 550 
             L 480 250 
             C 480 124, 376 20, 250 20 Z"
          fill="none"
          stroke="#DFC48A"
          strokeWidth="1.2"
          opacity="0.38"
        />

        {/* ================================================================= */}
        {/* LAPISAN 4: PANEL-PANEL PINTU TIMBUL/TENGGELAM (BEVELED PANELS)   */}
        {/* ================================================================= */}

        {/* --- 4A. PANEL BUSUR ATAS (TOP ARCHED PANELS: Y=45..146) --- */}
        <g id="top-panel-left">
          <path
            d="M 238 48 
               C 156 52, 54 94, 54 146 
               L 238 146 Z"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2.2"
          />
          <path
            d="M 234 56 
               C 160 60, 62 98, 62 140 
               L 234 140 Z"
            fill="none"
            stroke="#DFC48A"
            strokeWidth="0.8"
            opacity="0.32"
          />
          <line x1="54" y1="146" x2="238" y2="146" stroke="#264F86" strokeWidth="1" />
        </g>

        <g id="top-panel-right">
          <path
            d="M 262 48 
               C 344 52, 446 94, 446 146 
               L 262 146 Z"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2.2"
          />
          <path
            d="M 266 56 
               C 340 60, 438 98, 438 140 
               L 266 140 Z"
            fill="none"
            stroke="#DFC48A"
            strokeWidth="0.8"
            opacity="0.32"
          />
          <line x1="262" y1="146" x2="446" y2="146" stroke="#264F86" strokeWidth="1" />
        </g>

        {/* --- 4B. PALANG TRANSOM HORIZONTAL ATAS (UPPER CROSS RAIL: Y=152..174) --- */}
        <g id="upper-cross-rail">
          {/* Balok Kiri */}
          <rect x="36" y="152" width="206" height="22" fill="#0A1E3B" stroke="#02060E" strokeWidth="2" />
          <line x1="36" y1="153" x2="242" y2="153" stroke="#29548E" strokeWidth="1" />
          <line x1="36" y1="173" x2="242" y2="173" stroke="#030710" strokeWidth="1.5" />
          <rect x="42" y="160" width="194" height="7" fill="url(#gorgaIponH)" />

          {/* Balok Kanan */}
          <rect x="258" y="152" width="206" height="22" fill="#0A1E3B" stroke="#02060E" strokeWidth="2" />
          <line x1="258" y1="153" x2="464" y2="153" stroke="#29548E" strokeWidth="1" />
          <line x1="258" y1="173" x2="464" y2="173" stroke="#030710" strokeWidth="1.5" />
          <rect x="264" y="160" width="194" height="7" fill="url(#gorgaIponH)" />
        </g>

        {/* --- 4C. PANEL UTAMA TENGAH (MAIN BODY PANELS: Y=182..472) --- */}
        {/* Daun Pintu Kiri: Panel Utama Tengah */}
        <g id="main-panel-left">
          <rect
            x="40"
            y="182"
            width="198"
            height="290"
            rx="4"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2.2"
          />
          {/* Bevel Highlight Sisi Bawah & Kanan */}
          <line x1="41" y1="471" x2="238" y2="471" stroke="#28528B" strokeWidth="1.2" />
          <line x1="238" y1="183" x2="238" y2="471" stroke="#28528B" strokeWidth="1.2" />

          {/* Hairline Emas Bingkai Dalam */}
          <rect
            x="48"
            y="190"
            width="182"
            height="274"
            rx="2"
            fill="none"
            stroke="#DFC48A"
            strokeWidth="0.8"
            opacity="0.30"
          />

          {/* Aksen Sudut Geometris Batak di 4 Sudut Panel Kiri */}
          <path d="M 52 202 L 52 194 L 60 194" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
          <path d="M 222 194 L 230 194 L 230 202" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
          <path d="M 52 454 L 52 462 L 60 462" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
          <path d="M 222 462 L 230 462 L 230 454" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
        </g>

        {/* Daun Pintu Kanan: Panel Utama Tengah */}
        <g id="main-panel-right">
          <rect
            x="262"
            y="182"
            width="198"
            height="290"
            rx="4"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2.2"
          />
          {/* Bevel Highlight Sisi Bawah & Kanan */}
          <line x1="263" y1="471" x2="460" y2="471" stroke="#28528B" strokeWidth="1.2" />
          <line x1="460" y1="183" x2="460" y2="471" stroke="#28528B" strokeWidth="1.2" />

          {/* Hairline Emas Bingkai Dalam */}
          <rect
            x="270"
            y="190"
            width="182"
            height="274"
            rx="2"
            fill="none"
            stroke="#DFC48A"
            strokeWidth="0.8"
            opacity="0.30"
          />

          {/* Aksen Sudut Geometris Batak di 4 Sudut Panel Kanan */}
          <path d="M 270 202 L 270 194 L 278 194" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
          <path d="M 444 194 L 452 194 L 452 202" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
          <path d="M 270 454 L 270 462 L 278 462" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
          <path d="M 444 462 L 452 462 L 452 454" fill="none" stroke="#DFC48A" strokeWidth="1.2" opacity="0.55" />
        </g>

        {/* --- 4D. PALANG TENGAH UTAMA / LOCK RAIL (Y=480..524, TINGGI 44PX) --- */}
        <g id="lock-rail">
          {/* Balok Kiri */}
          <rect x="28" y="480" width="216" height="44" fill="#0B203E" stroke="#02060E" strokeWidth="2.4" />
          <line x1="28" y1="481" x2="244" y2="481" stroke="#2F5C9B" strokeWidth="1.2" />
          <line x1="28" y1="523" x2="244" y2="523" stroke="#030710" strokeWidth="1.5" />
          <rect x="36" y="498" width="200" height="7" fill="url(#gorgaIponH)" />

          {/* Balok Kanan */}
          <rect x="256" y="480" width="216" height="44" fill="#0B203E" stroke="#02060E" strokeWidth="2.4" />
          <line x1="256" y1="481" x2="472" y2="481" stroke="#2F5C9B" strokeWidth="1.2" />
          <line x1="256" y1="523" x2="472" y2="523" stroke="#030710" strokeWidth="1.5" />
          <rect x="264" y="498" width="200" height="7" fill="url(#gorgaIponH)" />
        </g>

        {/* --- 4E. PANEL BAWAH (LOWER PANELS: Y=532..684) --- */}
        {/* Daun Pintu Kiri: Panel Bawah */}
        <g id="lower-panel-left">
          <rect
            x="40"
            y="532"
            width="198"
            height="152"
            rx="4"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2.2"
          />
          <line x1="41" y1="683" x2="238" y2="683" stroke="#28528B" strokeWidth="1.2" />
          <rect
            x="48"
            y="540"
            width="182"
            height="136"
            rx="2"
            fill="none"
            stroke="#DFC48A"
            strokeWidth="0.8"
            opacity="0.28"
          />
        </g>

        {/* Daun Pintu Kanan: Panel Bawah */}
        <g id="lower-panel-right">
          <rect
            x="262"
            y="532"
            width="198"
            height="152"
            rx="4"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2.2"
          />
          <line x1="263" y1="683" x2="460" y2="683" stroke="#28528B" strokeWidth="1.2" />
          <rect
            x="270"
            y="540"
            width="182"
            height="136"
            rx="2"
            fill="none"
            stroke="#DFC48A"
            strokeWidth="0.8"
            opacity="0.28"
          />
        </g>

        {/* --- 4F. PALANG KAKI BAWAH & PANEL KAKI DASAR (Y=692..760) --- */}
        <g id="bottom-kick-panel">
          {/* Daun Pintu Kiri: Panel Kaki */}
          <path
            d="M 44 694 
               L 238 694 
               L 238 755 
               C 170 755, 88 735, 44 694 Z"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2"
          />

          {/* Daun Pintu Kanan: Panel Kaki */}
          <path
            d="M 262 694 
               L 456 694 
               C 412 735, 330 755, 262 755 Z"
            fill="url(#panelFieldGrad)"
            stroke="#02060E"
            strokeWidth="2"
          />
        </g>

        {/* ================================================================= */}
        {/* LAPISAN 5: CELAH TENGAH & ASTRAGAL (MEETING STILE AT X = 250)     */}
        {/* ================================================================= */}
        <g id="center-astragal-seam">
          {/* Tiang Sambungan Daun Kiri (x: 242 .. 250) */}
          <rect x="242" y="20" width="8" height="760" fill="#0D2240" stroke="#02050B" strokeWidth="0.8" />
          <line x1="242" y1="20" x2="242" y2="780" stroke="#02050B" strokeWidth="1.8" />

          {/* Tiang Sambungan Daun Kanan (x: 250 .. 258) */}
          <rect x="250" y="20" width="8" height="760" fill="#0D2240" stroke="#02050B" strokeWidth="0.8" />
          <line x1="258" y1="20" x2="258" y2="780" stroke="#254C82" strokeWidth="1.2" />

          {/* Garis Celah Pemisah Sejati Tepat di Tengah (x = 250) */}
          <line x1="250" y1="14" x2="250" y2="786" stroke="#010307" strokeWidth="2.4" />

          {/* Deretan Paku Ornamen Emas (Rivets) di Sepanjang Bilah Kiri */}
          {[45, 100, 163, 240, 330, 410, 502, 580, 650, 715, 755].map((y) => (
            <circle key={`rivet-l-${y}`} cx="245.5" cy={y} r="2.8" fill="url(#rivetGrad)" stroke="#4A3410" strokeWidth="0.6" />
          ))}

          {/* Deretan Paku Ornamen Emas (Rivets) di Sepanjang Bilah Kanan */}
          {[45, 100, 163, 240, 330, 410, 502, 580, 650, 715, 755].map((y) => (
            <circle key={`rivet-r-${y}`} cx="254.5" cy={y} r="2.8" fill="url(#rivetGrad)" stroke="#4A3410" strokeWidth="0.6" />
          ))}
        </g>

        {/* ================================================================= */}
        {/* LAPISAN 6: TARIKAN PINTU ANTIK EMAS (ORNATE GOLD DOOR PULLS)      */}
        {/* ================================================================= */}

        {/* --- TARIKAN PINTU KIRI (LEFT DOOR HANDLE) --- */}
        <g id="door-handle-left" filter="url(#handleShadow)">
          <path
            d="M 231 474 
               L 238 481 
               L 238 523 
               L 231 530 
               L 224 523 
               L 224 481 Z"
            fill="url(#goldPlateGrad)"
            stroke="#543C12"
            strokeWidth="1.2"
          />

          <rect x="229.5" y="476" width="3" height="3" transform="rotate(45 231 477.5)" fill="#FFF3D4" />
          <rect x="229.5" y="526" width="3" height="3" transform="rotate(45 231 527.5)" fill="#543C12" />

          <circle cx="231" cy="487" r="4.2" fill="url(#rivetGrad)" stroke="#4A3410" strokeWidth="0.8" />
          <circle cx="231" cy="517" r="4.2" fill="url(#rivetGrad)" stroke="#4A3410" strokeWidth="0.8" />

          <path
            d="M 231 487 
               C 220 489, 218 495, 218 502 
               C 218 509, 220 515, 231 517"
            fill="none"
            stroke="url(#goldHandleGrad)"
            strokeWidth="4.8"
            strokeLinecap="round"
          />
          <path
            d="M 230 489 
               C 221 491, 219.5 496, 219.5 502 
               C 219.5 508, 221 513, 230 515"
            fill="none"
            stroke="#FFFDF5"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* --- TARIKAN PINTU KANAN (RIGHT DOOR HANDLE) --- */}
        <g id="door-handle-right" filter="url(#handleShadow)">
          <path
            d="M 269 474 
               L 276 481 
               L 276 523 
               L 269 530 
               L 262 523 
               L 262 481 Z"
            fill="url(#goldPlateGrad)"
            stroke="#543C12"
            strokeWidth="1.2"
          />

          <rect x="267.5" y="476" width="3" height="3" transform="rotate(45 269 477.5)" fill="#FFF3D4" />
          <rect x="267.5" y="526" width="3" height="3" transform="rotate(45 269 527.5)" fill="#543C12" />

          <circle cx="269" cy="487" r="4.2" fill="url(#rivetGrad)" stroke="#4A3410" strokeWidth="0.8" />
          <circle cx="269" cy="517" r="4.2" fill="url(#rivetGrad)" stroke="#4A3410" strokeWidth="0.8" />

          <path
            d="M 269 487 
               C 280 489, 282 495, 282 502 
               C 282 509, 280 515, 269 517"
            fill="none"
            stroke="url(#goldHandleGrad)"
            strokeWidth="4.8"
            strokeLinecap="round"
          />
          <path
            d="M 270 489 
               C 279 491, 280.5 496, 280.5 502 
               C 280.5 508, 279 513, 270 515"
            fill="none"
            stroke="#FFFDF5"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* ================================================================= */}
        {/* LAPISAN 7: PLAT ENGSEL EMAS TEPI LUAR (OUTER STRAP HINGES)        */}
        {/* ================================================================= */}
        <g id="outer-hinges" opacity="0.80">
          <rect x="18" y="156" width="22" height="12" rx="2" fill="url(#goldPlateGrad)" stroke="#543C12" strokeWidth="0.8" />
          <circle cx="26" cy="162" r="2" fill="#543C12" />

          <rect x="460" y="156" width="22" height="12" rx="2" fill="url(#goldPlateGrad)" stroke="#543C12" strokeWidth="0.8" />
          <circle cx="474" cy="162" r="2" fill="#543C12" />

          <rect x="18" y="496" width="22" height="12" rx="2" fill="url(#goldPlateGrad)" stroke="#543C12" strokeWidth="0.8" />
          <circle cx="26" cy="502" r="2" fill="#543C12" />

          <rect x="460" y="496" width="22" height="12" rx="2" fill="url(#goldPlateGrad)" stroke="#543C12" strokeWidth="0.8" />
          <circle cx="474" cy="502" r="2" fill="#543C12" />
        </g>
      </svg>
    </div>
  );
};
