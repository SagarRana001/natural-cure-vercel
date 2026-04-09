'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedContainer } from './AnimatedContainer';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Column */}
        <div className="flex flex-col gap-6 relative z-20">
          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <p className="text-sm tracking-[0.2em] font-medium text-sage-leaf uppercase">
              Handcrafted Ayurvedic Heritage
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeInUp" delay={0.4} className="max-w-xl">
            <h1 className="text-5xl md:text-8xl font-instrument-serif tracking-tight leading-[0.95]">
              Nature's purest <br/>
              <span className="italic text-saffron-amber">essence</span>
            </h1>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeInUp" delay={0.6} className="max-w-md">
            <p className="text-earth-umber/80 text-lg leading-relaxed text-balance">
              Discover our collection of 100% organic, traditionally cold-pressed soaps. Crafted with ancestral recipes for your daily ritual.
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeInUp" delay={0.8}>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 px-8 py-4 bg-earth-umber text-canvas-white rounded-full font-medium tracking-wide uppercase text-sm hover:bg-earth-umber/90 transition-colors w-max"
            >
              Explore Collection
            </motion.button>
          </AnimatedContainer>
        </div>

        {/* Visual Column / Asymmetric Layout */}
        <div className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center">
          <AnimatedContainer animation="fadeIn" delay={0.5} duration={1.2} className="relative w-full max-w-sm aspect-[4/5] md:translate-x-12">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full relative rounded-t-full overflow-hidden"
            >
              <Image 
                src="/images/soap_gluta_rosa.png" 
                alt="Gluta Rosa Premium Soap" 
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatedContainer>

          {/* Floating Element */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute -bottom-10 md:bottom-10 left-0 md:-left-20 w-40 h-40 rounded-full overflow-hidden border-4 border-canvas-white shadow-2xl"
          >
            <Image 
                src="/images/soap_rose_beetroot.png" 
                alt="Rose & Beetroot Glow Soap" 
                fill
                className="object-cover"
              />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative subtle texture/gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-whisper-sand)_0%,_transparent_50%)] opacity-30"></div>
    </section>
  );
}
