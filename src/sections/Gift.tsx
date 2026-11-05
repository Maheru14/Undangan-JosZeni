import React, { useState } from 'react';
import { CreditCard, Gift as GiftIcon, Copy, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Divider } from '../components/decor/Divider';
import { GorgaWatermark } from '../components/decor/GorgaWatermark';
import { CornerOrnament } from '../components/decor/CornerOrnament';
import { FloralAccent } from '../components/decor/FloralAccent';
import { Toast } from '../components/ui/Toast';
import { Reveal } from '../components/layout/Reveal';

export const Gift: React.FC = () => {
  const { config } = useAppContext();
  const { gifts } = config;

  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const handleCopy = async (textToCopy: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setToastMessage(`${label} berhasil disalin!`);
      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    } catch {
      setToastMessage(`Gagal menyalin, silakan salin manual`);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    }
  };

  if (!gifts || gifts.length === 0) {
    return null;
  }

  return (
    <section
      id="gift"
      aria-label="Tanda Kasih dan Amplop Digital"
      className="relative py-20 px-6 bg-transparent text-ink overflow-hidden border-t border-line/60"
    >
      {/* WATERMARK GORGA IPON-IPON LEMBUT */}
      <GorgaWatermark variant="light" />

      <div className="relative z-10 w-full mx-auto text-center">
        {/* Header Section */}
        <Reveal direction="down" distance={30}>
          {/* Mahkota Lengkungan Bunga */}
          <FloralAccent variant="arch" className="w-52 sm:w-64 h-12 sm:h-14 mx-auto mb-2 drop-shadow-xs" />

          <p className="font-body text-xs tracking-[0.25em] text-gorga uppercase font-semibold mb-1">
            Wedding Gift
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold tracking-wide">
            Tanda Kasih &amp; Kado
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-2 max-w-sm mx-auto leading-relaxed font-light">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila bermaksud memberikan tanda kasih, dapat disampaikan melalui:
          </p>
        </Reveal>

        <Divider variant="light" className="my-6" />

        {/* STACK KARTU REKENING & ALAMAT DENGAN ANIMASI SCROLL KIRI & KANAN */}
        <div className="space-y-5 mt-8 text-left">
          {gifts.map((item, index) => {
            const isAddress = item.type === 'address';
            const isLeft = index % 2 === 0;

            return (
              <Reveal
                key={item.provider + index}
                direction={isLeft ? 'left' : 'right'}
                distance={70}
                duration={0.8}
              >
                <div className="relative p-5 sm:p-6 rounded-xs bg-surface border border-gold/40 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-gold-bright overflow-hidden">
                  {/* Ornamen Sudut Gorga */}
                  <CornerOrnament size={24} opacity={0.6} variant="gorga" />

                  {/* Watermark Gorga Halus */}
                  <GorgaWatermark variant="light" opacity={0.02} />

                  <div className="relative z-10">
                    {/* Header Kartu */}
                    <div className="flex items-center justify-between mb-3 border-b border-line/60 pb-2.5">
                      <span className="flex items-center gap-2 text-xs font-body font-semibold text-gorga uppercase tracking-wider">
                        {isAddress ? (
                          <GiftIcon className="w-4 h-4 stroke-[1.5]" />
                        ) : (
                          <CreditCard className="w-4 h-4 stroke-[1.5]" />
                        )}
                        <span>{item.provider}</span>
                      </span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-gold-bright mr-6" />
                    </div>

                    {/* Nilai / Nomor Rekening */}
                    <div className="my-3">
                      <p className="font-body text-[11px] text-ink-muted/80 uppercase tracking-wider mb-1">
                        {isAddress ? 'Alamat Pengiriman:' : 'Nomor Rekening:'}
                      </p>
                      <p
                        className={`font-display text-gold-text font-semibold tracking-wide select-all break-words ${
                          isAddress ? 'text-xs sm:text-sm font-body font-normal leading-relaxed text-ink' : 'text-lg sm:text-xl'
                        }`}
                      >
                        {item.accountNumber}
                      </p>
                    </div>

                    {/* Atas Nama */}
                    <p className="font-body text-xs text-ink-muted">
                      Atas Nama: <span className="font-medium text-ink">{item.accountHolder}</span>
                    </p>

                    {/* Catatan Tambahan */}
                    {item.note && (
                      <p className="font-body text-[11px] text-ink-muted/70 italic mt-1 font-light">
                        *{item.note}
                      </p>
                    )}
                  </div>

                  {/* Tombol Salin & Google Maps */}
                  <div className="pt-4 mt-4 border-t border-line/60 relative z-10 flex flex-col sm:flex-row gap-2.5">
                    {item.accountNumber !== '-' ? (
                      <button
                        type="button"
                        onClick={() => handleCopy(item.accountNumber, item.provider)}
                        aria-label={`Salin ${item.provider}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs border border-gold text-gorga bg-surface-alt hover:bg-gorga hover:text-white active:bg-gorga active:text-white active:scale-98 transition-colors duration-200 text-xs font-body font-semibold tracking-wider min-h-[44px] cursor-pointer shadow-xs"
                      >
                        <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
                        <span>{isAddress ? 'Salin Alamat' : 'Salin Nomor Rekening'}</span>
                      </button>
                    ) : (
                      <div className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs border border-gold/30 text-ink-muted/70 bg-surface-alt/50 text-xs font-body font-medium tracking-wider min-h-[44px]">
                        <span>Informasi Alamat Segera Hadir</span>
                      </div>
                    )}

                    {isAddress && item.mapsUrl && (
                      <a
                        href={item.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Buka lokasi pengiriman di Google Maps"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs border border-gold bg-gorga text-white hover:bg-gorga-bright active:bg-gorga active:scale-98 transition-colors duration-200 text-xs font-body font-semibold tracking-wider min-h-[44px] shadow-xs cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
                        <span>Buka Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* TOAST FEEDBACK COPY TO CLIPBOARD */}
      <Toast message={toastMessage} isVisible={toastVisible} />
    </section>
  );
};
