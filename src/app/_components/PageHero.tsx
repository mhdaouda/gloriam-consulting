'use client';

import { motion } from 'framer-motion';
import { fadeInUp, heroStagger, heroTitleLine } from '@/app/_lib/motionPresets';

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="dark-surface relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/60 py-20 dark:border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-50 dark:bg-hero-radial-dark dark:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40 dark:bg-grid-dark dark:opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-emerald-400/20 blur-[100px] dark:bg-emerald-500/25" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px] dark:bg-cyan-500/20" />
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="container relative z-[1] mx-auto px-4 text-center"
      >
        {eyebrow && (
          <motion.p
            variants={heroTitleLine}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          variants={heroTitleLine}
          className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:turbo-gradient-text"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}
