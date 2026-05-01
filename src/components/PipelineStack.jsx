import React, { useEffect, useState } from 'react';
import '../pages/Testing2A.css';

/* ======================================================================
   PIPELINE STACK
   Embeddable version of the Testing2A pipeline-flow visualization.
   Drops into any page in place of the legacy IntelStack section.
   ====================================================================== */

const STAGES = [
  { id: 1, group: 'EYES',  name: 'CRISIS MAP',    caption: 'Geo-spatial incident detection.', shape: 'dots' },
  { id: 2, group: 'EYES',  name: 'NEWS HUB',      caption: 'Live OSINT ingestion stream.',    shape: 'feed' },
  { id: 3, group: 'BRAIN', name: 'DIGITAL TWIN',  caption: 'Adversary network graph.',        shape: 'graph' },
  { id: 4, group: 'BRAIN', name: 'BIAS CONTROL',  caption: 'Detection wheel calibration.',    shape: 'wheel' },
  { id: 5, group: 'VOICE', name: 'AI COUNCIL',    caption: 'Multi-persona LLM debate.',       shape: 'council' },
  { id: 6, group: 'VOICE', name: 'AGENTIC RISK MGMT',  caption: 'Risk management toolkit & decision matrix.',          shape: 'doc' },
];

const GROUP_COLOR = { EYES: '#7EE8FF', BRAIN: '#BCFF2F', VOICE: '#FFC857' };

const Glyph = ({ shape, color }) => {
  switch (shape) {
    case 'dots':
      return (
        <svg viewBox="0 0 80 80" className="t2a-glyph">
          <rect x="2" y="2" width="76" height="76" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
          <circle cx="22" cy="28" r="2" fill={color}><animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" repeatCount="indefinite" /></circle>
          <circle cx="58" cy="22" r="2.5" fill={color}><animate attributeName="opacity" values="1;0.3;1" dur="1.7s" repeatCount="indefinite" /></circle>
          <circle cx="40" cy="46" r="3" fill={color}><animate attributeName="opacity" values="0.5;1;0.5" dur="1.3s" repeatCount="indefinite" /></circle>
          <circle cx="60" cy="58" r="2" fill={color}><animate attributeName="opacity" values="0.3;1;0.3" dur="1.9s" repeatCount="indefinite" /></circle>
          <circle cx="24" cy="60" r="2" fill={color}><animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" /></circle>
          <path d="M 22 28 Q 40 38 40 46 M 58 22 Q 50 34 40 46 M 40 46 L 60 58 M 40 46 L 24 60" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4" />
        </svg>
      );
    case 'feed':
      return (
        <svg viewBox="0 0 80 80" className="t2a-glyph">
          <line x1="10" y1="22" x2="70" y2="22" stroke={color} strokeWidth="1" opacity="0.7" />
          <line x1="10" y1="32" x2="55" y2="32" stroke={color} strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="42" x2="65" y2="42" stroke={color} strokeWidth="1" opacity="0.7" />
          <line x1="10" y1="52" x2="48" y2="52" stroke={color} strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="62" x2="60" y2="62" stroke={color} strokeWidth="1" opacity="0.7" />
          <rect x="8" y="18" width="64" height="48" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
          <circle cx="74" cy="22" r="2" fill={color}><animate attributeName="cy" values="22;32;42;52;62;22" dur="3s" repeatCount="indefinite" /></circle>
        </svg>
      );
    case 'graph':
      return (
        <svg viewBox="0 0 80 80" className="t2a-glyph">
          <g>
            <line x1="40" y1="40" x2="20" y2="20" stroke={color} strokeWidth="0.6" opacity="0.6" />
            <line x1="40" y1="40" x2="60" y2="20" stroke={color} strokeWidth="0.6" opacity="0.6" />
            <line x1="40" y1="40" x2="22" y2="60" stroke={color} strokeWidth="0.6" opacity="0.6" />
            <line x1="40" y1="40" x2="60" y2="60" stroke={color} strokeWidth="0.6" opacity="0.6" />
            <line x1="20" y1="20" x2="60" y2="20" stroke={color} strokeWidth="0.4" opacity="0.3" />
            <line x1="22" y1="60" x2="60" y2="60" stroke={color} strokeWidth="0.4" opacity="0.3" />
            <circle cx="40" cy="40" r="4" fill={color} />
            <circle cx="20" cy="20" r="2.5" fill={color} opacity="0.8" />
            <circle cx="60" cy="20" r="2.5" fill={color} opacity="0.8" />
            <circle cx="22" cy="60" r="2.5" fill={color} opacity="0.8" />
            <circle cx="60" cy="60" r="2.5" fill={color} opacity="0.8" />
            <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="20s" repeatCount="indefinite" />
          </g>
        </svg>
      );
    case 'wheel':
      return (
        <svg viewBox="0 0 80 80" className="t2a-glyph">
          <circle cx="40" cy="40" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
          <circle cx="40" cy="40" r="20" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />
          <g>
            <line x1="40" y1="14" x2="40" y2="22" stroke={color} strokeWidth="1.2" />
            <line x1="40" y1="58" x2="40" y2="66" stroke={color} strokeWidth="1.2" />
            <line x1="14" y1="40" x2="22" y2="40" stroke={color} strokeWidth="1.2" />
            <line x1="58" y1="40" x2="66" y2="40" stroke={color} strokeWidth="1.2" />
            <line x1="22" y1="22" x2="27" y2="27" stroke={color} strokeWidth="0.8" opacity="0.6" />
            <line x1="58" y1="22" x2="53" y2="27" stroke={color} strokeWidth="0.8" opacity="0.6" />
            <line x1="22" y1="58" x2="27" y2="53" stroke={color} strokeWidth="0.8" opacity="0.6" />
            <line x1="58" y1="58" x2="53" y2="53" stroke={color} strokeWidth="0.8" opacity="0.6" />
          </g>
          <line x1="40" y1="40" x2="40" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="4s" repeatCount="indefinite" />
          </line>
          <circle cx="40" cy="40" r="3" fill={color} />
        </svg>
      );
    case 'council':
      return (
        <svg viewBox="0 0 80 80" className="t2a-glyph">
          <circle cx="40" cy="40" r="22" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
          <circle cx="40" cy="20" r="5" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="22" cy="48" r="5" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="58" cy="48" r="5" fill="none" stroke={color} strokeWidth="1" />
          <line x1="40" y1="25" x2="22" y2="43" stroke={color} strokeWidth="0.6" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="0;-8" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="40" y1="25" x2="58" y2="43" stroke={color} strokeWidth="0.6" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="0;-8" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="27" y1="48" x2="53" y2="48" stroke={color} strokeWidth="0.6" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="0;-8" dur="1.8s" repeatCount="indefinite" />
          </line>
          <text x="40" y="23" textAnchor="middle" fontSize="6" fill={color} fontFamily="monospace">A</text>
          <text x="22" y="51" textAnchor="middle" fontSize="6" fill={color} fontFamily="monospace">B</text>
          <text x="58" y="51" textAnchor="middle" fontSize="6" fill={color} fontFamily="monospace">C</text>
        </svg>
      );
    case 'doc':
      return (
        <svg viewBox="0 0 80 80" className="t2a-glyph">
          <rect x="20" y="14" width="40" height="52" fill="none" stroke={color} strokeWidth="1.2" />
          <rect x="20" y="14" width="40" height="52" fill={color} opacity="0.06" />
          <line x1="26" y1="24" x2="54" y2="24" stroke={color} strokeWidth="1" />
          <line x1="26" y1="32" x2="50" y2="32" stroke={color} strokeWidth="0.6" opacity="0.7" />
          <line x1="26" y1="38" x2="54" y2="38" stroke={color} strokeWidth="0.6" opacity="0.7" />
          <line x1="26" y1="44" x2="46" y2="44" stroke={color} strokeWidth="0.6" opacity="0.7" />
          <rect x="26" y="50" width="28" height="10" fill="none" stroke={color} strokeWidth="0.6" opacity="0.5" />
          <text x="40" y="58" textAnchor="middle" fontSize="5" fill={color} fontFamily="monospace" letterSpacing="1">PDF</text>
          <circle cx="60" cy="14" r="3" fill={color}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    default:
      return null;
  }
};

const Connector = ({ fromColor, toColor, index }) => (
  <svg viewBox="0 0 100 60" className="t2a-connector" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`pls-grad-${index}`} x1="0" x2="1">
        <stop offset="0%" stopColor={fromColor} />
        <stop offset="100%" stopColor={toColor} />
      </linearGradient>
    </defs>
    <line x1="0" y1="30" x2="100" y2="30" stroke={`url(#pls-grad-${index})`} strokeWidth="0.6" opacity="0.25" />
    <line x1="0" y1="30" x2="100" y2="30" stroke={`url(#pls-grad-${index})`} strokeWidth="1" strokeDasharray="3 5" opacity="0.9">
      <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.6s" repeatCount="indefinite" />
    </line>
    <circle r="2" fill={toColor}>
      <animateMotion dur="2.4s" repeatCount="indefinite" path="M 0 30 L 100 30" />
    </circle>
    <line x1="50" y1="26" x2="50" y2="34" stroke={fromColor} strokeWidth="0.6" opacity="0.5" />
  </svg>
);

export default function PipelineStack() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((s) => (s + 1) % STAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="t2a" id="intel-stack" style={{ position: 'relative' }}>
      <div className="t2a-grid" aria-hidden="true" />
      <div className="t2a-scanline" aria-hidden="true" />

      <main className="t2a-main t2a-main--embed">
        <section className="t2a-intro">
          <div className="t2a-eyebrow">
            <span className="t2a-eyebrow-bracket">[</span>
            <span className="t2a-eyebrow-text">// THE INTELLIGENCE STACK</span>
            <span className="t2a-eyebrow-dot" />
            <span className="t2a-eyebrow-meta">PIPELINE FLOW · SIGNAL TO BRIEF</span>
            <span className="t2a-eyebrow-bracket">]</span>
          </div>
          <h2 className="t2a-headline">From signal to decision.</h2>
          <p className="t2a-sub">
            A system built in the image of human intelligence: eyes that
            perceive, a brain that reasons, a voice that decides. In the
            ancient myths, Achilles saw the battlefield whole, every
            movement observed, every consequence mapped. Our project bears
            his name for that reason. From raw signal to finished brief,
            in minutes.
          </p>
        </section>

        <section className="t2a-pipeline" aria-label="Achilles pipeline flow">
          <div className="t2a-rail" aria-hidden="true">
            <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="t2a-rail-svg">
              <line x1="0" y1="10" x2="1000" y2="10" stroke="#BCFF2F" strokeWidth="0.6" opacity="0.18" />
              <line x1="0" y1="10" x2="1000" y2="10" stroke="#BCFF2F" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.7">
                <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.4s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>

          <div className="t2a-terminal t2a-terminal--in">
            <div className="t2a-terminal-label">INPUT</div>
            <div className="t2a-terminal-shape">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="2" y="2" width="36" height="36" fill="none" stroke="#BCFF2F" strokeWidth="1" opacity="0.5" />
                <circle cx="20" cy="20" r="2" fill="#BCFF2F">
                  <animate attributeName="r" values="2;5;2" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="20" cy="20" r="2" fill="#BCFF2F" />
              </svg>
            </div>
            <div className="t2a-terminal-caption">RAW.SIGNAL</div>
          </div>

          <div className="t2a-track">
            {STAGES.map((stage, i) => {
              const color = GROUP_COLOR[stage.group];
              const isActive = i === activeStage;
              return (
                <React.Fragment key={stage.id}>
                  <div
                    className={`t2a-stage t2a-stage--${stage.group.toLowerCase()} ${isActive ? 'is-active' : ''}`}
                    style={{ '--stage-color': color }}
                  >
                    <div className="t2a-stage-meta">
                      <span className="t2a-stage-num">0{stage.id}</span>
                      <span className="t2a-stage-group">{stage.group}</span>
                    </div>
                    <div className="t2a-stage-frame">
                      <span className="t2a-corner t2a-corner--tl" />
                      <span className="t2a-corner t2a-corner--tr" />
                      <span className="t2a-corner t2a-corner--bl" />
                      <span className="t2a-corner t2a-corner--br" />
                      <Glyph shape={stage.shape} color={color} />
                      <div className="t2a-stage-pulse" />
                    </div>
                    <div className="t2a-stage-name">{stage.name}</div>
                    <div className="t2a-stage-caption">{stage.caption}</div>
                    <div className="t2a-stage-tick" />
                  </div>

                  {i < STAGES.length - 1 && (
                    <div className="t2a-connector-wrap">
                      <Connector
                        fromColor={GROUP_COLOR[STAGES[i].group]}
                        toColor={GROUP_COLOR[STAGES[i + 1].group]}
                        index={i}
                      />
                      <span className="t2a-connector-label">
                        {STAGES[i].group !== STAGES[i + 1].group ? `→ ${STAGES[i + 1].group}` : '→'}
                      </span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="t2a-terminal t2a-terminal--out">
            <div className="t2a-terminal-label">OUTPUT</div>
            <div className="t2a-terminal-shape">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="2" y="2" width="36" height="36" fill="none" stroke="#BCFF2F" strokeWidth="1" />
                <rect x="2" y="2" width="36" height="36" fill="#BCFF2F" opacity="0.12" />
                <path d="M 12 20 L 18 26 L 28 14" stroke="#BCFF2F" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
            <div className="t2a-terminal-caption">DECISION.MATRIX</div>
          </div>
        </section>

        <section className="t2a-legend">
          <div className="t2a-legend-row">
            <span className="t2a-legend-swatch" style={{ background: GROUP_COLOR.EYES }} />
            <span className="t2a-legend-key">EYES</span>
            <span className="t2a-legend-val">PERCEPTION LAYER — what is happening, where.</span>
          </div>
          <div className="t2a-legend-row">
            <span className="t2a-legend-swatch" style={{ background: GROUP_COLOR.BRAIN }} />
            <span className="t2a-legend-key">BRAIN</span>
            <span className="t2a-legend-val">REASONING LAYER — model, map, calibrate.</span>
          </div>
          <div className="t2a-legend-row">
            <span className="t2a-legend-swatch" style={{ background: GROUP_COLOR.VOICE }} />
            <span className="t2a-legend-key">VOICE</span>
            <span className="t2a-legend-val">ARTICULATION LAYER — debate, decide, deliver.</span>
          </div>
        </section>
      </main>
    </div>
  );
}
