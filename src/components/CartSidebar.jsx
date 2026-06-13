import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartSidebar({ onCheckout }) {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(24, 38, 29, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
              borderRadius: '24px 0 0 24px',
              borderRight: 'none',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.5rem', borderBottom: '1px solid var(--color-border-light)'
            }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={24} color="var(--color-primary)" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'rgba(24, 38, 29, 0.05)', border: 'none',
                  borderRadius: '50%', padding: '0.5rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', margin: 'auto', opacity: 0.5 }}>
                  <ShoppingBag size={48} style={{ margin: '0 auto 1rem auto' }} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', gap: '1rem', padding: '1rem',
                    backgroundColor: '#fff', borderRadius: '12px',
                    border: '1px solid var(--color-border-light)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{item.price}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '99px', padding: '0.2rem' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}><Minus size={14} /></button>
                          <span style={{ fontSize: '0.85rem', width: '20px', textAlign: 'center', fontWeight: 500 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: '0.2rem' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--color-primary)' }}>₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckout();
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
