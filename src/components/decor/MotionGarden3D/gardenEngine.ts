import * as THREE from 'three';

export interface EngineController {
  destroy: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Engine Three.js untuk Efek Halus Debu Emas & Kelopak Melati Ivory.
 * Teroptimasi untuk efisiensi tinggi pada perangkat seluler:
 * - Menggunakan THREE.Points (1 draw call) untuk serbuk emas
 * - Menggunakan THREE.InstancedMesh (1 draw call) untuk kelopak melati
 * - Total draw calls: ≤ 2
 * - DPR dibatasi maksimal 1.75
 * - Menghentikan render loop saat tab tidak aktif (0% CPU/GPU)
 */
export function createGardenEngine(canvas: HTMLCanvasElement): EngineController {
  let isRunning = true;
  let animationFrameId: number | null = null;

  const isMobile = window.innerWidth < 768;
  const dustCount = isMobile ? 450 : 1000;
  const petalCount = isMobile ? 8 : 16;

  // 1. SCENE, CAMERA, RENDERER
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  // 2. PARTIKEL DEBU EMAS (THREE.Points)
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  const dustSpeeds = new Float32Array(dustCount * 3);

  for (let i = 0; i < dustCount; i++) {
    const i3 = i * 3;
    dustPositions[i3] = (Math.random() - 0.5) * 20; // x
    dustPositions[i3 + 1] = (Math.random() - 0.5) * 20; // y
    dustPositions[i3 + 2] = (Math.random() - 0.5) * 12; // z

    dustSpeeds[i3] = (Math.random() - 0.5) * 0.003; // vx
    dustSpeeds[i3 + 1] = 0.002 + Math.random() * 0.004; // vy (melayang lembut ke atas)
    dustSpeeds[i3 + 2] = (Math.random() - 0.5) * 0.002; // vz
  }

  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

  // Canvas tekstur titik partikel lembut bulat
  const pointCanvas = document.createElement('canvas');
  pointCanvas.width = 16;
  pointCanvas.height = 16;
  const ctx = pointCanvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(212, 175, 55, 1)'); // gold bright
    grad.addColorStop(0.5, 'rgba(197, 160, 89, 0.6)');
    grad.addColorStop(1, 'rgba(197, 160, 89, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();
  }
  const pointTexture = new THREE.CanvasTexture(pointCanvas);

  const dustMat = new THREE.PointsMaterial({
    size: 0.14,
    map: pointTexture,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const dustPoints = new THREE.Points(dustGeo, dustMat);
  scene.add(dustPoints);

  // 3. KELOPAK MELATI IVORY (THREE.InstancedMesh)
  // Geometri kelopak lonjong sederhana (low-poly)
  const petalGeo = new THREE.PlaneGeometry(0.35, 0.55, 1, 1);
  const petalMat = new THREE.MeshBasicMaterial({
    color: 0xfffdf9, // Ivory
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55,
  });

  const petalMesh = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
  scene.add(petalMesh);

  // Data per instance kelopak
  const petalData = Array.from({ length: petalCount }, () => ({
    x: (Math.random() - 0.5) * 16,
    y: (Math.random() - 0.5) * 16,
    z: (Math.random() - 0.5) * 8,
    rotX: Math.random() * Math.PI,
    rotY: Math.random() * Math.PI,
    rotZ: Math.random() * Math.PI,
    speedY: 0.004 + Math.random() * 0.006, // melayang turun perlahan
    speedRotX: (Math.random() - 0.5) * 0.01,
    speedRotY: (Math.random() - 0.5) * 0.01,
  }));

  const dummy = new THREE.Object3D();

  // 4. MOUSE/TOUCH INTERACTION HALUS
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  const onPointerMove = (e: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;
    targetMouseX = (clientX / window.innerWidth - 0.5) * 0.4;
    targetMouseY = (clientY / window.innerHeight - 0.5) * 0.4;
  };

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // 5. RESIZE LISTENER
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  };
  window.addEventListener('resize', onResize, { passive: true });

  // 6. ANIMATION LOOP
  const tick = () => {
    if (!isRunning) return;

    // Smooth camera inertia
    currentMouseX += (targetMouseX - currentMouseX) * 0.03;
    currentMouseY += (targetMouseY - currentMouseY) * 0.03;
    camera.position.x = currentMouseX;
    camera.position.y = -currentMouseY;

    // Animasi debu emas (Points)
    const pos = dustGeo.attributes.position as THREE.BufferAttribute;
    const posArray = pos.array as Float32Array;

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      posArray[i3] += dustSpeeds[i3] ?? 0;
      posArray[i3 + 1] += dustSpeeds[i3 + 1] ?? 0;
      posArray[i3 + 2] += dustSpeeds[i3 + 2] ?? 0;

      // Wrap-around batas ruang
      if (posArray[i3 + 1]! > 10) posArray[i3 + 1] = -10;
      if (posArray[i3]! > 10) posArray[i3] = -10;
      if (posArray[i3]! < -10) posArray[i3] = 10;
    }
    pos.needsUpdate = true;

    // Animasi kelopak melati (InstancedMesh)
    for (let i = 0; i < petalCount; i++) {
      const p = petalData[i];
      if (!p) continue;

      p.y -= p.speedY;
      p.rotX += p.speedRotX;
      p.rotY += p.speedRotY;

      // Wrap-around jika kelopak jatuh melewati batas bawah
      if (p.y < -9) {
        p.y = 9;
        p.x = (Math.random() - 0.5) * 16;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.updateMatrix();

      petalMesh.setMatrixAt(i, dummy.matrix);
    }
    petalMesh.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(tick);
  };

  // Start loop
  animationFrameId = requestAnimationFrame(tick);

  // 7. TAB VISIBILITY CHANGE (SUSPENSION)
  const onVisibilityChange = () => {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  // CONTROLLER INTERFACE
  return {
    destroy: () => {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      // Dispose Three.js objects
      dustGeo.dispose();
      dustMat.dispose();
      pointTexture.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      renderer.dispose();
    },
    pause: () => {
      isRunning = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    },
    resume: () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    },
  };
}
