import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { createGardenEngine } from './gardenEngine';

export const MotionGarden3DContent: React.FC = () => {
  const { isOpened } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Aksesibilitas: Cek prefers-reduced-motion
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    if (!canvasRef.current) return;

    const engine = createGardenEngine(canvasRef.current);

    return () => {
      engine.destroy();
    };
  }, []);

  // Jika reduced motion aktif, jangan render canvas sama sekali
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 w-full h-full pointer-events-none select-none transition-opacity duration-700 ${
        !isOpened ? 'z-55 opacity-80' : 'z-10 opacity-70'
      }`}
    />
  );
};

export default MotionGarden3DContent;
