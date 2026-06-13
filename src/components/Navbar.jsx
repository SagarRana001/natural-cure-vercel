import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, User, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const NAV_ITEMS = [
  { label: 'Home', target: '#home' },
  { label: 'About', target: '#about' },
  { label: 'Process', target: '#process' },
  { label: 'Products', target: '#products' },
  { label: 'Contact', target: '#contact' }
];

export default function Navbar({ onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const { user, signOut } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: isScrolled ? '1.5rem' : '0rem',
          left: '0',
          right: '0',
          width: '100%',
          maxWidth: isScrolled ? 'min(90%, 1200px)' : '100%',
          margin: '0 auto',
          height: '4.5rem',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          borderRadius: isScrolled ? 'var(--border-radius-full)' : '0px',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
          borderBottom: isScrolled ? '1px solid rgba(24, 38, 29, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: isScrolled ? 'var(--color-primary)' : '#fff',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
          }}
        >
          <Leaf
            size={20}
            style={{
              color: isScrolled ? 'var(--color-primary-light)' : 'hsl(36, 45%, 65%)',
              transform: 'rotate(-15deg)',
            }}
          />
          <span>NATURAL CURE</span>
        </a>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="nav-links-desktop"
        >
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              listStyle: 'none',
            }}
          >
            {NAV_ITEMS.map((item, idx) => (
              <li
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={item.target}
                  onClick={(e) => handleLinkClick(e, item.target)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: isScrolled ? 'var(--color-text-dark)' : '#fff',
                    opacity: isScrolled ? 0.8 : 0.9,
                    padding: '0.5rem 0',
                    display: 'block',
                  }}
                >
                  {item.label}
                </a>

                {/* Animated Hover Line */}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navHoverLine"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: isScrolled ? 'var(--color-accent)' : 'hsl(36, 45%, 65%)',
                      borderRadius: '2px',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: isScrolled ? 'var(--color-primary)' : '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                <User size={16} />
                <span style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={signOut}
                className="btn btn-secondary"
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  color: isScrolled ? 'var(--color-primary)' : '#fff',
                  borderColor: isScrolled ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-primary"
              style={{
                padding: '0.6rem 1.4rem',
                fontSize: '0.75rem',
                color: '#fff',
                backgroundColor: isScrolled ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.15)',
                border: isScrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: isScrolled ? 'none' : 'blur(10px)',
              }}
            >
              Sign In
            </button>
          )}
          
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: isScrolled ? 'var(--color-primary)' : '#fff',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: 'var(--color-accent)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: isScrolled ? 'var(--color-primary)' : '#fff',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none', // Overridden in custom media-queries inside CSS, or inline responsive below
          }}
          className="nav-toggle-mobile"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Slide Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              top: '4.5rem',
              left: '0',
              right: '0',
              backgroundColor: 'hsl(140, 20%, 8%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2rem 1.5rem',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                listStyle: 'none',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.target}
                    onClick={(e) => handleLinkClick(e, item.target)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'hsl(40, 25%, 97%)',
                      display: 'block',
                      padding: '0.5rem 0',
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1rem',
                  textAlign: 'center',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                }}
              >
                Sign Out ({user.email.split('@')[0]})
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="btn btn-accent"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                Sign In
              </button>
            )}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <ShoppingBag size={18} />
              Cart ({totalItems})
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for navbar responsive control since Tailwind is disabled */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-toggle-mobile {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
