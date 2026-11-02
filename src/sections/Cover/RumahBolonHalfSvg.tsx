import React from 'react';

interface RumahBolonHalfSvgProps {
  side: 'left' | 'right';
  className?: string;
}

/**
 * Komponen Vektor Garis Autentik Rumah Bolon Batak Toba (Inline SVG Murni).
 * Menghilangkan latensi HTTP image request sehingga kedua belah atap & fasad Rumah Bolon
 * tampil seketika (0 ms delay) saat halaman dimuat.
 * - side="left": memotong fasad sisi kiri (viewBox="0 0 300 660")
 * - side="right": memotong fasad sisi kanan (viewBox="300 0 300 660")
 */
export const RumahBolonHalfSvg: React.FC<RumahBolonHalfSvgProps> = ({ side, className = '' }) => {
  const viewBox = side === 'left' ? '0 0 300 660' : '300 0 300 660';
  const label = side === 'left' ? 'Rumah Bolon Sisi Kiri' : 'Rumah Bolon Sisi Kanan';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className={className}
    >
      <defs>
        <filter id={`rbGoldGlow-${side}`} x="-20%" y="-15%" width="140%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feFlood floodColor="#d8b45f" floodOpacity="0.35" />
          <feComposite in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g id={`dotc-${side}`}>
          <circle r="3.2" fill="none" stroke="#d8b45f" strokeWidth="1.3" />
        </g>
        <g id={`sqc-${side}`}>
          <rect x="-3.5" y="-3.5" width="7" height="7" fill="none" stroke="#d8b45f" strokeWidth="1.3" />
          <path d="M0-3.5V3.5M-3.5 0H3.5" stroke="#d8b45f" strokeWidth="1" fill="none" />
        </g>
        <g id={`fanL-${side}`} fill="none" stroke="#d8b45f" strokeLinecap="round">
          <path d="M116.9 416.5L266.8 146.9M127.4 422.3L277.3 152.7M137.8 428.4L287.8 158.6" strokeWidth="1.5" opacity="0.85" />
          <path d="M152.6 352.3L173.6 364M188.3 288.1L209.3 299.8M224 223.9L245 235.6" strokeWidth="1.3" opacity="0.75" />
        </g>
      </defs>
      <g filter={`url(#rbGoldGlow-${side})`} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Dasar / Fondasi Refleksi Garis */}
        <rect x="102" y="608" width="396" height="12" fill="none" stroke="#d8b45f" strokeWidth="2" />
        <rect x="108" y="620" width="384" height="28" fill="none" stroke="#d8b45f" strokeWidth="1.8" />
        <g fill="none" stroke="#d8b45f" strokeWidth="1.4">
          <path d="M176 624L185 636H180V644H172V636H167Z" />
          <path d="M230 624L239 636H234V644H226V636H221Z" />
          <path d="M372 624L381 636H376V644H368V636H363Z" />
          <path d="M426 624L435 636H430V644H422V636H417Z" />
          <rect x="275" y="625" width="50" height="19" />
        </g>

        {/* Kolong Tiang (Tiang Pondasi Bergaris Rapi) */}
        <g fill="none" stroke="#d8b45f" strokeWidth="1.5">
          <rect x="123" y="544" width="10" height="63" /><rect x="164" y="544" width="10" height="63" />
          <rect x="202" y="544" width="10" height="63" /><rect x="245" y="544" width="10" height="63" />
          <rect x="467" y="544" width="10" height="63" /><rect x="426" y="544" width="10" height="63" />
          <rect x="388" y="544" width="10" height="63" /><rect x="345" y="544" width="10" height="63" />
        </g>
        {/* Balok Horizontal Penjepit Tiang */}
        <g fill="none" stroke="#d8b45f" strokeWidth="1.3">
          <rect x="103" y="554" width="160" height="7" /><rect x="337" y="554" width="160" height="7" />
          <rect x="103" y="581" width="160" height="7" /><rect x="337" y="581" width="160" height="7" />
        </g>
        {/* Tangga Masuk Tengah (Anak Tangga Garis) */}
        <path d="M271 544V607M329 544V607" stroke="#d8b45f" strokeWidth="2.2" fill="none" />
        <rect x="273" y="546" width="54" height="61" fill="none" stroke="#d8b45f" strokeWidth="1.8" />
        <path d="M273 555H327M273 564H327M273 573H327M273 582H327M273 591H327M273 600H327" stroke="#d8b45f" strokeWidth="1.8" fill="none" />

        {/* Pita Ukiran Titik & Geometris Garis */}
        <rect x="112" y="512" width="376" height="26" fill="none" stroke="#d8b45f" strokeWidth="2.4" />
        <rect x="118" y="516" width="364" height="18" fill="none" stroke="#d8b45f" strokeWidth="1.2" />
        <use href={`#dotc-${side}`} x="135" y="525" /><use href={`#sqc-${side}`} x="155.6" y="525" />
        <use href={`#dotc-${side}`} x="176.3" y="525" /><use href={`#sqc-${side}`} x="196.9" y="525" />
        <use href={`#dotc-${side}`} x="217.5" y="525" /><use href={`#sqc-${side}`} x="238.1" y="525" />
        <use href={`#dotc-${side}`} x="258.8" y="525" /><use href={`#sqc-${side}`} x="279.4" y="525" />
        <use href={`#dotc-${side}`} x="300" y="525" />
        <use href={`#sqc-${side}`} x="320.6" y="525" /><use href={`#dotc-${side}`} x="341.3" y="525" />
        <use href={`#sqc-${side}`} x="361.9" y="525" /><use href={`#dotc-${side}`} x="382.5" y="525" />
        <use href={`#sqc-${side}`} x="403.1" y="525" /><use href={`#dotc-${side}`} x="423.8" y="525" />
        <use href={`#sqc-${side}`} x="444.4" y="525" /><use href={`#dotc-${side}`} x="465" y="525" />

        {/* Dinding Rumah Bolon (Garis Kontur) */}
        <path d="M108 454H492L478 508H122Z" fill="none" stroke="#d8b45f" strokeWidth="2.8" />
        <path d="M119 460L128 504M481 460L472 504" stroke="#d8b45f" strokeWidth="2" fill="none" />
        <g fill="none" stroke="#d8b45f" strokeWidth="1.4">
          <path d="M168 462H184L183 482L176 506L169 482Z" />
          <path d="M222 462H238L237 482L230 506L223 482Z" />
          <path d="M362 462H378L377 482L370 506L363 482Z" />
          <path d="M416 462H432L431 482L424 506L417 482Z" />
        </g>
        {/* Pintu Masuk Garis */}
        <rect x="270" y="462" width="60" height="44" fill="none" stroke="#d8b45f" strokeWidth="2.2" />
        <rect x="275" y="467" width="50" height="34" fill="none" stroke="#d8b45f" strokeWidth="1.2" />
        <path d="M300 467V501" stroke="#d8b45f" strokeWidth="1.2" fill="none" />

        {/* Interior Atap & Struktur Gable */}
        <path d="M300 42L78 441H522Z" fill="none" stroke="#d8b45f" strokeWidth="2.2" />
        <use href={`#fanL-${side}`} />
        <use href={`#fanL-${side}`} transform="translate(600 0) scale(-1 1)" />

        {/* Segitiga Gable Dalam Bergaris Bertingkat */}
        <path d="M300 188L152 410H448Z" fill="none" stroke="#d8b45f" strokeWidth="1.5" opacity="0.6" />
        <path d="M300 188L152 410M300 188L448 410" stroke="#d8b45f" strokeWidth="4" fill="none" />
        <path d="M300 206L176 392M300 206L424 392" stroke="#d8b45f" strokeWidth="1.8" fill="none" opacity="0.8" />
        <path d="M300 236L222 350M300 236L378 350" stroke="#d8b45f" strokeWidth="2.5" fill="none" />

        {/* Tiang Bubungan, Palang Lengkung, & Lingkaran */}
        <path d="M300 56V156M300 176V236" stroke="#d8b45f" strokeWidth="3" fill="none" />
        <path d="M236 170Q300 150 364 170" stroke="#d8b45f" strokeWidth="3" fill="none" />
        <circle cx="300" cy="164" r="9" fill="none" stroke="#d8b45f" strokeWidth="1.8" />
        <circle cx="300" cy="164" r="3.5" fill="none" stroke="#d8b45f" strokeWidth="1.2" />

        {/* Matahari Tengah & Busur Sinar */}
        <circle cx="300" cy="294" r="11" fill="none" stroke="#d8b45f" strokeWidth="2" />
        <circle cx="300" cy="294" r="5" fill="none" stroke="#d8b45f" strokeWidth="1.2" />
        <path d="M268 306Q272 286 288 280M332 306Q328 286 312 280" stroke="#d8b45f" strokeWidth="2" fill="none" />

        {/* Susunan Garis Horisontal Bertingkat */}
        <g stroke="#d8b45f" strokeWidth="2" fill="none">
          <path d="M222 318H378M216 326H384M209 334H391M203 342H397" />
        </g>

        {/* Langkan Balustrade Bergaris */}
        <rect x="198" y="349" width="204" height="5" fill="none" stroke="#d8b45f" strokeWidth="1.4" />
        <rect x="198" y="398" width="204" height="5" fill="none" stroke="#d8b45f" strokeWidth="1.4" />
        <g fill="none" stroke="#d8b45f" strokeWidth="1.2">
          <rect x="204" y="355" width="6" height="42" /><rect x="217" y="355" width="6" height="42" />
          <rect x="230" y="355" width="6" height="42" /><rect x="243" y="355" width="6" height="42" />
          <rect x="256" y="355" width="6" height="42" /><rect x="269" y="355" width="6" height="42" />
          <rect x="390" y="355" width="6" height="42" /><rect x="377" y="355" width="6" height="42" />
          <rect x="364" y="355" width="6" height="42" /><rect x="351" y="355" width="6" height="42" />
          <rect x="338" y="355" width="6" height="42" /><rect x="325" y="355" width="6" height="42" />
        </g>
        {/* Lambang Gorga di Tengah Langkan */}
        <path d="M284 372L300 360L316 372L309 381L300 377L291 381Z" fill="none" stroke="#d8b45f" strokeWidth="1.5" />
        <path d="M300 381L306 389L300 397L294 389Z" fill="none" stroke="#d8b45f" strokeWidth="1.4" />

        {/* Garis Bawah Gable */}
        <g stroke="#d8b45f" fill="none">
          <path d="M142 414H458" strokeWidth="2.5" />
          <path d="M128 424H472" strokeWidth="2.5" />
          <path d="M118 433H482" strokeWidth="1.5" />
        </g>

        {/* Balok Bawah Atap */}
        <rect x="98" y="441" width="404" height="13" fill="none" stroke="#d8b45f" strokeWidth="2" />
        <path d="M104 437H496M104 458H496" stroke="#d8b45f" strokeWidth="1.5" fill="none" />

        {/* Kontur Garis Tepi Lengkung Atap Rumah Bolon (Double Verge Lines) */}
        <path d="M51 474L300 24L549 474" fill="none" stroke="#d8b45f" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="round" />
        <path d="M62 470L300 42L538 470" fill="none" stroke="#d8b45f" strokeWidth="1.6" strokeDasharray="3 7" opacity="0.8" />
        <path d="M73 466L300 60L527 466" fill="none" stroke="#d8b45f" strokeWidth="2.6" strokeLinejoin="miter" strokeLinecap="round" />

        {/* Kaki Lengkung Atap (Tanduk Khas Rumah Bolon - Kontur Garis Luar) */}
        <path d="M40 450C30 478 50 494 84 490C108 488 122 476 126 462L100 446Z" fill="none" stroke="#d8b45f" strokeWidth="2.4" />
        <path d="M560 450C570 478 550 494 516 490C492 488 478 476 474 462L500 446Z" fill="none" stroke="#d8b45f" strokeWidth="2.4" />
      </g>
    </svg>
  );
};
