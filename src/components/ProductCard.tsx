'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  category: string;
  price: string;
  imageSrc: string;
  delay?: number;
}

export function ProductCard({ title, category, price, imageSrc, delay = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-4 cursor-pointer"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-whisper-sand/20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-earth-umber/0 group-hover:bg-earth-umber/20 transition-colors duration-500 rounded-[2rem] flex items-center justify-center">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300 px-6 py-3 bg-canvas-white text-earth-umber rounded-full font-medium text-sm tracking-wide"
          >
            Add to Ritual
          </motion.button>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-2">
        <span className="text-xs uppercase tracking-widest text-sage-leaf">{category}</span>
        <div className="flex justify-between items-baseline">
          <h3 className="font-instrument-serif text-2xl">{title}</h3>
          <span className="text-sm">{price}</span>
        </div>
      </div>
    </motion.div>
  );
}
