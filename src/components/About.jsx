import { motion } from 'framer-motion';
import { ShieldAlert, Sparkles, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: <Sparkles size={28} style={{ color: 'var(--color-accent)' }} />,
    title: 'Cold-Process Integrity',
    desc: 'By keeping temperatures strictly below 110°F during formulation, we ensure the delicate botanical enzymes, proteins, and vitamins in neem oil remain intact and highly active.'
  },
  {
    icon: <ShieldAlert size={28} style={{ color: 'var(--color-accent)' }} />,
    title: 'Zero Synthetics',
    desc: 'No sulfates, parabens, synthetic fragrances, or colorants. Our beautiful hues come from natural clays and chlorophyll, and our lather comes from coconut and castor oils.'
  },
  {
    icon: <Heart size={28} style={{ color: 'var(--color-accent)' }} />,
    title: '6-Week Slow Cure',
    desc: 'Patience yields excellence. Every single bar curing on our pine racks naturally forms skin-conditioning glycerin, creating a dense, long-lasting bar that nurtures your skin.'
  }
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--color-bg-light)',
        position: 'relative',
        zIndex: 5, // Sits above canvas track
        borderBottom: '1px solid var(--color-border-light)',
      }}
    >
      <div className="container">
        {/* Main Header Block */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              The Village Pharmacy
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Harnessing the Pure Power of <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Neem Leaves</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            <p className="lead" style={{ color: 'var(--color-primary-light)', marginBottom: '1rem' }}>
              "Neem has been celebrated in ancient ayurvedic texts as Sarva Roga Nivarini—the curer of all ailments."
            </p>
            <p style={{ opacity: 0.8 }}>
              For centuries, the neem tree has stood as a botanical sanctuary. At Natural Cure, we bridge traditional healing wisdom with modern design science. By infusing premium, organic neem oil into cold-saponified bars, we create an animated remedy that restores skin moisture, fights irritation, and purifies acne-prone skin without harsh chemicals.
            </p>
          </motion.div>
        </div>

        {/* Brand Values Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {VALUES.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 'var(--border-radius-lg)',
                backgroundColor: 'var(--color-bg-cream)',
                border: '1px solid rgba(24, 38, 29, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-snappy)',
              }}
              whileHover={{
                y: -6,
                boxShadow: 'var(--shadow-md)',
                borderColor: 'rgba(24, 38, 29, 0.1)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'rgba(155, 122, 60, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {val.icon}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                }}
              >
                {val.title}
              </h3>

              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.75 }}>
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
