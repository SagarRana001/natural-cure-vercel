import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToMain = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark tint overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(24, 38, 29, 0.45)', // Forest green tinted dark overlay
          zIndex: 2,
        }}
      />

      {/* Hero Content Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '800px',
            padding: '2.5rem',
            borderRadius: 'var(--border-radius-lg)',
            background: 'rgba(24, 38, 29, 0.4)', // Very subtle glassmorphism container
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 0.9, letterSpacing: '0.25em' }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'hsl(36, 45%, 65%)',
              marginBottom: '1rem',
            }}
          >
            Artisanal Handcrafted Soap
          </motion.span>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}
          >
            Pure Botanical Oils,<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'hsl(40, 25%, 97%)' }}>
              Cured by Nature
            </span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              maxWidth: '620px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            Formulated using pure organic cold-pressed oils, native neem leaf extracts, and essential botanicals. Experience a chemical-free restoration of your skin.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1.2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#about"
              onClick={scrollToMain}
              className="btn btn-light"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Explore Our Craft
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-accent"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
                color: '#fff',
              }}
            >
              Shop Collection
            </a>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.a
        href="#about"
        onClick={scrollToMain}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          opacity: 0.7,
        }}
      >
        Scroll Down
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
