import { useGuestValidation } from './useGuestValidation';

/**
 * Hook retro-kompatibel untuk mengambil nama tamu yang sudah tervalidasi.
 * Mengembalikan 'Tamu Undangan' jika general atau unregistered (nama palsu ditolak).
 */
export function useGuestName(): string {
  const { name } = useGuestValidation();
  return name;
}
