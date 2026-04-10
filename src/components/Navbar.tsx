'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl px-8 py-5 flex items-center justify-between rounded-full glass-panel shadow-2xl shadow-earth-umber/5"
    >
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 bg-earth-umber rounded-full flex items-center justify-center text-[0.6rem] text-canvas-white font-bold tracking-tighter transition-transform group-hover:rotate-12">
            NC
        </div>
        <span className="text-xl font-instrument-serif tracking-tight text-earth-umber">
            Natural Cure
        </span>
      </Link>
      
      <div className="hidden md:flex gap-10 items-center text-[0.65rem] font-bold tracking-[0.3em] uppercase text-earth-umber/60">
        <Link href="#collection" className="hover:text-earth-umber transition-colors relative group">
          Collection
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-earth-umber transition-all group-hover:w-full"></span>
        </Link>
        <Link href="#about" className="hover:text-earth-umber transition-colors relative group">
          Heritage
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-earth-umber transition-all group-hover:w-full"></span>
        </Link>
        <Link href="#contact" className="hover:text-earth-umber transition-colors relative group">
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-earth-umber transition-all group-hover:w-full"></span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-earth-umber text-canvas-white rounded-full text-[0.65rem] font-bold tracking-widest uppercase"
        >
          Cart (0)
        </motion.button>
      </div>
    </motion.nav>
  );
}
