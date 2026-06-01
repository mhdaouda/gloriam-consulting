'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, scaleIn, slideInLeft, slideInRight } from '@/app/_lib/motionPresets';

type RevealVariant = 'fadeUp' | 'scale' | 'slideLeft' | 'slideRight';

const variantMap = {
  fadeUp: fadeInUp,
  scale: scaleIn,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
};

export function Reveal({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
}: RevealProps) {
  const preset = variantMap[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: preset.hidden,
        visible: {
          ...preset.visible,
          transition: {
            ...(preset.visible as { transition?: object }).transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
