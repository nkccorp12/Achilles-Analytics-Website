import { useEffect, useRef } from 'react';
import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, SphereGeometry,
  Group, Vector3, MeshBasicMaterial, Mesh, AdditiveBlending,
  CanvasTexture, LinearFilter, SpriteMaterial, Sprite,
  BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Line,
} from 'three';

/* ─── Node Graph Data — Egypt closes Suez due to Gaza ─── */
const NODES = [
  // Central node — always visible
  { id: 'suez',     label: 'SUEZ CLOSURE',  pos: [0, 0, 0],          step: -1, parent: null,       tier: 0 },
  // Each step adds one node (synced with BIAS headlines)
  { id: 'gaza',     label: 'GAZA CONFLICT', pos: [-2.0, 1.2, 0.6],   step: 0,  parent: 'suez',     tier: 1 },
  { id: 'shipping', label: 'SHIPPING',      pos: [2.0, -0.4, -0.5],  step: 1,  parent: 'suez',     tier: 1 },
  { id: 'nato',     label: 'NATO RESPONSE', pos: [-3.2, 2.2, -0.4],  step: 2,  parent: 'gaza',     tier: 2 },
  { id: 'oil',      label: 'OIL PRICE',     pos: [3.2, 0.8, -1.0],   step: 3,  parent: 'shipping', tier: 2 },
  { id: 'supply',   label: 'EU SUPPLY',     pos: [1.4, -2.0, 0.8],   step: 4,  parent: 'shipping', tier: 2 },
  { id: 'food',     label: 'FOOD CRISIS',   pos: [0.2, -3.0, 1.4],   step: 5,  parent: 'supply',   tier: 3 },
];

const LINE_GROW_DUR  = 0.8;
const NODE_GROW_DUR  = 0.4;
const FADE_DUR       = 1.2;   // seconds for fade-out on reset
const FRAME_INTERVAL = 1000 / 30;

/* ─── Create a text sprite ─── */
function makeLabel(text, color) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontSize = 48;
  ctx.font = `600 ${fontSize}px "IBM Plex Mono", monospace`;
  const metrics = ctx.measureText(text);
  const w = Math.ceil(metrics.width) + 24;
  const h = fontSize + 24;
  canvas.width = w;
  canvas.height = h;
  ctx.font = `600 ${fontSize}px "IBM Plex Mono", monospace`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 12, h / 2);

  const tex = new CanvasTexture(canvas);
  tex.minFilter = LinearFilter;
  const mat = new SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new Sprite(mat);
  sprite.scale.set(w / 120, h / 120, 1);
  return sprite;
}

/* ─── Component ─── */
export default function DigitalTwinViz({ color = '#BCFF2F', step = 0 }) {
  const mountRef = useRef(null);
  const stepRef  = useRef(step);

  // Keep ref in sync with prop (read inside rAF loop)
  useEffect(() => { stepRef.current = step; }, [step]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Renderer ---
    const renderer = new WebGLRenderer({
      antialias: true, alpha: true, powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: '100%', height: '100%', display: 'block',
    });

    // --- Scene & Camera ---
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // --- Sizing ---
    const setSizeNow = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSizeNow();
    const ro = new ResizeObserver(setSizeNow);
    ro.observe(container);

    // --- Visibility ---
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    }, { threshold: 0.15 });
    io.observe(container);

    // --- Build graph objects ---
    const accentColor = new Color(color);
    const dimColor = new Color(color).multiplyScalar(0.4);
    const nodeMap = {};

    const sphereGeo = new SphereGeometry(0.12, 12, 12);
    const glowGeo = new SphereGeometry(0.28, 12, 12);

    const graphGroup = new Group();
    scene.add(graphGroup);

    NODES.forEach((n) => {
      const pos = new Vector3(...n.pos);

      const mat = new MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0 });
      const mesh = new Mesh(sphereGeo, mat);
      mesh.position.copy(pos);
      graphGroup.add(mesh);

      const glowMat = new MeshBasicMaterial({
        color: accentColor, transparent: true, opacity: 0,
        blending: AdditiveBlending, depthWrite: false,
      });
      const glow = new Mesh(glowGeo, glowMat);
      glow.position.copy(pos);
      graphGroup.add(glow);

      const label = makeLabel(n.label, n.tier === 0 ? '#ffffff' : color);
      label.position.copy(pos);
      label.position.y += 0.35;
      label.material.opacity = 0;
      graphGroup.add(label);

      let line = null;
      if (n.parent) {
        const lineGeo = new BufferGeometry();
        lineGeo.setAttribute('position', new Float32BufferAttribute([
          pos.x, pos.y, pos.z, pos.x, pos.y, pos.z,
        ], 3));
        const lineMat = new LineBasicMaterial({ color: dimColor, transparent: true, opacity: 0 });
        line = new Line(lineGeo, lineMat);
        graphGroup.add(line);
      }

      nodeMap[n.id] = { def: n, mesh, glow, label, line, pos, appearTime: null };
    });

    // --- Animation state ---
    let lastFrame = 0;
    let prevStep = -2;
    let fadeAlpha = 1;
    let fading = false;
    let fadeStart = 0;
    let animId;

    const hideNode = (obj) => {
      obj.mesh.material.opacity = 0;
      obj.glow.material.opacity = 0;
      obj.label.material.opacity = 0;
      obj.mesh.scale.setScalar(0);
      if (obj.line) obj.line.material.opacity = 0;
    };

    const resetAll = () => {
      NODES.forEach((n) => {
        const obj = nodeMap[n.id];
        obj.appearTime = null;
        hideNode(obj);
      });
      graphGroup.rotation.y = 0;
      fadeAlpha = 1;
      fading = false;
    };

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (!visible) return;
      if (now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;

      const currentStep = stepRef.current;

      // Detect reset (step went back to 0 from a higher value)
      if (currentStep < prevStep && !fading) {
        fading = true;
        fadeStart = now;
      }
      prevStep = currentStep;

      // Handle fade-out phase
      if (fading) {
        const fadeElapsed = (now - fadeStart) / 1000;
        fadeAlpha = Math.max(0, 1 - fadeElapsed / FADE_DUR);

        if (fadeAlpha <= 0) {
          resetAll();
          // Immediately start showing center node for new cycle
          prevStep = currentStep;
        }

        // Apply fade to all visible nodes (use base opacity * fade, not multiply)
        NODES.forEach((n) => {
          const obj = nodeMap[n.id];
          if (obj.appearTime !== null) {
            const age = (now - obj.appearTime) / 1000;
            const e = Math.min(age / NODE_GROW_DUR, 1);
            obj.mesh.material.opacity = e * fadeAlpha;
            obj.glow.material.opacity = e * 0.15 * fadeAlpha;
            obj.label.material.opacity = e * 0.85 * fadeAlpha;
            if (obj.line) {
              const lp = Math.min(age / LINE_GROW_DUR, 1);
              obj.line.material.opacity = lp * 0.5 * fadeAlpha;
            }
          }
        });

        graphGroup.rotation.y += 0.003;
        renderer.render(scene, camera);
        return;
      }

      // Update each node based on step
      NODES.forEach((n) => {
        const obj = nodeMap[n.id];
        const shouldShow = n.step <= currentStep;

        if (!shouldShow) {
          hideNode(obj);
          return;
        }

        // Mark appear time on first show
        if (obj.appearTime === null) {
          obj.appearTime = now;
        }

        const age = (now - obj.appearTime) / 1000;

        // Node scale-in
        const nodeProgress = Math.min(age / NODE_GROW_DUR, 1);
        const eased = 1 - Math.pow(1 - nodeProgress, 3);
        obj.mesh.scale.setScalar(eased);
        obj.glow.scale.setScalar(eased * 2.2);

        obj.mesh.material.opacity = eased;
        obj.glow.material.opacity = eased * 0.15;
        obj.label.material.opacity = eased * 0.85;

        // Line grow
        if (obj.line && n.parent) {
          const parentPos = nodeMap[n.parent].pos;
          const lineProgress = Math.min(age / LINE_GROW_DUR, 1);
          const lx = parentPos.x + (obj.pos.x - parentPos.x) * lineProgress;
          const ly = parentPos.y + (obj.pos.y - parentPos.y) * lineProgress;
          const lz = parentPos.z + (obj.pos.z - parentPos.z) * lineProgress;
          const posArr = obj.line.geometry.attributes.position.array;
          posArr[0] = parentPos.x; posArr[1] = parentPos.y; posArr[2] = parentPos.z;
          posArr[3] = lx; posArr[4] = ly; posArr[5] = lz;
          obj.line.geometry.attributes.position.needsUpdate = true;
          obj.line.material.opacity = lineProgress * 0.5;
        }
      });

      graphGroup.rotation.y += 0.003;
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      sphereGeo.dispose();
      glowGeo.dispose();
      Object.values(nodeMap).forEach(({ mesh, glow, label, line }) => {
        mesh.material.dispose();
        glow.material.dispose();
        label.material.map?.dispose();
        label.material.dispose();
        if (line) { line.geometry.dispose(); line.material.dispose(); }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
}
