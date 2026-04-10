'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  category: string;
  price: string;
  description: string;
  imageSrc: string;
  delay?: number;
}

export function ProductCard({ title, category, price, description, imageSrc, delay = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-6"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-stone-100">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Hover Info Overlay */}
        <div className="absolute inset-0 bg-[#2C2C24]/0 group-hover:bg-[#2C2C24]/10 transition-colors duration-700 rounded-[2.5rem]"></div>
        
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-white text-[#2C2C24] rounded-full font-bold text-xs tracking-widest uppercase shadow-2xl"
          >
            Add to Ritual
          </motion.button>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 px-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-sage-leaf font-bold">{category}</span>
            <h3 className="font-instrument-serif text-2xl lg:text-3xl text-earth-umber leading-none">{title}</h3>
          </div>
          <span className="font-outfit font-semibold text-lg text-saffron-amber">{price}</span>
        </div>
        <p className="text-earth-umber/60 text-sm leading-relaxed line-clamp-2 font-outfit">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
