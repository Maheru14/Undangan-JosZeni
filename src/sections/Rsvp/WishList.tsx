import React from 'react';
import { MessageSquareQuote, Clock } from 'lucide-react';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';
import type { RsvpEntry } from '../../lib/storageAdapter';

interface WishListProps {
  entries: RsvpEntry[];
}

function formatRelativeTime(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Baru saja';
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays === 1) return 'Kemarin';
    return `${diffDays} hari yang lalu`;
  } catch {
    return 'Beberapa waktu lalu';
  }
}

export const WishList: React.FC<WishListProps> = ({ entries }) => {
  return (
    <div className="relative p-6 sm:p-8 rounded-xs bg-surface border border-gold/40 shadow-md flex flex-col h-full text-left overflow-hidden">
      {/* Ornamen Sudut Gorga */}
      <CornerOrnament size={24} opacity={0.6} variant="gold" />

      {/* Watermark Gorga Halus */}
      <GorgaWatermark variant="light" opacity={0.02} />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl text-ink font-semibold tracking-wide">
            Buku Doa &amp; Ucapan
          </h3>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-0.5 font-light">
            Untaian doa dan harapan tulus dari keluarga serta sahabat{entries.length > 0 ? ` (${entries.length} pesan)` : ''}
          </p>
        </div>
        <MessageSquareQuote className="w-6 h-6 text-gorga stroke-[1.5]" />
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto max-h-[380px] space-y-3.5 pr-1 font-body text-xs">
        {entries.length === 0 ? (
          <div className="py-12 px-4 text-center text-ink-muted/80 italic font-light">
            Belum ada ucapan doa. Jadilah yang pertama memberikan ucapan dan doa restu untuk kedua mempelai!
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 sm:p-4 rounded-xs border border-line bg-bg space-y-1.5 transition-colors hover:border-gold/60"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-ink text-xs sm:text-sm">
                  {entry.name}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-ink-muted/80 font-light">
                  <Clock className="w-3 h-3 stroke-[1.25]" />
                  <span>{formatRelativeTime(entry.createdAt)}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide ${
                    entry.attendance === 'hadir'
                      ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-300/60'
                      : 'bg-amber-100/80 text-amber-800 border border-amber-300/60'
                  }`}
                >
                  {entry.attendance === 'hadir' ? 'Pasti Hadir' : 'Berhalangan'}
                </span>
              </div>

              <p className="text-ink/90 text-xs sm:text-[13px] leading-relaxed pt-1 border-t border-line/40">
                {entry.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
