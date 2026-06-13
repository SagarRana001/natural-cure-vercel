import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database API call with micro-interaction timing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Keep success message visible for a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--color-bg-light)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid var(--color-border-light)',
      }}
    >
      <div className="container">
        {/* Title Block */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            Connect With Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Visit Our Apothecary or <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Reach Out</span>
          </motion.h2>
        </div>

        {/* Form and Info Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Column 1: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '1rem' }}>
                Artisanal HQ & Shop
              </h3>
              <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
                We brew and cure all our botanical bars at our solar-powered apothecary. Stop by to smell the cure and custom stamp your own soap block.
              </p>
            </div>

            {/* Info Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Item 1 */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(155, 122, 60, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                    Address
                  </h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>
                    742 Neem Grove Lane, Suite B<br />
                    Ojai, California 93023
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(155, 122, 60, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                    Visiting Hours
                  </h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>
                    Wed – Sat: 10:00 AM – 6:00 PM<br />
                    Sun: 11:00 AM – 4:00 PM
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(155, 122, 60, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                    Email & Support
                  </h4>
                  <a href="mailto:hello@naturalcure.com" style={{ fontSize: '0.95rem', opacity: 0.7, color: 'var(--color-primary-light)', textDecoration: 'underline' }}>
                    hello@naturalcure.com
                  </a>
                </div>
              </div>

              {/* Item 4 */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(155, 122, 60, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                    Phone
                  </h4>
                  <a href="tel:+18055550199" style={{ fontSize: '0.95rem', opacity: 0.7 }}>
                    +1 (805) 555-0199
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '3rem 2.5rem',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--border-radius-lg)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                          className="form-control"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                          className="form-control"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                        className="form-control"
                        placeholder="Inquiry topic"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message</label>
                      <textarea
                        required
                        value={formState.message}
                        onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        className="form-control"
                        placeholder="Tell us what you're looking for..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                      style={{
                        padding: '1rem',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        fontSize: '0.85rem',
                        border: 'none',
                        marginTop: '0.5rem',
                      }}
                    >
                      {isSubmitting ? (
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 0.6s linear infinite',
                          }}
                        />
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '2rem 1rem',
                      gap: '1.2rem',
                    }}
                  >
                    <CheckCircle size={64} style={{ color: '#22c55e' }} />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-primary)' }}>
                      Message Received
                    </h3>
                    <p style={{ opacity: 0.8, maxWidth: '360px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Thank you for contacting Natural Cure. We have harvested your request and will reach out to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.6rem 1.4rem',
                        fontSize: '0.75rem',
                        marginTop: '1rem',
                      }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
