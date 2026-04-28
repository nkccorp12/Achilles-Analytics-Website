import { useEffect, useRef, useState } from 'react';

/* ======================================================================
   SWEEPING RADAR BG — 3D parabolic node mesh that sweeps + waves under
   the cursor when hovering its container. Brand-tinted neon green.
   ====================================================================== */

const ACCENT_RGB = '188, 255, 47'; // #BCFF2F
const FOV = 700;
const Z_OFFSET = 1200;

// 3D math helpers (ported from reference)
const project3D = (x, y, z, w, h, fov, zOff, offsetX = 0) => {
  const scale = fov / (fov + z + zOff);
  return { x: x * scale + w / 2 + offsetX, y: y * scale + h / 2, scale };
};
const rotateX = (y, z, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { y: y * c - z * s, z: y * s + z * c };
};
const rotateY = (x, z, a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: x * c - z * s, z: x * s + z * c };
};

export default function NodeNetworkBg() {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;

    const resize = () => {
      const r = container.getBoundingClientRect();
      width = Math.max(1, r.width);
      height = Math.max(1, r.height);
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Build two overlapping mesh grids for the layered sweep look
    const buildGrid = (size, spacing, mult = 1) => {
      const out = [];
      for (let x = -size; x <= size; x++) {
        for (let z = -size; z <= size; z++) {
          if (Math.abs(x) % 2 === 0 || Math.abs(z) % 2 === 0) {
            out.push({ ox: x * spacing * mult, oz: z * spacing * mult });
          }
        }
      }
      return out;
    };
    const grid1 = buildGrid(15, 60, 1);
    const grid2 = buildGrid(15, 60, 1.5);

    let time = 0;
    let running = false;

    const processGrid = (grid, waveSpeed, waveHeight, alpha) => {
      const proj = new Array(grid.length);
      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];
        // parabolic valley + travelling waves
        let y = (p.ox * p.ox) / 300 + (p.oz * p.oz) / 300;
        y += Math.sin(p.ox / 200 + time * waveSpeed) * waveHeight;
        y += Math.cos(p.oz / 200 - time * waveSpeed) * waveHeight;
        y -= 200;

        // gentle Y rotation of the whole mesh
        const rY = rotateY(p.ox, p.oz, time * 0.2);
        // camera tilt
        const rX = rotateX(y, rY.z, 0.3);

        proj[i] = project3D(rY.x, rX.y, rX.z, width, height, FOV, Z_OFFSET, width * 0.32);
      }

      ctx.beginPath();
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        ctx.moveTo(a.x, a.y);
        ctx.arc(a.x, a.y, 1.5 * a.scale, 0, Math.PI * 2);
        for (let j = i + 1; j < proj.length; j++) {
          const b = proj[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const limit = 100 * a.scale;
          if (d2 < limit * limit) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${alpha})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 2})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.fill();
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.01;
      processGrid(grid1, 1, 80, 0.20);
      processGrid(grid2, -0.5, 120, 0.08);
      animRef.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      if (running) return;
      running = true;
      animRef.current = requestAnimationFrame(tick);
      setActive(true);
    };
    const onLeave = () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      // smooth fade by clearing after a brief delay; CSS handles opacity
      setTimeout(() => ctx.clearRect(0, 0, width, height), 600);
      setActive(false);
    };

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`np-nodebg${active ? ' is-active' : ''}`}
      aria-hidden="true"
    />
  );
}
