import React, { useState, useRef } from 'react';
import { X, Camera, ImagePlus, Loader2, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { guestMomentsStorage, type GuestMoment } from '../../lib/guestMomentsAdapter';
import { CornerOrnament } from '../../components/decor/CornerOrnament';
import { GorgaWatermark } from '../../components/decor/GorgaWatermark';

interface UploadMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (moment: GuestMoment) => void;
  isUnlocked?: boolean;
}

export const UploadMomentModal: React.FC<UploadMomentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isUnlocked = true,
}) => {
  const { guestName } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(
    guestName !== 'Tamu Undangan' ? guestName : '',
  );
  const [caption, setCaption] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Mohon pilih file gambar (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran foto maksimal 5 MB.');
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setCaption('');
    setErrorMessage('');
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isUnlocked) {
      setErrorMessage('Fitur unggah foto terkunci sampai Hari-H dan jam acara dimulai.');
      return;
    }

    if (!name.trim()) {
      setErrorMessage('Mohon isi nama Anda.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('Mohon pilih atau ambil foto terlebih dahulu.');
      return;
    }

    setIsUploading(true);

    try {
      const moment = await guestMomentsStorage.upload(
        selectedFile,
        name.trim(),
        caption.trim(),
      );

      setIsSuccess(true);
      onSuccess(moment);

      setTimeout(() => {
        handleReset();
        onClose();
      }, 1500);
    } catch {
      setErrorMessage('Gagal mengunggah foto. Silakan periksa koneksi dan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-md bg-surface rounded-xs border border-gold/60 shadow-2xl overflow-hidden text-left my-auto p-6 sm:p-7">
        {/* Ornamen Sudut Gorga */}
        <CornerOrnament size={24} opacity={0.7} variant="gorga" />

        {/* Watermark Halus */}
        <GorgaWatermark variant="light" opacity={0.02} />

        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={() => {
            handleReset();
            onClose();
          }}
          disabled={isUploading}
          aria-label="Tutup form upload"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface-alt text-ink hover:text-gorga hover:bg-surface-alt/70 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-full bg-surface-alt text-gorga border border-gold/30">
              <Camera className="w-4 h-4 stroke-[1.75]" />
            </span>
            <h3 id="upload-modal-title" className="font-display text-xl text-ink font-semibold tracking-wide">
              Bagikan Foto Hari-H
            </h3>
          </div>
          <p className="font-body text-xs text-ink-muted mb-4 font-light leading-relaxed">
            Abadikan senyum dan keseruan Anda di Hari-H pernikahan Jos &amp; Zeni untuk dibagikan ke galeri live.
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xs bg-red-100 border border-red-300 text-red-800 text-xs font-body">
              {errorMessage}
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 rounded-xs bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-body flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 stroke-[2]" />
              <span>Foto berhasil diunggah! Terima kasih telah berbagi momen.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-body">
            {/* Input Nama Tamu */}
            <div>
              <label htmlFor="moment-guest-name" className="block text-xs uppercase tracking-wider text-ink font-medium mb-1.5">
                Nama Anda <span className="text-gorga">*</span>
              </label>
              <input
                id="moment-guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda atau Keluarga"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xs border border-gold/40 bg-surface text-ink placeholder:text-ink/40 focus:border-gorga focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gorga transition-colors"
              />
            </div>

            {/* Input Foto (Preview / Drag Area) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-ink font-medium mb-1.5">
                Pilih Foto <span className="text-gorga">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="moment-file-input"
              />

              {previewUrl ? (
                <div className="relative aspect-4/3 w-full rounded-xs overflow-hidden border border-gold/60 bg-surface-alt group">
                  <img
                    src={previewUrl}
                    alt="Pratinjau foto momen"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-night/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xs bg-surface text-ink text-xs font-medium border border-gold hover:bg-gold hover:text-white transition-colors cursor-pointer"
                    >
                      Ganti Foto
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="px-3 py-1.5 rounded-xs bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-4/3 rounded-xs border-2 border-dashed border-gold/50 bg-bg hover:bg-surface-alt hover:border-gorga transition-colors flex flex-col items-center justify-center p-4 text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-alt text-gorga border border-gold/40 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-xs">
                    <ImagePlus className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-xs font-semibold text-ink group-hover:text-gorga transition-colors">
                    Klik untuk Ambil / Pilih Foto
                  </span>
                  <span className="text-[10px] text-ink-muted/80 mt-1">
                    Mendukung JPG, PNG, WEBP (Maksimal 5 MB)
                  </span>
                </button>
              )}
            </div>

            {/* Input Keterangan / Caption */}
            <div>
              <label htmlFor="moment-caption" className="block text-xs uppercase tracking-wider text-ink font-medium mb-1.5">
                Keterangan / Ucapan Singkat <span className="text-ink-muted font-normal text-[10px]">(Opsional)</span>
              </label>
              <textarea
                id="moment-caption"
                rows={2}
                maxLength={120}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tuliskan cerita singkat atau salam di hari bahagia ini..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xs border border-gold/40 bg-surface text-ink placeholder:text-ink/40 focus:border-gorga focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gorga transition-colors resize-none"
              />
              <span className="block text-right text-[10px] text-ink-muted/60 mt-0.5">
                {caption.length}/120 karakter
              </span>
            </div>

              {/* Tombol Aksi */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                disabled={isUploading}
                className="flex-1 py-2.5 px-4 rounded-xs border border-gold/40 text-ink bg-surface-alt hover:bg-surface-alt/80 hover:text-gorga active:bg-surface-alt/60 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isUploading || isSuccess}
                className="flex-1 py-2.5 px-4 rounded-xs bg-gorga bg-gradient-to-r from-gorga via-gorga-bright to-gorga hover:bg-gorga-bright active:bg-gorga text-white border border-gold text-xs font-semibold tracking-wider transition-all shadow-[0_4px_16px_var(--shadow-btn)] hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span className="text-white">Mengunggah...</span>
                  </>
                ) : (
                  <span className="text-white font-semibold">Bagikan Foto</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
