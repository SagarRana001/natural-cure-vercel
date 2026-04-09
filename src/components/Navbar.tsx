'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between mix-blend-difference text-canvas-white"
    >
      <Link href="/" className="text-xl font-instrument-serif tracking-wide border-b border-transparent hover:border-canvas-white transition-colors duration-300">
        Natural Cure
      </Link>
      
      <div className="hidden md:flex gap-8 items-center text-sm tracking-widest uppercase">
        <Link href="#story" className="relative group overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">Story</span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">Story</span>
        </Link>
        <Link href="#collection" className="relative group overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">Collection</span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">Collection</span>
        </Link>
        <Link href="#benefits" className="relative group overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">Benefits</span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">Benefits</span>
        </Link>
      </div>

      <button className="md:hidden flex flex-col gap-1.5 p-2">
        <span className="w-6 h-[1px] bg-current block"></span>
        <span className="w-6 h-[1px] bg-current block"></span>
      </button>
    </motion.nav>
  );
}
