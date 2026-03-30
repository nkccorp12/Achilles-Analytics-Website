import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo';
import { timer } from 'd3-timer';

const A = '188, 255, 47';
const R = '255, 60, 60';

let geoCache = null;
let dotsCache = null;

function edgeFade(px, py, cx, cy, r) {
  const dist = Math.hypot(px - cx, py - cy);
  return Math.max(0, Math.min(1, (1 - dist / r) / 0.6));
}

export default function RotatingEarth({ size = 600, alerts = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const r = size / 2.5;
    const cx = size / 2;
    const cy = size / 2;

    const proj = geoOrthographic().scale(r).translate([cx, cy]).clipAngle(90);
    const gen = geoPath().projection(proj).context(ctx);

    const dots = [];
    let land = null;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, size, size);

      // globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, proj.scale(), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${A}, 0.25)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (!land) return;

      // graticule
      ctx.beginPath();
      gen(geoGraticule()());
      ctx.strokeStyle = `rgba(${A}, 0.07)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // land outlines
      ctx.beginPath();
      land.features.forEach((f) => gen(f));
      ctx.strokeStyle = `rgba(${A}, 0.35)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // land dots
      for (const [lng, lat] of dots) {
        const p = proj([lng, lat]);
        if (p) {
          const fade = edgeFade(p[0], p[1], cx, cy, r);
          if (fade < 0.01) continue;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${A}, ${0.25 * fade})`;
          ctx.fill();
        }
      }

      // alarm points
      for (let i = 0; i < alerts.length; i++) {
        const a = alerts[i];
        const p = proj([a.lng, a.lat]);
        if (!p) continue;

        const fade = edgeFade(p[0], p[1], cx, cy, r);
        if (fade < 0.01) continue;

        const t1 = (frame + i * 25) * 0.07;
        const pulse = (Math.sin(t1) + 1) / 2; // 0→1

        // outer ripple ring 1
        const r1 = 4 + pulse * 12;
        ctx.beginPath();
        ctx.arc(p[0], p[1], r1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${R}, ${0.4 * (1 - pulse) * fade})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // outer ripple ring 2 (offset)
        const t2 = (frame + i * 25 + 45) * 0.07;
        const pulse2 = (Math.sin(t2) + 1) / 2;
        const r2 = 4 + pulse2 * 12;
        ctx.beginPath();
        ctx.arc(p[0], p[1], r2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${R}, ${0.25 * (1 - pulse2) * fade})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // glow
        ctx.save();
        ctx.shadowColor = `rgba(${R}, ${0.8 * fade})`;
        ctx.shadowBlur = 8 + pulse * 6;

        // inner solid dot
        const dotR = 2.5 + pulse * 1;
        ctx.beginPath();
        ctx.arc(p[0], p[1], dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R}, ${(0.7 + pulse * 0.3) * fade})`;
        ctx.fill();

        ctx.restore();
      }
    };

    // load pre-computed dots + geojson (module-level cache)
    const isMob = size < 400;
    const dotsFile = isMob ? '/land-dots-24.json' : '/land-dots-16.json';
    const applyData = (geoData, dotsData) => {
      land = geoData;
      dotsData.forEach(d => dots.push(d));
      render();
    };
    if (geoCache && dotsCache) {
      applyData(geoCache, dotsCache);
    } else {
      Promise.all([
        geoCache ? Promise.resolve(geoCache) : fetch('/land.json').then(r => r.json()),
        dotsCache ? Promise.resolve(dotsCache) : fetch(dotsFile).then(r => r.json()),
      ]).then(([geo, pts]) => {
        geoCache = geo;
        dotsCache = pts;
        applyData(geo, pts);
      }).catch(() => {});
    }

    // auto-rotate
    const rot = [0, -20];
    let t = timer(() => {
      rot[0] += 0.25;
      proj.rotate(rot);
      render();
    });

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!t) t = timer(() => { rot[0] += 0.25; proj.rotate(rot); render(); });
      } else {
        if (t) { t.stop(); t = null; }
      }
    }, { threshold: 0.05 });
    io.observe(canvas);

    return () => { if (t) t.stop(); io.disconnect(); };
  }, [size]);

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
