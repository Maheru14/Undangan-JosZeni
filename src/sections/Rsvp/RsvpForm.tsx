import React, { useState } from 'react';
import { Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { rsvpStorage, type AttendanceStatus, type RsvpEntry } from '../../lib/storageAdapter';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';

interface RsvpFormProps {
  onSuccess: (entry: RsvpEntry) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onSuccess }) => {
  const { guestName } = useAppContext();

  const [name, setName] = useState<string>(
    guestName !== 'Tamu Undangan' ? guestName : '',
  );
  const [attendance, setAttendance] = useState<AttendanceStatus>('hadir');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccessFeedback, setIsSuccessFeedback] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Mohon isi nama lengkap Anda.');
      return;
    }

    if (!message.trim()) {
      setErrorMsg('Mohon tuliskan ucapan atau doa restu Anda.');
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = await rsvpStorage.save({
        name: name.trim(),
        attendance,
        guestCount: attendance === 'hadir' ? 1 : 0,
        message: message.trim(),
      });

      setMessage('');
      setIsSuccessFeedback(true);
      onSuccess(saved);

      setTimeout(() => {
        setIsSuccessFeedback(false);
      }, 4000);
    } catch {
      setErrorMsg('Terjadi kesalahan saat menyimpan konfirmasi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-6 sm:p-8 rounded-xs bg-surface border border-gold/40 shadow-md text-left transition-all duration-300 hover:border-gold-bright overflow-hidden"
    >
      {/* Ornamen Sudut Gorga */}
      <CornerOrnament size={24} opacity={0.6} variant="gorga" />

      {/* Watermark Gorga Halus */}
      <GorgaWatermark variant="light" opacity={0.02} />

      <div className="relative z-10">
        <h3 className="font-display text-xl sm:text-2xl text-ink font-semibold tracking-wide mb-1">
          Konfirmasi Kehadiran
        </h3>
        <p className="font-body text-xs sm:text-sm text-ink-muted mb-6 font-light">
          Mohon mengisi formulir di bawah ini untuk membantu kami mempersiapkan jamuan pesta.
        </p>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xs bg-red-100 border border-red-300 text-red-800 text-xs font-body">
            {errorMsg}
          </div>
        )}

        {isSuccessFeedback && (
          <div className="mb-5 p-3 rounded-xs bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-body flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 stroke-[2] text-emerald-600" />
            <span>Terima kasih! Konfirmasi dan doa restu Anda telah kami terima dengan sukacita.</span>
          </div>
        )}

        <div className="space-y-5 font-body">
          {/* NAMA LENGKAP */}
          <div>
            <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-wider text-ink font-medium mb-1.5">
              Nama Lengkap <span className="text-gorga">*</span>
            </label>
            <div className="relative">
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 pl-10 text-sm rounded-xs border border-gold/40 bg-surface text-ink placeholder:text-ink/40 focus:border-gorga focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gorga transition-colors"
              />
              <User className="w-4 h-4 text-gorga absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
            </div>
          </div>

          {/* STATUS KEHADIRAN (RADIO CARDS) */}
          <div>
            <span className="block text-xs uppercase tracking-wider text-ink font-medium mb-2">
              Status Kehadiran <span className="text-gorga">*</span>
            </span>
            <div className="grid grid-cols-2 gap-3">
              {/* HADIR */}
              <label
                className={`flex flex-col items-center justify-center p-3 rounded-xs border text-xs font-medium cursor-pointer transition-all select-none min-h-[44px] ${
                  attendance === 'hadir'
                    ? 'border-gorga bg-gorga/15 text-gorga font-semibold shadow-xs'
                    : 'border-gold/30 bg-surface-alt text-ink hover:border-gold'
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="hadir"
                  checked={attendance === 'hadir'}
                  onChange={() => setAttendance('hadir')}
                  className="sr-only"
                />
                <span>Pasti Hadir</span>
              </label>

              {/* BERHALANGAN */}
              <label
                className={`flex flex-col items-center justify-center p-3 rounded-xs border text-xs font-medium cursor-pointer transition-all select-none min-h-[44px] ${
                  attendance === 'berhalangan'
                    ? 'border-gorga bg-gorga/15 text-gorga font-semibold shadow-xs'
                    : 'border-gold/30 bg-surface-alt text-ink hover:border-gold'
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="berhalangan"
                  checked={attendance === 'berhalangan'}
                  onChange={() => setAttendance('berhalangan')}
                  className="sr-only"
                />
                <span>Berhalangan</span>
              </label>
            </div>
          </div>

          {/* DOA RESTU & PESAN */}
          <div>
            <label htmlFor="rsvp-message" className="block text-xs uppercase tracking-wider text-ink font-medium mb-1.5">
              Ucapan &amp; Doa Restu <span className="text-gorga">*</span>
            </label>
            <div className="relative">
              <textarea
                id="rsvp-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat dan doa tulus untuk kedua mempelai..."
                className="w-full px-4 py-3 pl-10 text-sm rounded-xs border border-gold/40 bg-surface text-ink placeholder:text-ink/40 focus:border-gorga focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gorga transition-colors resize-none"
              />
              <MessageSquare className="w-4 h-4 text-gorga absolute left-3.5 top-3.5 stroke-[1.5]" />
            </div>
          </div>

          {/* TOMBOL KIRIM */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-gradient-to-r from-gorga via-gorga-bright to-gorga hover:brightness-110 text-on-night border border-gold active:scale-98 transition-all duration-200 text-sm font-body font-semibold tracking-wider min-h-[44px] cursor-pointer shadow-[0_4px_16px_var(--shadow-btn)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Send className="w-4 h-4 stroke-[1.5]" />
              <span>{isSubmitting ? 'Mengirim Konfirmasi...' : 'Kirim Konfirmasi & Doa Restu'}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
