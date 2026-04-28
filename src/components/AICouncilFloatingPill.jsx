import { useEffect, useState } from 'react';
import { OpenAI, Gemini, Anthropic, Mistral, Grok, Meta, Qwen, DeepSeek, Cohere } from '@lobehub/icons';

/* ─── AI Council Floating Pill (scroll-triggered, lives inside .np-pill-stack) ─── */
export default function AICouncilFloatingPill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`np-aicouncil np-aicouncil--floating${visible ? ' np-aicouncil--in' : ''}`}
      onClick={() => {
        window.location.href = '/council';
      }}
      aria-label="Open AI Council page"
    >
      <div className="np-aicouncil__topbar">
        <div className="np-aicouncil__ticker np-aicouncil__ticker--bg" aria-hidden="true">
          <div className="np-aicouncil__ticker-track">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div className="np-aicouncil__ticker-set" key={dup}>
                <OpenAI size={16} />
                <Gemini size={16} />
                <Anthropic size={16} />
                <Mistral size={16} />
                <Grok size={16} />
                <Meta size={16} />
                <Qwen size={16} />
                <DeepSeek size={16} />
                <Cohere size={16} />
              </div>
            ))}
          </div>
        </div>
        <span className="np-aicouncil__pill">FROM OUR RESEARCH DESK</span>
      </div>
      <h3 className="np-aicouncil__title">The AI Council.</h3>
      <p className="np-aicouncil__desc">Escape the echo chamber. 4 frontier LLMs debate, rank, synthesize.</p>
    </button>
  );
}
