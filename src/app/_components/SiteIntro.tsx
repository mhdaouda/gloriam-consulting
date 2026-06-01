'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import enMessages from '@/app/_translations/en.json';
import frMessages from '@/app/_translations/fr.json';
import { HOME_COUNTRY_IDS } from '@/app/_lib/externalLinks';

const INTRO_KEY = 'gloriam-intro-seen';

type SiteIntroProps = {
  onComplete: () => void;
};

function getLocaleFromPath(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr';
  return window.location.pathname.startsWith('/en') ? 'en' : 'fr';
}

export function SiteIntro({ onComplete }: SiteIntroProps) {
  const { mounted, theme } = useTheme();
  const [locale, setLocale] = useState<'fr' | 'en'>('fr');
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  const copy = useMemo(() => {
    const m = locale === 'en' ? enMessages.intro : frMessages.intro;
    const about = locale === 'en' ? enMessages.about : frMessages.about;
    return { intro: m, about };
  }, [locale]);

  const finish = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, '1');
    document.body.style.overflow = '';
    setShow(false);
    onComplete();
  }, [onComplete]);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
  }, [exiting]);

  useEffect(() => {
    if (!mounted) return;
    setLocale(getLocaleFromPath());
    try {
      if (sessionStorage.getItem(INTRO_KEY)) {
        onComplete();
        return;
      }
    } catch {
      onComplete();
      return;
    }
    setShow(true);
    document.body.style.overflow = 'hidden';
    const auto = window.setTimeout(dismiss, 4800);
    return () => window.clearTimeout(auto);
  }, [mounted, onComplete, dismiss]);

  if (!mounted || !show) return null;

  const countries = HOME_COUNTRY_IDS.map((id) =>
    (copy.about.coverage.countries as Record<string, string>)[id]
  );

  const isDark = theme === 'dark';
  const regions =
    locale === 'fr' ? 'Afrique · Europe · Amérique' : 'Africa · Europe · Americas';

  return (
    <motion.div
      key="site-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.04 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (exiting) finish();
      }}
      className={`intro-screen fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden px-4 ${
        isDark ? 'intro-screen--dark' : 'intro-screen--light'
      }`}
      role="dialog"
      aria-label={copy.intro.skip}
    >
      <div className="intro-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="intro-scan pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-label mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-accent"
        >
          {copy.intro.badge}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.75 }}
          className="font-display text-5xl font-semibold leading-none sm:text-6xl md:text-7xl"
        >
          <span className="font-label block text-4xl font-bold uppercase tracking-[0.2em] text-theme sm:text-5xl">
            {copy.intro.brand}
          </span>
          <span className="mt-1 block bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent italic dark:from-emerald-300 dark:via-teal-200 dark:to-cyan-300">
            {copy.intro.brandAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.65 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-theme-muted sm:text-lg"
        >
          {copy.intro.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-label mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent"
        >
          {copy.intro.zones} · {regions}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.55 }}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {countries.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.35 }}
              className="turbo-pill text-xs"
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        onClick={dismiss}
        className="intro-skip absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        {copy.intro.skip}
      </motion.button>
    </motion.div>
  );
}
