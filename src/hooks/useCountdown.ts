import { useState, useEffect } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Hook untuk menghitung hitung mundur (countdown) secara real-time.
 * Menghindari layout shift dengan angka terstandar dan status isExpired.
 */
export function useCountdown(targetIsoDate: string): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const target = new Date(targetIsoDate).getTime();
    const now = Date.now();
    const diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  });

  useEffect(() => {
    const target = new Date(targetIsoDate).getTime();
    if (isNaN(target)) return;

    const calculate = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return false;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: false,
      });
      return true;
    };

    // Jalankan kalkulasi awal
    const isOngoing = calculate();
    if (!isOngoing) return;

    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetIsoDate]);

  return countdown;
}
