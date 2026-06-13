import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import ScrollSoapAnimation from '../components/ScrollSoapAnimation';
import Products from '../components/Products';
import Contact from '../components/Contact';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ width: '100%' }}
    >
      <Hero />
      <About />
      <ScrollSoapAnimation />
      <Products />
      <Contact />
    </motion.div>
  );
}
