'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import enMessages from '@/app/_translations/en.json';
import frMessages from '@/app/_translations/fr.json';
import { HOME_COUNTRY_IDS } from '@/app/_lib/externalLinks';
import { easeOut } from '@/app/_lib/motionPresets';

const INTRO_KEY = 'gloriam-intro-seen';
const AUTO_MS = 5200;

type SiteIntroProps = {
  onComplete: () => void;
};

function getLocaleFromPath(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr';
  return window.location.pathname.startsWith('/en') ? 'en' : 'fr';
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    y: '-100%',
    transition: { delay: 0.12, duration: 0.88, ease: [0.76, 0, 0.24, 1] },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    y: -28,
    scale: 0.97,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeOut },
  },
};

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
    const auto = window.setTimeout(dismiss, AUTO_MS);
    return () => window.clearTimeout(auto);
  }, [mounted, onComplete, dismiss]);

  if (!mounted) return null;

  const countries = HOME_COUNTRY_IDS.map((id) =>
    (copy.about.coverage.countries as Record<string, string>)[id]
  );
  const marqueeRow = [...countries, ...countries];

  const isDark = theme === 'dark';
  const regions =
    locale === 'fr' ? 'Afrique · Europe · Amérique' : 'Africa · Europe · Americas';

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="site-intro"
          variants={overlayVariants}
          initial="hidden"
          animate={exiting ? 'exit' : 'visible'}
          exit="exit"
          onAnimationComplete={(definition: string) => {
            if (definition === 'exit') finish();
          }}
          className={`intro-screen fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden px-4 ${
            isDark ? 'intro-screen--dark' : 'intro-screen--light'
          }`}
          style={{ ['--intro-duration' as string]: `${AUTO_MS}ms` }}
          role="dialog"
          aria-label={copy.intro.skip}
        >
          <motion.div
            className="intro-grid pointer-events-none absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: isDark ? 0.35 : 0.28, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOut }}
            aria-hidden
          />
          <div className="intro-glow pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2" aria-hidden />
          <div className="intro-beam pointer-events-none absolute inset-x-0 top-0" aria-hidden />
          <div className="intro-corner intro-corner--tl pointer-events-none absolute left-6 top-6" aria-hidden />
          <div className="intro-corner intro-corner--tr pointer-events-none absolute right-6 top-6" aria-hidden />
          <div className="intro-corner intro-corner--bl pointer-events-none absolute bottom-20 left-6" aria-hidden />
          <div className="intro-corner intro-corner--br pointer-events-none absolute bottom-20 right-6" aria-hidden />

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={exiting ? 'exit' : 'visible'}
            className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
          >
            <motion.p
              variants={fadeUp}
              className="font-label mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent"
            >
              <span className="inline-flex items-center gap-2">
                <span className="intro-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                {copy.intro.badge}
              </span>
            </motion.p>

            <motion.h1 className="font-display text-5xl font-semibold leading-none sm:text-6xl md:text-7xl">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  variants={lineReveal}
                  className="font-label block text-4xl font-bold uppercase tracking-[0.2em] text-theme sm:text-5xl"
                >
                  {copy.intro.brand}
                </motion.span>
              </span>
              <span className="mt-1 block overflow-hidden pb-2">
                <motion.span
                  variants={lineReveal}
                  className="intro-shimmer block bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent italic dark:from-emerald-300 dark:via-teal-200 dark:to-cyan-300"
                >
                  {copy.intro.brandAccent}
                </motion.span>
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="intro-divider mx-auto my-6 h-px w-24"
              aria-hidden
            />

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-base leading-relaxed text-theme-muted sm:text-lg"
            >
              {copy.intro.tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-label mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent"
            >
              {copy.intro.zones} · {regions}
            </motion.p>

            <motion.div variants={fadeUp} className="relative mt-5 w-full max-w-2xl overflow-hidden mask-fade-x">
              <div className="animate-marquee-intro flex w-max gap-2.5">
                {marqueeRow.map((label, i) => (
                  <span key={`${label}-${i}`} className="turbo-pill shrink-0 text-xs">
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? 12 : 0 }}
            transition={{ delay: exiting ? 0 : 1.05, duration: 0.55, ease: easeOut }}
            onClick={dismiss}
            className="intro-skip intro-skip--pulse absolute bottom-14 left-1/2 z-20 -translate-x-1/2"
          >
            {copy.intro.skip}
          </motion.button>

          <div className="intro-progress absolute inset-x-0 bottom-0 z-20 h-[3px] bg-accent/15" aria-hidden>
            <div className="intro-progress-fill h-full bg-accent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
