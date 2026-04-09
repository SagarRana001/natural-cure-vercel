'use client';

import { motion, Variants } from 'framer-motion';

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: keyof typeof animations;
  delay?: number;
  duration?: number;
  className?: string;
  as?: any;
}

export function AnimatedContainer({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className,
  as = motion.div,
}: AnimatedContainerProps) {
  const Component = as;
  return (
    <Component
      variants={animations[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration, 
        delay, 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
