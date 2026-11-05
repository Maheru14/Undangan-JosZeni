import React, { useState } from 'react';
import { Send, CheckCircle2, User, MessageSquare, ShieldAlert, RotateCw, Globe, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { rsvpStorage, type AttendanceStatus, type RsvpEntry } from '../../lib/storageAdapter';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';

interface RsvpFormProps {
  onSuccess: (entry: RsvpEntry) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onSuccess }) => {
  const { guestName, guestStatus, guestQuota, isRsvpAllowed, refreshGuestList } = useAppContext();

  // Jika tamu terverifikasi, gunakan nama resmi dari daftar; jika general, gunakan input manual
  const [manualName, setManualName] = useState<string>(() => {
    if (guestStatus === 'verified') return '';
    return guestName !== 'Tamu Undangan' ? guestName : '';
  });

  const name = guestStatus === 'verified' ? guestName : manualName;

  const [attendance, setAttendance] = useState<AttendanceStatus>('hadir');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCheckingLive, setIsCheckingLive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccessFeedback, setIsSuccessFeedback] = useState<boolean>(false);

  const handleManualRefresh = async () => {
    setIsCheckingLive(true);
    setErrorMsg('');
    try {
      await refreshGuestList();
    } catch {
      setErrorMsg('Gagal memperbarui data dari Google Sheets. Silakan periksa koneksi internet Anda.');
    } finally {
      setIsCheckingLive(false);
    }
  };

  const handleGoToGeneral = () => {
    if (typeof window !== 'undefined') {
      // Buka domain utama tanpa query parameter
      window.location.href = window.location.pathname;
    }
  };

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
        guestCount: attendance === 'hadir' ? (guestQuota || 1) : 0,
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

  // KONDISI KHUSUS: Tautan dengan nama yang diedit dan TIDAK TERDAFTAR di Google Sheets
  if (!isRsvpAllowed) {
    return (
      <div className="relative p-6 sm:p-8 rounded-xs bg-surface border border-gorga/40 shadow-md text-left overflow-hidden">
        {/* Ornamen Sudut Gorga */}
        <CornerOrnament size={24} opacity={0.6} variant="gorga" />
        <GorgaWatermark variant="light" opacity={0.02} />

        <div className="relative z-10 flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-gorga/10 border border-gorga/30 flex items-center justify-center text-gorga mb-3">
            <ShieldAlert className="w-6 h-6 stroke-[1.75]" />
          </div>

          <h3 className="font-display text-lg sm:text-xl text-ink font-semibold mb-2">
            Tautan Undangan Tidak Terdaftar
          </h3>

          <p className="font-body text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mb-4 font-light">
            Nama pada tautan ini tidak tercantum di dalam buku tamu resmi kami. Demi menjaga ketertiban data dan kuota kehadiran, pengisian formulir konfirmasi RSVP dinonaktifkan untuk tautan ini.
          </p>

          <div className="p-3 mb-5 max-w-sm rounded-xs bg-surface-alt border border-gold/30 text-2xs text-ink/80 text-left space-y-1">
            <p className="font-semibold text-ink">Catatan:</p>
            <p>• Bagi tamu umum / keluarga, Anda dapat membuka <strong>undangan utama</strong> untuk dapat mengisi ucapan &amp; konfirmasi.</p>
            <p>• Jika nama Anda baru saja ditambahkan oleh pengantin, silakan klik tombol <em>Periksa Ulang</em> di bawah.</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-2.5 rounded-xs bg-red-100 border border-red-300 text-red-800 text-xs font-body w-full max-w-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleGoToGeneral}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-body font-semibold tracking-wider uppercase rounded-xs bg-gorga text-white hover:bg-gorga-bright transition-colors shadow-xs cursor-pointer active:scale-98"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Buka Undangan Umum</span>
            </button>

            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isCheckingLive}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-body font-medium tracking-wider uppercase rounded-xs border border-gold/60 bg-surface text-ink hover:border-gold-bright transition-colors shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 text-gold-dark ${isCheckingLive ? 'animate-spin' : ''}`} />
              <span>{isCheckingLive ? 'Memeriksa...' : 'Periksa Ulang'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <h3 className="font-display text-xl sm:text-2xl text-ink font-semibold tracking-wide">
            Konfirmasi Kehadiran
          </h3>
          {guestStatus === 'verified' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
              <Check className="w-3 h-3 stroke-[2.5]" />
              Tamu Terdaftar Resmi
            </span>
          )}
        </div>

        <p className="font-body text-xs sm:text-sm text-ink-muted mb-6 font-light">
          {guestStatus === 'verified'
            ? `Undangan berlaku untuk ${guestQuota} orang. Mohon konfirmasi kehadiran Anda demi kelancaran jamuan adat.`
            : 'Mohon mengisi formulir di bawah ini untuk membantu kami mempersiapkan jamuan pesta.'}
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
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-wider text-ink font-medium">
                Nama Lengkap <span className="text-gorga">*</span>
              </label>
              {guestStatus === 'verified' && (
                <span className="text-[10px] text-ink-muted italic">
                  (Terkunci sesuai daftar undangan)
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                readOnly={guestStatus === 'verified'}
                onChange={(e) => {
                  if (guestStatus !== 'verified') {
                    setManualName(e.target.value);
                  }
                }}
                placeholder={guestStatus === 'verified' ? guestName : 'Nama Lengkap Anda'}
                className={`w-full px-4 py-3 pl-10 text-sm rounded-xs border transition-colors ${
                  guestStatus === 'verified'
                    ? 'border-gold/60 bg-surface-alt/70 text-ink font-medium cursor-default focus:outline-none'
                    : 'border-gold/40 bg-surface text-ink placeholder:text-ink/40 focus:border-gorga focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gorga'
                }`}
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
                className={`flex flex-col items-center justify-center p-3 rounded-xs border text-xs font-semibold cursor-pointer transition-all select-none min-h-[46px] ${
                  attendance === 'hadir'
                    ? 'border-gorga bg-gorga text-white shadow-xs'
                    : 'border-gold/40 bg-surface-alt text-ink hover:border-gorga hover:text-gorga active:bg-surface-alt/70'
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
                <span className={attendance === 'hadir' ? 'text-white font-semibold' : 'text-ink'}>
                  Pasti Hadir
                </span>
              </label>

              {/* BERHALANGAN */}
              <label
                className={`flex flex-col items-center justify-center p-3 rounded-xs border text-xs font-semibold cursor-pointer transition-all select-none min-h-[46px] ${
                  attendance === 'berhalangan'
                    ? 'border-gorga bg-gorga text-white shadow-xs'
                    : 'border-gold/40 bg-surface-alt text-ink hover:border-gorga hover:text-gorga active:bg-surface-alt/70'
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
                <span className={attendance === 'berhalangan' ? 'text-white font-semibold' : 'text-ink'}>
                  Berhalangan
                </span>
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
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-gorga bg-gradient-to-r from-gorga via-gorga-bright to-gorga hover:bg-gorga-bright active:bg-gorga text-white border border-gold active:scale-98 transition-all duration-200 text-sm font-body font-semibold tracking-wider min-h-[46px] cursor-pointer shadow-[0_4px_16px_var(--shadow-btn)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
            >
              <Send className="w-4 h-4 stroke-[1.75] text-white shrink-0" />
              <span className="text-white font-semibold">
                {isSubmitting ? 'Mengirim Konfirmasi...' : 'Kirim Konfirmasi & Doa Restu'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
