import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, AlertCircle, Loader2, User, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [altContact, setAltContact] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onClose(); // Close modal on successful login
      } else {
        const { error } = await signUp(email, password, {
          name,
          address,
          alternative_contact: altContact,
        });
        if (error) throw error;
        setSuccessMsg('Registration successful! You can now sign in.');
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setName('');
    setAddress('');
    setAltContact('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(24, 38, 29, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              pointerEvents: 'none',
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem 2rem',
                position: 'relative',
                pointerEvents: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X size={20} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {isLogin ? 'Welcome Back' : 'Join Us'}
                </h2>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {isLogin 
                    ? 'Sign in to access your natural remedies' 
                    : 'Create an account to start your wellness journey'}
                </p>
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      border: '1px solid rgba(220, 38, 38, 0.2)',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p>{error}</p>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(5, 150, 105, 0.1)',
                      border: '1px solid rgba(5, 150, 105, 0.2)',
                      color: '#059669',
                      fontSize: '0.85rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <p>{successMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="form-group" style={{ marginBottom: 0 }}
                  >
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                      <input
                        id="name"
                        type="text"
                        required={!isLogin}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Jane Doe"
                        style={{ width: '100%', paddingLeft: '2.8rem' }}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="email">Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="your@email.com"
                      style={{ width: '100%', paddingLeft: '2.8rem' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <label className="form-label" htmlFor="password">Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="••••••••"
                      style={{ width: '100%', paddingLeft: '2.8rem' }}
                    />
                  </div>
                </div>

                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                  >
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="address">Address</label>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                          id="address"
                          type="text"
                          required={!isLogin}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          placeholder="123 Wellness Way, City"
                          style={{ width: '100%', paddingLeft: '2.8rem' }}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                      <label className="form-label" htmlFor="altContact">Alternative Contact <span style={{ opacity: 0.6, fontSize: '0.8em', textTransform: 'none' }}>(Optional)</span></label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                          id="altContact"
                          type="tel"
                          value={altContact}
                          onChange={(e) => setAltContact(e.target.value)}
                          className="form-control"
                          placeholder="+1 (555) 000-0000"
                          style={{ width: '100%', paddingLeft: '2.8rem' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    opacity: loading ? 0.8 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={toggleMode}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                      padding: '0.2rem',
                    }}
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
          
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
