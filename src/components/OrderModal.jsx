import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Phone, Loader2, CheckCircle, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabaseClient';

export default function OrderModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto-fill details if user is logged in
  useEffect(() => {
    if (user && user.user_metadata) {
      if (user.user_metadata.name) setName(user.user_metadata.name);
      if (user.user_metadata.address) setAddress(user.user_metadata.address);
      if (user.user_metadata.alternative_contact) setPhone(user.user_metadata.alternative_contact);
    }
  }, [user]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const itemsSummary = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
      const formattedTotal = `₹${cartTotal.toFixed(2)}`;

      const { error: dbError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id || null,
            product_name: itemsSummary,
            price: formattedTotal,
            customer_name: name,
            customer_phone: phone,
            customer_address: address,
            status: 'pending_call'
          }
        ]);

      if (dbError) throw dbError;

      setSuccess(true);
      clearCart();
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      console.error('Order Error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !success) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!loading && !success ? onClose : undefined}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(24, 38, 29, 0.6)',
              backdropFilter: 'blur(6px)',
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
                maxWidth: '480px',
                padding: '0',
                position: 'relative',
                pointerEvents: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                overflow: 'hidden',
              }}
            >
              {/* Header Image Area */}
              <div style={{ position: 'relative', height: '140px', backgroundColor: 'var(--color-bg-cream)', overflow: 'hidden' }}>
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
                  zIndex: 1 
                }} />
                
                {/* Close Button */}
                {!loading && !success && (
                  <button
                    onClick={onClose}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-text-dark)',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backdropFilter: 'blur(4px)',
                      boxShadow: 'var(--shadow-sm)',
                      zIndex: 10
                    }}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div style={{ padding: '0 2.5rem 2.5rem 2.5rem', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '2rem 0' }}
                  >
                    <div style={{ 
                      width: '80px', height: '80px', borderRadius: '50%', 
                      backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem auto'
                    }}>
                      <CheckCircle size={40} />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Order Placed!</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                      We have received your order. <br/>
                      Our team will call you shortly at <strong>{phone}</strong> to confirm delivery.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <span style={{ 
                        display: 'inline-block', backgroundColor: 'var(--color-primary)', color: '#fff',
                        padding: '0.3rem 1rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600,
                        marginBottom: '1rem', boxShadow: 'var(--shadow-sm)'
                      }}>
                        ₹{cartTotal.toFixed(2)}
                      </span>
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', lineHeight: '1.2' }}>
                        Checkout
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        You are ordering {cartItems.length} item(s). We will call you to confirm your order.
                      </p>
                    </div>

                    {error && (
                      <div style={{
                        padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        border: '1px solid rgba(220, 38, 38, 0.2)', color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.5rem'
                      }}>
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="order-name">Full Name</label>
                        <div style={{ position: 'relative' }}>
                          <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                          <input
                            id="order-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder="Your full name"
                            style={{ width: '100%', paddingLeft: '2.8rem' }}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="order-phone">Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                          <input
                            id="order-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            placeholder="For order confirmation"
                            style={{ width: '100%', paddingLeft: '2.8rem' }}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                        <label className="form-label" htmlFor="order-address">Delivery Address</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--color-text-muted)' }} />
                          <textarea
                            id="order-address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            placeholder="Full delivery address..."
                            style={{ width: '100%', paddingLeft: '2.8rem', minHeight: '80px', resize: 'none' }}
                          />
                        </div>
                      </div>

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
                          <>
                            <Package size={18} />
                            Place Order
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
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
