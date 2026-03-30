import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import './CoreEngine.css';

/* =========================================================================
   CORE ENGINE — Narrative Network Pipeline
   Signal → Narrative → Influence → Risk
   ========================================================================= */

const COLORS = [
  { r: 188, g: 255, b: 47 },  // signals
  { r: 47, g: 200, b: 255 },  // narratives
  { r: 255, g: 107, b: 47 },  // influence
  { r: 255, g: 47, b: 90 },   // risk
];
const STAGE_COUNTS = [22, 14, 9, 5];
const STAGE_SIZES = [[1.5, 3.5], [2, 4.5], [3, 5.5], [4, 7]];
const STAGE_LABELS = ['SIGNALS', 'NARRATIVES', 'INFLUENCE', 'RISK'];
const MAX_DIST = 140;

function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a})`; }
function lerpC(a, b, t) { return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t }; }
function rand(a, b) { return a + Math.random() * (b - a); }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function bezierPt(ax, ay, cx, cy, bx, by, t) {
  const u = 1 - t;
  return { x: u * u * ax + 2 * u * t * cx + t * t * bx, y: u * u * ay + 2 * u * t * cy + t * t * by };
}

const BOXES = [
  { stage: 0, color: '#BCFF2F', borderColor: 'rgba(188,255,47,0.2)', tag: 'Signal', title: 'Hormuz closure rhetoric spikes', body: 'IRGC channels + 3 state outlets in 4h', left: '4%', top: '28%' },
  { stage: 1, color: '#2FC8FF', borderColor: 'rgba(47,200,255,0.2)', tag: 'Narrative', title: 'Coordinated blockade narrative', body: 'Semantic cluster: 89% confidence', left: '27%', top: '34%' },
  { stage: 2, color: '#FF6B2F', borderColor: 'rgba(255,107,47,0.2)', tag: 'Influence', title: 'IRGC + 8 proxies amplifying', body: 'Coordination: 3.1\u03C3', left: '52%', top: '26%' },
  { stage: 3, color: '#FF2F5A', borderColor: 'rgba(255,47,90,0.2)', tag: 'Risk', title: 'Closure: 68% / 14 days', body: 'Oil +12%, reroute likely', left: '76%', top: '30%', action: true },
];

/* ── Mobile GSAP Nodes ── */
const MOBILE_NODE_COUNT = 14;
function generateMobileNodes() {
  const nodes = [];
  for (let i = 0; i < MOBILE_NODE_COUNT; i++) {
    nodes.push({
      x: rand(8, 92),   // % position
      y: rand(8, 92),
      size: rand(6, 14),
      delay: rand(0, 1),
      duration: rand(4, 8),
      driftX: rand(-15, 15),
      driftY: rand(-10, 10),
      opacity: rand(0.5, 0.9),
    });
  }
  return nodes;
}

/* ── Typewriter text component ── */
const NARR_STRONG = 'Achilles detected coordinated Hormuz closure rhetoric across IRGC channels and state media.';
const NARR_DIM = ' Within minutes, it clustered the noise into a single narrative, mapped the actors driving it, and projected a 68% closure probability within 14 days — before the first headline was published. Act with confidence.';

function Typewriter({ trigger }) {
  const [displayed, setDisplayed] = useState('');
  const fullText = NARR_STRONG + NARR_DIM;
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let idx = 0;
    const speed = 8;
    let lastTime = 0;
    function type(t) {
      if (t - lastTime >= speed) {
        idx++;
        setDisplayed(fullText.slice(0, idx));
        lastTime = t;
      }
      if (idx < fullText.length) rafRef.current = requestAnimationFrame(type);
    }
    rafRef.current = requestAnimationFrame(type);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, fullText]);

  const strongLen = NARR_STRONG.length;
  const strongPart = displayed.slice(0, strongLen);
  const dimPart = displayed.slice(strongLen);

  return (
    <p className="ce-type">
      <strong className="ce-type__strong">{strongPart}</strong>
      <span className="ce-type__dim">{dimPart}</span>
      {displayed.length < fullText.length && <span className="ce-type__cursor">█</span>}
    </p>
  );
}

export default function CoreEngine() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mobileNodesRef = useRef(null);
  const stateRef = useRef({ nodes: [], crossEdges: [], pulseDots: [], revealStart: -1 });
  const [mobileNodes] = useState(() => generateMobileNodes());
  const [cmdTrigger, setCmdTrigger] = useState(false);

  const initNodes = useCallback((cw, ch) => {
    const state = stateRef.current;
    state.nodes = [];
    state.crossEdges = [];
    state.pulseDots = [];
    const isMobile = cw < 640;
    const stageXs = isMobile
      ? [cw * 0.5]
      : [cw * 0.12, cw * 0.37, cw * 0.62, cw * 0.87];
    state.stageXs = stageXs;
    state.isMobile = isMobile;
    if (isMobile) return; // Mobile uses GSAP divs, not canvas nodes
    const colorsToUse = COLORS;
    const countsToUse = STAGE_COUNTS;
    const sizesToUse = STAGE_SIZES;
    colorsToUse.forEach((col, ci) => {
      const cx = stageXs[ci], count = countsToUse[ci];
      const [sMin, sMax] = sizesToUse[ci];
      const spreadX = cw * 0.09;
      const spreadY = ch * 0.28;
      for (let i = 0; i < count; i++) {
        const ox = cx + rand(-spreadX, spreadX);
        const oy = ch * 0.5 + rand(-spreadY, spreadY);
        state.nodes.push({ x: ox, y: oy, ox, oy, size: rand(sMin, sMax), cluster: ci, phase: rand(0, Math.PI * 2), breathSpeed: rand(0.001, 0.003), wanderR: rand(4, 14), wanderSpeed: rand(0.0003, 0.0009) });
      }
    });
    for (let i = 0; i < state.nodes.length; i++) {
      for (let j = i + 1; j < state.nodes.length; j++) {
        const a = state.nodes[i], b = state.nodes[j];
        if (Math.abs(a.cluster - b.cluster) === 1 && dist(a, b) < MAX_DIST * 1.3)
          state.crossEdges.push({ i, j, fromCluster: Math.min(a.cluster, b.cluster) });
      }
    }
    state.crossEdges.forEach(e => {
      for (let k = 0; k < 1 + Math.floor(rand(0, 2)); k++)
        state.pulseDots.push({ edge: state.crossEdges.indexOf(e), progress: rand(0, 1), speed: rand(0.0003, 0.0007) });
    });
  }, []);

  /* ── GSAP mobile node animations ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 640;
    if (!isMobile || !mobileNodesRef.current) return;

    const nodes = mobileNodesRef.current.querySelectorAll('.ce-mnode');
    const gsapCtx = gsap.context(() => {
      nodes.forEach((node, i) => {
        const n = mobileNodes[i];
        gsap.to(node, {
          scale: rand(1.1, 1.4),
          opacity: n.opacity,
          duration: rand(2, 4),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: n.delay * 0.3,
        });
        gsap.to(node, {
          x: n.driftX,
          y: n.driftY,
          duration: n.duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: n.delay * 0.15,
        });
      });
    }, mobileNodesRef.current);

    return () => gsapCtx.revert();
  }, [mobileNodes]);

  /* ── Desktop canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ct = canvas.getContext('2d');
    let cw, ch, connectorPts = [], animId, isMobile = false;
    const state = stateRef.current;

    function resize() {
      const r = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      cw = rect.width; ch = rect.height;
      isMobile = cw < 640;
      if (isMobile) { canvas.width = 0; canvas.height = 0; return; }
      canvas.width = cw * r; canvas.height = ch * r;
      ct.setTransform(r, 0, 0, r, 0, 0);
      initNodes(cw, ch);
      updateConnectors();
    }

    function updateConnectors() {
      connectorPts = [];
      const pr = container.getBoundingClientRect();
      container.querySelectorAll('.ce-sbox').forEach(box => {
        const r = box.getBoundingClientRect();
        connectorPts.push({ x: r.left - pr.left + r.width * 0.5, y: r.top - pr.top + r.height * 0.5, stage: +box.dataset.stage });
      });
    }

    function sOp(ci, t) {
      if (state.revealStart < 0) return 0;
      return clamp((t - state.revealStart - ci * 400) / 600, 0, 1);
    }

    function tick(t) {
      if (isMobile) { animId = requestAnimationFrame(tick); return; }
      const stageXs = state.stageXs || [cw * 0.12, cw * 0.37, cw * 0.62, cw * 0.87];
      ct.clearRect(0, 0, cw, ch);
      state.nodes.forEach(n => {
        n.x = n.ox + Math.sin(t * n.wanderSpeed + n.phase) * n.wanderR;
        n.y = n.oy + Math.cos(t * n.wanderSpeed * 0.8 + n.phase) * n.wanderR * 0.7;
      });

      // Within-cluster edges
      for (let i = 0; i < state.nodes.length; i++) for (let j = i + 1; j < state.nodes.length; j++) {
        const a = state.nodes[i], b = state.nodes[j];
        if (a.cluster !== b.cluster) continue;
        const d = dist(a, b); if (d >= MAX_DIST) continue;
        const op = sOp(a.cluster, t); if (op <= 0) continue;
        ct.beginPath(); ct.moveTo(a.x, a.y);
        ct.quadraticCurveTo((a.x + b.x) * 0.5 + Math.sin(t * 0.0008 + i * 0.07) * 5, (a.y + b.y) * 0.5 + Math.cos(t * 0.0008 + j * 0.07) * 5, b.x, b.y);
        ct.strokeStyle = rgba(COLORS[a.cluster], Math.min((1 - d / MAX_DIST) * 0.12 * op, 0.2));
        ct.lineWidth = 0.6; ct.stroke();
      }

      // Cross-stage edges
      state.crossEdges.forEach((e, ei) => {
        const a = state.nodes[e.i], b = state.nodes[e.j];
        const left = a.cluster < b.cluster ? a : b, right = a.cluster < b.cluster ? b : a;
        const edgeOp = Math.min(sOp(left.cluster, t), sOp(right.cluster, t));
        if (edgeOp <= 0) { e._op = 0; return; }
        const c = lerpC(COLORS[left.cluster], COLORS[right.cluster], 0.5);
        const mx = (left.x + right.x) * 0.5 + Math.sin(t * 0.0006 + ei * 0.2) * 8;
        const my = (left.y + right.y) * 0.5 + Math.cos(t * 0.0006 + ei * 0.3) * 8;
        ct.beginPath(); ct.moveTo(left.x, left.y); ct.quadraticCurveTo(mx, my, right.x, right.y);
        ct.strokeStyle = rgba(c, Math.min(0.05 * edgeOp, 0.18)); ct.lineWidth = 0.5; ct.stroke();
        e._lx = left.x; e._ly = left.y; e._mx = mx; e._my = my; e._rx = right.x; e._ry = right.y; e._c = c; e._op = edgeOp;
      });

      // Pulse dots (desktop only)
      state.pulseDots.forEach(pd => {
        pd.progress += pd.speed; if (pd.progress > 1) pd.progress -= 1;
        const e = state.crossEdges[pd.edge];
        if (!e || e._op <= 0 || e._lx == null) return;
        const pt = bezierPt(e._lx, e._ly, e._mx, e._my, e._rx, e._ry, pd.progress);
        if (!isFinite(pt.x) || !isFinite(pt.y)) return;
        const pCol = lerpC(COLORS[e.fromCluster], COLORS[e.fromCluster + 1], pd.progress);
        ct.beginPath(); ct.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
        const pg = ct.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 8);
        pg.addColorStop(0, rgba(pCol, 0.2 * e._op)); pg.addColorStop(1, rgba(pCol, 0)); ct.fillStyle = pg; ct.fill();
        ct.beginPath(); ct.arc(pt.x, pt.y, 2, 0, Math.PI * 2); ct.fillStyle = rgba(pCol, 0.7 * e._op); ct.fill();
      });

      // Connector lines between boxes
      for (let ci = 0; ci < connectorPts.length - 1; ci++) {
        const a = connectorPts[ci], b = connectorPts[ci + 1];
        const op = Math.min(sOp(a.stage, t), sOp(b.stage, t));
        if (op <= 0) continue;
        const c = lerpC(COLORS[a.stage], COLORS[b.stage], 0.5);
        const mx = (a.x + b.x) * 0.5, my = (a.y + b.y) * 0.5 + 40;
        ct.beginPath(); ct.moveTo(a.x, a.y); ct.quadraticCurveTo(mx, my, b.x, b.y);
        ct.strokeStyle = rgba(c, 0.25 * op); ct.lineWidth = 2; ct.setLineDash([5, 5]); ct.stroke(); ct.setLineDash([]);
        ct.beginPath(); ct.moveTo(a.x, a.y); ct.quadraticCurveTo(mx, my, b.x, b.y);
        ct.strokeStyle = rgba(c, 0.06 * op); ct.lineWidth = 8; ct.stroke();
        const prog = (t * 0.0004 + ci * 0.3) % 1;
        const pt = bezierPt(a.x, a.y, mx, my, b.x, b.y, prog);
        if (isFinite(pt.x) && isFinite(pt.y)) {
          ct.beginPath(); ct.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
          const dg = ct.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 14);
          dg.addColorStop(0, rgba(c, 0.35 * op)); dg.addColorStop(1, rgba(c, 0)); ct.fillStyle = dg; ct.fill();
          ct.beginPath(); ct.arc(pt.x, pt.y, 3, 0, Math.PI * 2); ct.fillStyle = rgba(c, 0.8 * op); ct.fill();
        }
      }

      // Lines from boxes to graph nodes
      connectorPts.forEach(cp => {
        const op = sOp(cp.stage, t); if (op <= 0) return;
        const c = COLORS[cp.stage]; let count = 0;
        state.nodes.forEach(n => {
          if (n.cluster !== cp.stage || count >= 6) return;
          const d = dist(cp, n);
          if (d < 250) {
            ct.beginPath(); ct.moveTo(cp.x, cp.y); ct.lineTo(n.x, n.y);
            ct.strokeStyle = rgba(c, 0.12 * op * (1 - d / 250)); ct.lineWidth = 0.8; ct.stroke();
            count++;
          }
        });
      });

      // Nodes (dimmed)
      const dim = 0.65;
      state.nodes.forEach(n => {
        const op = sOp(n.cluster, t); if (op <= 0) return;
        const c = COLORS[n.cluster], breath = 1 + Math.sin(t * n.breathSpeed + n.phase) * 0.25, s = n.size * breath;
        ct.beginPath(); ct.arc(n.x, n.y, s * 4, 0, Math.PI * 2);
        const g2 = ct.createRadialGradient(n.x, n.y, 0, n.x, n.y, s * 4);
        g2.addColorStop(0, rgba(c, 0.04 * op * dim)); g2.addColorStop(1, rgba(c, 0)); ct.fillStyle = g2; ct.fill();
        ct.beginPath(); ct.arc(n.x, n.y, s * 2, 0, Math.PI * 2);
        const g = ct.createRadialGradient(n.x, n.y, 0, n.x, n.y, s * 2);
        g.addColorStop(0, rgba(c, 0.1 * op * dim)); g.addColorStop(1, rgba(c, 0)); ct.fillStyle = g; ct.fill();
        ct.beginPath(); ct.arc(n.x, n.y, s, 0, Math.PI * 2); ct.fillStyle = rgba(c, 0.4 * op * dim); ct.fill();
      });

      // Labels
      ct.font = '500 9px "IBM Plex Mono",monospace'; ct.textAlign = 'center';
      STAGE_LABELS.forEach((lbl, ci) => {
        const op = sOp(ci, t); if (op <= 0) return;
        ct.fillStyle = rgba(COLORS[ci], 0.15 * op);
        ct.fillText(lbl, stageXs[ci], ch * 0.08);
      });
      ct.textAlign = 'start';

      animId = requestAnimationFrame(tick);
    }

    // Intersection observer for reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && state.revealStart < 0) {
          state.revealStart = performance.now();
          const boxes = container.querySelectorAll('.ce-sbox');
          const isMob = cw < 640;
          // Reveal boxes with stagger (mobile waits for viewport)
          boxes.forEach(box => {
            const stage = +box.dataset.stage;
            setTimeout(() => box.classList.add('ce-sbox--visible'), isMob ? 650 + stage * 1040 : 800 + stage * 600);
          });
          // Mobile: after cards visible, collapse top 3 → only Risk remains
          const collapseDelay = 650 + 3 * 1040 + 1560;
          if (isMob) {
            setTimeout(() => {
              boxes.forEach(box => {
                const stage = +box.dataset.stage;
                if (stage < 3) box.classList.add('ce-sbox--collapsed');
              });
              // Lime glow on Act button + hero emphasis on Risk card
              setTimeout(() => {
                boxes.forEach(box => {
                  if (+box.dataset.stage === 3) {
                    box.classList.add('ce-sbox--hero');
                    const actBtn = box.querySelector('.ce-sbox__action');
                    if (actBtn) actBtn.classList.add('ce-sbox__action--glow');
                  }
                });
                // Trigger header + typewriter after glow pulse settles
                setTimeout(() => {
                  const hdr = container.querySelector('.ce-header');
                  if (hdr) hdr.classList.add('ce-header--visible');
                  setCmdTrigger(true);
                }, 2000);
              }, 600);
            }, collapseDelay);
          }
          // Desktop: reveal narration normally
          if (!isMob) {
            const narr = container.querySelector('.ce-narr');
            if (narr) setTimeout(() => narr.classList.add('ce-narr--visible'), 1200);
          }
        }
      });
    }, { threshold: 0.1 });
    obs.observe(container);

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      obs.disconnect();
    };
  }, [initNodes]);

  return (
    <section className="ce-section" ref={containerRef}>
      <canvas ref={canvasRef} className="ce-canvas" />

      {/* Mobile: GSAP-animated div nodes */}
      <div className="ce-mnodes" ref={mobileNodesRef}>
        {mobileNodes.map((n, i) => (
          <div
            key={i}
            className="ce-mnode"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: n.size,
              height: n.size,
              opacity: 1,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="ce-header">
        <div className="ce-tag">// CORE ENGINE</div>
        <h2 className="ce-headline">See the <em>unseen.</em> Act with confidence.</h2>
      </div>

      {/* Stage boxes */}
      {BOXES.map((b) => (
        <div key={b.stage} className="ce-sbox" data-stage={b.stage} style={{ left: b.left, top: b.top, borderColor: b.borderColor }}>
          <div className="ce-sbox__tag" style={{ color: b.color }}>
            <span className="ce-sbox__dot" style={{ background: b.color }} />
            {b.tag}
          </div>
          <div className="ce-sbox__title">{b.title}</div>
          <div className="ce-sbox__body">{b.body}</div>
          {b.action && (
            <span className="ce-sbox__action" style={{ color: '#FF2F5A', borderColor: '#FF2F5A' }}>
              Act &rarr;
            </span>
          )}
        </div>
      ))}

      {/* Desktop narration */}
      <div className="ce-narr">
        <p className="ce-narr__text">
          <strong>Achilles detected coordinated Hormuz closure rhetoric across IRGC channels and state media.</strong>
          {' '}
          <span className="ce-narr__dim">
            Within minutes, it clustered the noise into a single narrative, mapped the actors driving it, and projected a 68% closure probability within 14 days — before the first headline was published. Act with confidence.
          </span>
        </p>
      </div>

      {/* Mobile: typewriter narration */}
      <div className="ce-type-wrap">
        <Typewriter trigger={cmdTrigger} />
      </div>
    </section>
  );
}
