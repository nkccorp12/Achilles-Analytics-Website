import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './WhitelistButton.css';

/*
  Renders a button whose label swaps from "Access Platform" to "Join Whitelist"
  on hover/focus. On click, opens a small email-capture modal.

  Usage: <WhitelistButton className="neu-header__cta neu-header__cta--visible" />

  className is passed through so the button inherits the existing visual variant
  (hero primary, header CTA, reach-out secondary, etc.).
*/

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function WhitelistButton({
  className = '',
  baseLabel = 'Access Platform',
  hoverLabel = 'Join Whitelist',
  ...rest
}) {
  const [phase, setPhase] = useState('closed');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const lastFocusRef = useRef(null);
  const inputRef = useRef(null);

  const open = useCallback(() => {
    lastFocusRef.current = document.activeElement;
    setSent(false);
    setError('');
    setPhase('opening');
    setTimeout(() => setPhase('open'), 20);
  }, []);

  const close = useCallback(() => {
    setPhase('closing');
    setTimeout(() => {
      setPhase('closed');
      if (lastFocusRef.current && lastFocusRef.current.focus) {
        lastFocusRef.current.focus();
      }
    }, 280);
  }, []);

  useEffect(() => {
    if (phase === 'closed') return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    if (phase === 'open') {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [phase, close]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError('Enter a valid email.');
      return;
    }
    setError('');
    setSent(true);
    const subject = 'Whitelist Request: Achilles Platform';
    const body =
      `Whitelist sign-up\n\n` +
      `Email: ${trimmed}\n` +
      (role ? `Role / context: ${role}\n` : '') +
      `\n\nSent from achillesanalytics.ca whitelist form.`;
    setTimeout(() => {
      window.location.href =
        `mailto:ops@achillesanalytics.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 1600);
  }, [email, role]);

  return (
    <>
      <button
        type="button"
        className={`wl-btn ${className}`.trim()}
        onClick={open}
        {...rest}
      >
        {baseLabel === hoverLabel ? (
          <span className="wl-btn__static">{baseLabel}</span>
        ) : (
          <>
            <span className="wl-btn__swap" aria-hidden="true">
              <span className="wl-btn__text wl-btn__text--base">{baseLabel}</span>
              <span className="wl-btn__text wl-btn__text--hover">{hoverLabel}</span>
            </span>
            <span className="wl-btn__sr">{baseLabel}, {hoverLabel.toLowerCase()}</span>
          </>
        )}
      </button>

      {phase !== 'closed' && createPortal(
        <div
          className={`wl-overlay wl-overlay--${phase}`}
          onClick={close}
          role="presentation"
        >
          <div
            className={`wl-modal wl-modal--${phase}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wl-title"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="wl-corner wl-corner--tl" aria-hidden="true" />
            <span className="wl-corner wl-corner--tr" aria-hidden="true" />
            <span className="wl-corner wl-corner--bl" aria-hidden="true" />
            <span className="wl-corner wl-corner--br" aria-hidden="true" />

            <button
              type="button"
              className="wl-close"
              onClick={close}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="wl-head">
              <span className="wl-head__label">// WHITELIST</span>
              <span className="wl-head__status">
                <span className="wl-head__dot" />
                INVITE ONLY
              </span>
            </div>

            {!sent ? (
              <>
                <h2 id="wl-title" className="wl-title">
                  Get the call when access <em>opens.</em>
                </h2>
                <p className="wl-lead">
                  Platform access is invite-based. Drop an email and a one-liner
                  on what you&rsquo;d use it for. We reach out when the
                  next seats open.
                </p>

                <form className="wl-form" onSubmit={handleSubmit} noValidate>
                  <label className="wl-field">
                    <span className="wl-field__label">EMAIL</span>
                    <input
                      ref={inputRef}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className="wl-input"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                      placeholder="name@domain.com"
                      required
                    />
                  </label>

                  <label className="wl-field">
                    <span className="wl-field__label">ROLE / CONTEXT <span className="wl-field__opt">(optional)</span></span>
                    <input
                      type="text"
                      className="wl-input"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Analyst, researcher, team of 4..."
                      maxLength={120}
                    />
                  </label>

                  {error && <div className="wl-error">{error}</div>}

                  <button type="submit" className="wl-submit">
                    <span>Request Invitation</span>
                    <span className="wl-submit__arrow" aria-hidden="true">&rarr;</span>
                  </button>

                  <p className="wl-fine">
                    No newsletters. No tracking. Just one reply when a seat opens.
                  </p>
                </form>
              </>
            ) : (
              <div className="wl-sent">
                <div className="wl-sent__icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
                    <circle cx="24" cy="24" r="21" stroke="#BCFF2F" strokeWidth="1.5" />
                    <polyline points="14 24 22 32 34 18" stroke="#BCFF2F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="wl-sent__title">On the list.</p>
                <p className="wl-sent__sub">
                  Your mail client is opening. Hit send to confirm the request.
                </p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
