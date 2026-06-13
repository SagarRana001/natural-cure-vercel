import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AuthModal from './components/AuthModal';
import CartSidebar from './components/CartSidebar';
import OrderModal from './components/OrderModal';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {/* Full screen botanical loader screen */}
          <Loader onComplete={() => setIsLoaded(true)} />

          {/* Main website page content */}
          {isLoaded && (
            <div style={{ width: '100%' }}>
              <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
              
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
              </Routes>
            </div>
          )}

          {/* Overlays */}
          <CartSidebar onCheckout={() => setIsOrderModalOpen(true)} />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
        
        <OrderModal 
          isOpen={isOrderModalOpen} 
          onClose={() => setIsOrderModalOpen(false)} 
        />
      </CartProvider>
    </AuthProvider>
    </Router>
  );
}
