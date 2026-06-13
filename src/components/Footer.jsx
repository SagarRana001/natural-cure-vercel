import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'subscribed' or null

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('subscribing');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1000);
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-dark)',
        color: 'var(--color-text-light)',
        padding: '5rem 0 2rem 0',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid var(--color-border-dark)',
      }}
    >
      <div className="container">
        {/* Main Footer Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '0.08em',
              }}
            >
              <Leaf size={24} style={{ color: 'hsl(36, 45%, 65%)', transform: 'rotate(-15deg)' }} />
              <span>NATURAL CURE</span>
            </a>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Handcrafting organic remedies for conscious skin rituals. Preserving ancient cold-process saponification for healthy, biological repair.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a
                href="https://www.instagram.com/__naturalcure__/"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-snappy)',
                }}
                className="social-hover"
                aria-label="Instagram"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-snappy)',
                }}
                className="social-hover"
                aria-label="Facebook"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fff',
                marginBottom: '1.5rem',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }} className="link-hover">
                  Home Banner
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }} className="link-hover">
                  About Neem
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => handleLinkClick(e, '#process')} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }} className="link-hover">
                  Curing Process
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleLinkClick(e, '#products')} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }} className="link-hover">
                  Handcrafted Soaps
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }} className="link-hover">
                  Apothecary Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fff',
                marginBottom: '0.3rem',
              }}
            >
              The Curing Circle
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Subscribe to receive updates when our small batches cure, secret recipes, and skin advice.
            </p>

            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                borderBottom: '1.5px solid rgba(255,255,255,0.2)',
                paddingBottom: '0.5rem',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <input
                type="email"
                required
                value={email}
                disabled={status === 'success'}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  padding: '0.4rem 0',
                  flexGrow: 1,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === 'subscribing' || status === 'success'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'hsl(36, 45%, 65%)',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {status === 'subscribing' ? (
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderTopColor: 'hsl(36, 45%, 65%)',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                    }}
                  />
                ) : status === 'success' ? (
                  <Check size={16} style={{ color: '#22c55e' }} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </form>
            <AnimatePresence>
              {status === 'success' && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ fontSize: '0.75rem', color: '#22c55e', fontStyle: 'italic' }}
                >
                  Welcome to the curing circle. Check your inbox!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Sub-bottom details */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)' }}>
            &copy; {new Date().getFullYear()} Natural Cure LLC. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#home" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }} className="link-hover">
              Privacy Policy
            </a>
            <a href="#home" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }} className="link-hover">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Hover effects class rules */}
      <style>{`
        .social-hover:hover {
          background-color: hsl(36, 45%, 42%) !important;
          transform: translateY(-2px);
        }
        .link-hover:hover {
          color: hsl(36, 45%, 65%) !important;
          padding-left: 3px;
        }
      `}</style>
    </footer>
  );
}
