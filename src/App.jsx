import { useState } from 'react';
import { motion } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ScrollSoapAnimation from './components/ScrollSoapAnimation';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      {/* Full screen botanical loader screen */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Main website page content */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
          <Hero />
          <About />
          <ScrollSoapAnimation />
          <Products />
          <Contact />
          <Footer />
        </motion.div>
      )}

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </AuthProvider>
  );
}
