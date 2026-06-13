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

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
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
          <Navbar />
          <Hero />
          <About />
          <ScrollSoapAnimation />
          <Products />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
