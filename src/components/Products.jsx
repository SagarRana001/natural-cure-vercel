import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function Products() {
  const [activeTab, setActiveTab] = useState('All');
  const [addingToCart, setAddingToCart] = useState({});
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: 'adding' }));
    
    setTimeout(() => {
      addToCart(product);
      setAddingToCart(prev => ({ ...prev, [product.id]: 'success' }));
      setTimeout(() => {
        setAddingToCart(prev => ({ ...prev, [product.id]: null }));
      }, 1500);
    }, 500);
  };

  const filteredProducts = activeTab === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.tags.includes(activeTab) || p.tags.some(t => t.includes(activeTab)));

  return (
    <section
      id="products"
      style={{
        backgroundColor: 'var(--color-bg-cream)',
        position: 'relative',
        zIndex: 5,
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
            Organic Apothecary
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '2rem' }}
          >
            The Handcrafted <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Collection</span>
          </motion.h2>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
            }}
          >
            {['All', 'Organic', 'Sensitive Skin', 'Dry Skin', 'Purifying'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: 'var(--border-radius-full)',
                  border: '1px solid',
                  borderColor: activeTab === tab ? 'var(--color-primary)' : 'rgba(24, 38, 29, 0.1)',
                  backgroundColor: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--color-text-dark)',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  transition: 'var(--transition-snappy)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                borderRadius: 'var(--border-radius-lg)',
                backgroundColor: '#fff',
                border: '1px solid var(--color-border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Product Visual Container */}
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    height: '260px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'hsl(40, 20%, 93%)',
                  }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  
                  {/* Tag Overlay */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(24, 38, 29, 0.75)',
                      backdropFilter: 'blur(5px)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '99px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'hsl(40, 25%, 97%)',
                      zIndex: 2,
                    }}
                  >
                    Ayurveda
                  </span>
                </div>
              </Link>

              {/* Product Info Block */}
              <div
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  gap: '1rem',
                }}
              >
                <div>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.6rem',
                        color: 'var(--color-primary)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      display: 'block',
                      fontStyle: 'italic',
                    }}
                  >
                    {product.subtitle}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5' }}>
                  {product.description}
                </p>

                {/* Active Botanicals Tag Cloud */}
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                      display: 'block',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Active Botanicals:
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {product.ingredients.map(ing => (
                      <span
                        key={ing}
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: 'var(--color-bg-light)',
                          color: 'var(--color-text-dark)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(24, 38, 29, 0.05)',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Info & Buy Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border-light)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {product.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart[product.id] === 'adding'}
                    className="btn"
                    style={{
                      padding: '0.6rem 1.2rem',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--border-radius-full)',
                      backgroundColor: addingToCart[product.id] === 'success' ? '#22c55e' : 'var(--color-primary)',
                      color: '#fff',
                      minWidth: '130px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      border: 'none',
                    }}
                  >
                    {addingToCart[product.id] === 'adding' ? (
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite',
                        }}
                      />
                    ) : addingToCart[product.id] === 'success' ? (
                      <>
                        <Check size={14} />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Spin Animation */}
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
