import React, { Suspense, lazy } from 'react';
import { useAppContext } from '../../../context/AppContext';

// Lazy loading untuk Three.js agar First Contentful Paint (FCP) halaman cover tetap di bawah 200ms
const MotionGarden3DContent = lazy(() => import('./MotionGarden3DContent'));

export const MotionGarden3D: React.FC = () => {
  const { config } = useAppContext();

  // Jika ambient3d dimatikan di wedding.config.ts, bundle Three.js tidak akan dimuat
  if (!config.flags.ambient3d.enabled) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <MotionGarden3DContent />
    </Suspense>
  );
};
