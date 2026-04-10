'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedContainer } from './AnimatedContainer';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Text Column - Spans 5 columns on large screens */}
        <div className="lg:col-span-5 flex flex-col gap-8 relative z-20">
          <AnimatedContainer animation="fadeInUp" delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-sage-leaf/40"></div>
              <p className="text-sm tracking-[0.3em] font-medium text-sage-leaf uppercase">
                Artisanal Ayurvedic Craft
              </p>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeInUp" delay={0.4} className="max-w-xl">
            <h1 className="text-6xl md:text-[5.5rem] font-instrument-serif tracking-tight leading-[0.9] text-earth-umber">
              Return to <br/>
              <span className="italic text-saffron-amber">Nature's</span> <br/>
              Purity.
            </h1>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeInUp" delay={0.6} className="max-w-md">
            <p className="text-earth-umber/70 text-lg md:text-xl leading-relaxed text-balance font-outfit">
              100% Organic, handmade soaps crafted in the heart of Gujarat. Traditional recipes meet modern skin science.
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeInUp" delay={0.8} className="flex flex-wrap gap-6 pt-4">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-earth-umber text-canvas-white rounded-full font-medium tracking-wide uppercase text-xs hover:bg-earth-umber/90 transition-all shadow-xl shadow-earth-umber/10"
            >
              Shop Curated Collection
            </motion.button>
            
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-earth-umber font-semibold uppercase text-xs tracking-widest group"
            >
              Our Heritage
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                <path d="M12 1L17 6M17 6L12 11M17 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </AnimatedContainer>
        </div>

        {/* Visual Column - Spans 7 columns with asymmetric layout */}
        <div className="lg:col-span-7 relative h-[50vh] md:h-[70vh] w-full mt-12 lg:mt-0">
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
            {/* Main Image Container with offset */}
            <AnimatedContainer animation="fadeIn" delay={0.5} duration={1.2} className="relative w-full max-w-lg aspect-[4/5] lg:translate-x-8">
              <motion.div 
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="w-full h-full relative rounded-t-[10rem] rounded-b-3xl overflow-hidden shadow-2xl border-[12px] border-white/50"
              >
                <Image 
                  src="/images/hero_collection.png" 
                  alt="Natural Cure Soap Collection" 
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatedContainer>

            {/* Overlapping Decorative Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
              className="absolute -top-10 right-0 md:-right-10 bg-saffron-amber text-canvas-white w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center text-center p-4 border-8 border-[#FAF9F6] shadow-xl z-30"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold mb-1">Authentic</span>
              <span className="text-2xl md:text-3xl font-instrument-serif leading-none italic">Cold Press</span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold mt-1">Heritage</span>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-earth-umber/30"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-earth-umber/30 to-transparent"></div>
      </motion.div>

      {/* Background shapes */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-sage-leaf/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-saffron-amber/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
