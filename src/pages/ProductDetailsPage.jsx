import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Find the product by ID
    const found = PRODUCTS.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  const handleAddToCart = () => {
    setAdding(true);
    
    setTimeout(() => {
      // Create a modified product object with the selected quantity to add to cart
      const productWithQuantity = { ...product };
      // Instead of relying purely on the context to increase by 1, 
      // we loop or the context handles it. We can just call addToCart `quantity` times
      // or modify the context to accept a specific quantity. 
      // Our context currently adds 1 each time `addToCart` is called.
      for(let i=0; i<quantity; i++) {
        addToCart(productWithQuantity);
      }
      
      setAdding(false);
      setAdded(true);
      
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }, 600);
  };

  if (!product) {
    return (
      <div style={{ padding: '10rem 2rem', textAlign: 'center', minHeight: '100vh' }}>
        <h2>Product not found.</h2>
        <Link to="/" style={{ color: 'var(--color-primary)' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        paddingTop: '80px', // account for fixed navbar
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-light)'
      }}
    >
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <Link 
          to="/#products" 
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
            color: 'var(--color-text-muted)', textDecoration: 'none', 
            marginBottom: '2rem', fontWeight: 500, transition: 'color 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
        >
          <ArrowLeft size={18} />
          Back to Apothecary
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              flex: '1 1 400px', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              backgroundColor: '#fff'
            }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' }} 
            />
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <span style={{ 
                textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, 
                letterSpacing: '0.1em', color: 'var(--color-accent)' 
              }}>
                Ayurvedic Collection
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--color-primary)', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                {product.name}
              </h1>
              <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                {product.subtitle}
              </span>
            </div>

            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-dark)' }}>
              {product.price}
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--color-text-muted)', maxWidth: '90%' }}>
              {product.description}
            </p>

            {/* Active Botanicals */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
                Active Botanicals
              </h4>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                {product.ingredients.map(ing => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-light)', margin: '1rem 0' }} />

            {/* Action Area */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', 
                backgroundColor: '#fff', border: '1px solid var(--color-border-light)', 
                borderRadius: '99px', padding: '0.5rem 1rem' 
              }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-text-dark)' }}
                >
                  <Minus size={18} />
                </button>
                <span style={{ fontWeight: 600, width: '24px', textAlign: 'center' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-text-dark)' }}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: added ? '#22c55e' : 'var(--color-primary)'
                }}
              >
                {adding ? (
                  <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                ) : added ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Add to Cart - {product.price}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
