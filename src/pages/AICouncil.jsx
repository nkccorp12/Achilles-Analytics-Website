import './AICouncil.css';

/* ==========================================================================
   AI COUNCIL — Style 5 "Isometric Data Viz"
   Ported from prototypes/style5-isometric.html
   ========================================================================== */

function AICouncil() {
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
            <div className="council__counter-num">4</div>
            <div className="council__counter-label">Models</div>
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
        <div className="council__pipeline-track">
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
            <span className="council__panel-model">Model A</span>
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
            <span className="council__panel-model">Model B</span>
          </div>
          <p className="council__panel-text">
            Fine-tune on proprietary data, but don&rsquo;t train from scratch. Own the last
            mile -- the embedding layer that makes your product defensible -- while renting
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
            <span className="council__panel-model">Model C</span>
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

      {/* Live conversation preview */}
      <div className="council__demo reveal d4">
        <div className="council__demo-header">
          <span className="council__demo-title">Live Council Session</span>
          <span className="council__demo-mode">Strategy Mode</span>
        </div>

        <div className="council__demo-question">
          &ldquo;Should a Series-A startup invest in building proprietary LLM infrastructure?&rdquo;
        </div>

        <div className="council__demo-messages">
          <div className="council__msg">
            <div className="council__msg-dot council__msg-dot--cynic" />
            <div className="council__msg-body">
              <div className="council__msg-sender council__msg-sender--cynic">The Cynic</div>
              <div className="council__msg-text">
                Absolutely not at this stage. You&rsquo;re competing against $100B training
                budgets with Series-A money. The opportunity cost is your entire runway.
              </div>
              <div className="council__msg-rank">
                Peer rank
                <div className="council__msg-rank-bar">
                  <div
                    className="council__msg-rank-fill"
                    style={{ width: '68%', background: 'var(--cynic)' }}
                  />
                </div>
                #2
              </div>
            </div>
          </div>

          <div className="council__msg">
            <div className="council__msg-dot council__msg-dot--strategist" />
            <div className="council__msg-body">
              <div className="council__msg-sender council__msg-sender--strategist">The Strategist</div>
              <div className="council__msg-text">
                Hybrid approach. API-first with a fine-tuning pipeline on your proprietary data.
                Build the moat at the application layer, not the model layer.
              </div>
              <div className="council__msg-rank">
                Peer rank
                <div className="council__msg-rank-bar">
                  <div
                    className="council__msg-rank-fill"
                    style={{ width: '92%', background: 'var(--strategist)' }}
                  />
                </div>
                #1
              </div>
            </div>
          </div>

          <div className="council__msg">
            <div className="council__msg-dot council__msg-dot--optimist" />
            <div className="council__msg-body">
              <div className="council__msg-sender council__msg-sender--optimist">The Optimist</div>
              <div className="council__msg-text">
                Small, domain-specific models are cheaper than you think. Start with distillation
                on your niche. The learning compounds.
              </div>
              <div className="council__msg-rank">
                Peer rank
                <div className="council__msg-rank-bar">
                  <div
                    className="council__msg-rank-fill"
                    style={{ width: '55%', background: 'var(--optimist)' }}
                  />
                </div>
                #3
              </div>
            </div>
          </div>

          <div className="council__msg">
            <div className="council__msg-dot council__msg-dot--synth" />
            <div className="council__msg-body">
              <div className="council__msg-sender council__msg-sender--synth">Synthesizer</div>
              <div className="council__typing">
                <span className="council__typing-dot" />
                <span className="council__typing-dot" />
                <span className="council__typing-dot" />
              </div>
              <div
                className="council__msg-text"
                style={{ marginTop: '0.4rem', color: 'var(--text)', fontWeight: 500 }}
              >
                Fine-tune on proprietary data using foundation model APIs. Invest in the data
                pipeline and embedding layer, not base model training. Revisit infrastructure
                ownership after Series B.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode chips */}
      <div className="council__modes reveal d5">
        <div className="council__mode-chip">Synthesize</div>
        <div className="council__mode-chip">Research</div>
        <div className="council__mode-chip">Debate</div>
        <div className="council__mode-chip council__mode-chip--active">Strategy</div>
        <div className="council__mode-chip">Research Light</div>
      </div>

      {/* CTA */}
      <div className="council__cta reveal d6">
        <p className="council__cta-tagline">
          <span>4</span> Models. <span>3</span> Stages. <span>1</span> Consensus.
        </p>
        <a href="https://council.achillesanalytics.ca" className="council__cta-button">
          Launch Council Platform
          <span className="council__cta-arrow">&#8599;</span>
        </a>
      </div>
    </section>
  );
}

export default AICouncil;
