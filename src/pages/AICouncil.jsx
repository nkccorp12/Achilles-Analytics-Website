import { useRef } from 'react';
import { Grok, Anthropic, Gemini } from '@lobehub/icons';
import './AICouncil.css';

const ICON_GREEN = '#BCFF2F';

/* ==========================================================================
   AI COUNCIL — Style 5 "Isometric Data Viz"
   Ported from prototypes/style5-isometric.html
   ========================================================================== */

function AICouncil() {
  const trackRef = useRef(null);
  const rafRef = useRef(0);

  const onTrackMove = (e) => {
    if (e.pointerType === 'touch') return;
    if (rafRef.current) return;
    const cx = e.clientX, cy = e.clientY, el = trackRef.current;
    if (!el) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const r = el.getBoundingClientRect();
      const x = cx - r.left;
      const y = cy - r.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--mxn', String(((x / r.width) * 2 - 1).toFixed(3)));
      el.style.setProperty('--myn', String(((y / r.height) * 2 - 1).toFixed(3)));
      el.classList.add('is-tracking');
    });
  };

  const onTrackLeave = () => {
    const el = trackRef.current;
    if (!el) return;
    el.classList.remove('is-tracking');
    el.style.setProperty('--mxn', '0');
    el.style.setProperty('--myn', '0');
    el.style.setProperty('--mx', '-9999px');
    el.style.setProperty('--my', '-9999px');
  };

  return (
    <section className="council" id="ai-council">
      {/* Grid background */}
      <div className="council__grid-bg" />

      {/* Header + Counters */}
      <div className="council__header reveal d1">
        <div className="council__header-left">
          <div className="council__tag">
            <span className="council__tag-dot" />
            AI Council
          </div>
          <h1 className="council__headline">
            Escape the<br />Echo <em>Chamber.</em>
          </h1>
          <p className="council__subheadline">
            Four frontier models answer the same question independently, rank each other
            through blind peer review, then a synthesizer distills the consensus. Multi-model
            intelligence, no single point of failure.
          </p>
        </div>
        <div className="council__counters">
          <div className="council__counter">
            <div className="council__counter-num">355+</div>
            <div className="council__counter-label">Models via OpenRouter</div>
          </div>
          <div className="council__counter">
            <div className="council__counter-num">3</div>
            <div className="council__counter-label">Stages</div>
          </div>
          <div className="council__counter">
            <div className="council__counter-num">1</div>
            <div className="council__counter-label">Consensus</div>
          </div>
        </div>
      </div>

      {/* Isometric pipeline */}
      <div className="council__pipeline reveal d2">
        <div
          ref={trackRef}
          className="council__pipeline-track"
          onPointerMove={onTrackMove}
          onPointerLeave={onTrackLeave}
        >
          <div className="council__hex">
            <div className="council__hex-border" />
            <div className="council__hex-shape" />
            <div className="council__hex-content">
              <div className="council__hex-stage">Stage 1</div>
              <div className="council__hex-name">Collect</div>
              <div className="council__hex-desc">4 models respond</div>
            </div>
          </div>

          <div className="council__pipe">
            <div className="council__pipe-flow" />
            <div className="council__pipe-particle council__pipe-particle--r" />
            <div className="council__pipe-particle council__pipe-particle--b" />
            <div className="council__pipe-particle council__pipe-particle--g" />
          </div>

          <div className="council__hex">
            <div className="council__hex-border" />
            <div className="council__hex-shape" />
            <div className="council__hex-content">
              <div className="council__hex-stage">Stage 2</div>
              <div className="council__hex-name">Rank</div>
              <div className="council__hex-desc">Peer review</div>
            </div>
          </div>

          <div className="council__pipe">
            <div className="council__pipe-flow" />
            <div className="council__pipe-particle council__pipe-particle--r" />
            <div className="council__pipe-particle council__pipe-particle--b" />
            <div className="council__pipe-particle council__pipe-particle--g" />
          </div>

          <div className="council__hex">
            <div className="council__hex-border" />
            <div className="council__hex-shape" />
            <div className="council__hex-content">
              <div className="council__hex-stage">Stage 3</div>
              <div className="council__hex-name">Synthesize</div>
              <div className="council__hex-desc">Consensus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Persona data panels */}
      <div className="council__panels reveal d3">
        {/* Cynic */}
        <div className="council__panel council__panel--cynic">
          <div className="council__panel-accent" />
          <div className="council__panel-header">
            <span className="council__panel-name">The Cynic</span>
            <span className="council__panel-model" aria-label="Grok"><Grok size={22} color={ICON_GREEN} /></span>
          </div>
          <p className="council__panel-text">
            You&rsquo;ll burn 18 months and $2M training a model that GPT-6 will obsolete
            before your next board meeting. Rent the foundation, invest in distribution.
          </p>
          <div className="council__bars">
            <div className="council__bar-row">
              <span className="council__bar-label">Confidence</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '88%' }} />
              </div>
              <span className="council__bar-value">88%</span>
            </div>
            <div className="council__bar-row">
              <span className="council__bar-label">Relevance</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '72%' }} />
              </div>
              <span className="council__bar-value">72%</span>
            </div>
            <div className="council__bar-row">
              <span className="council__bar-label">Novelty</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '45%' }} />
              </div>
              <span className="council__bar-value">45%</span>
            </div>
          </div>
        </div>

        {/* Strategist */}
        <div className="council__panel council__panel--strategist">
          <div className="council__panel-accent" />
          <div className="council__panel-header">
            <span className="council__panel-name">The Strategist</span>
            <span className="council__panel-model" aria-label="Anthropic"><Anthropic size={22} color={ICON_GREEN} /></span>
          </div>
          <p className="council__panel-text">
            Fine-tune on proprietary data, but don&rsquo;t train from scratch. Own the last
            mile (the embedding layer that makes your product defensible) while renting
            the foundation.
          </p>
          <div className="council__bars">
            <div className="council__bar-row">
              <span className="council__bar-label">Confidence</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '94%' }} />
              </div>
              <span className="council__bar-value">94%</span>
            </div>
            <div className="council__bar-row">
              <span className="council__bar-label">Relevance</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '91%' }} />
              </div>
              <span className="council__bar-value">91%</span>
            </div>
            <div className="council__bar-row">
              <span className="council__bar-label">Novelty</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '67%' }} />
              </div>
              <span className="council__bar-value">67%</span>
            </div>
          </div>
        </div>

        {/* Optimist */}
        <div className="council__panel council__panel--optimist">
          <div className="council__panel-accent" />
          <div className="council__panel-header">
            <span className="council__panel-name">The Optimist</span>
            <span className="council__panel-model" aria-label="Gemini"><Gemini size={22} color={ICON_GREEN} /></span>
          </div>
          <p className="council__panel-text">
            Infrastructure investment creates compounding moats. Start small with
            domain-specific models. The teams that own their stack will own their market
            in 3 years.
          </p>
          <div className="council__bars">
            <div className="council__bar-row">
              <span className="council__bar-label">Confidence</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '79%' }} />
              </div>
              <span className="council__bar-value">79%</span>
            </div>
            <div className="council__bar-row">
              <span className="council__bar-label">Relevance</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '83%' }} />
              </div>
              <span className="council__bar-value">83%</span>
            </div>
            <div className="council__bar-row">
              <span className="council__bar-label">Novelty</span>
              <div className="council__bar-track">
                <div className="council__bar-fill" style={{ width: '81%' }} />
              </div>
              <span className="council__bar-value">81%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA — Launch button only */}
      <div className="council__cta reveal d4">
        <a href="https://council.achillesanalytics.ca" target="_blank" rel="noopener noreferrer" className="council__cta-button">
          Launch Council Platform
          <span className="council__cta-arrow">&#8599;</span>
        </a>
      </div>
    </section>
  );
}

export default AICouncil;
