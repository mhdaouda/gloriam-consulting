'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import enMessages from '@/app/_translations/en.json';
import frMessages from '@/app/_translations/fr.json';
import { EXTERNAL_LINKS, HOME_COUNTRY_IDS, ZONE_GROUPS } from '@/app/_lib/externalLinks';
import { easeOut } from '@/app/_lib/motionPresets';

const INTRO_KEY = 'gloriam-intro-seen';
const AUTO_MS = 5000;

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
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    y: '-100%',
    transition: { delay: 0.15, duration: 0.95, ease: [0.76, 0, 0.24, 1] },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.35 },
  },
  exit: {
    opacity: 0,
    y: -32,
    scale: 0.96,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: '115%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: easeOut },
  },
};

const regionVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export function SiteIntro({ onComplete }: SiteIntroProps) {
  const { mounted, theme } = useTheme();
  const [locale, setLocale] = useState<'fr' | 'en'>('fr');
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [activeCountryId, setActiveCountryId] = useState<(typeof HOME_COUNTRY_IDS)[number]>(
    HOME_COUNTRY_IDS[0]
  );
  const [userInteracted, setUserInteracted] = useState(false);

  const copy = useMemo(() => {
    const m = locale === 'en' ? enMessages.intro : frMessages.intro;
    const about = locale === 'en' ? enMessages.about : frMessages.about;
    return { intro: m, about };
  }, [locale]);

  const countryLabels = useMemo(
    () =>
      Object.fromEntries(
        HOME_COUNTRY_IDS.map((id) => [
          id,
          (copy.about.coverage.countries as Record<string, string>)[id],
        ])
      ),
    [copy.about.coverage.countries]
  );

  const marqueeRow = useMemo(
    () => [...HOME_COUNTRY_IDS, ...HOME_COUNTRY_IDS].map((id) => countryLabels[id]),
    [countryLabels]
  );

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

  const highlightCountry = useCallback((id: (typeof HOME_COUNTRY_IDS)[number]) => {
    setUserInteracted(true);
    setActiveCountryId(id);
  }, []);

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

  useEffect(() => {
    if (!show || exiting || userInteracted) return;

    const interval = window.setInterval(() => {
      setActiveCountryId((prev) => {
        const idx = HOME_COUNTRY_IDS.indexOf(prev as (typeof HOME_COUNTRY_IDS)[number]);
        const next = HOME_COUNTRY_IDS[(idx + 1) % HOME_COUNTRY_IDS.length];
        return next;
      });
    }, 1600);

    return () => window.clearInterval(interval);
  }, [show, exiting, userInteracted]);

  if (!mounted) return null;

  const isDark = theme === 'dark';

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
          className={`intro-screen fixed inset-0 z-[200] flex flex-col overflow-hidden ${
            isDark ? 'intro-screen--dark' : 'intro-screen--light'
          }`}
          style={{ ['--intro-duration' as string]: `${AUTO_MS}ms` }}
          role="dialog"
          aria-label={copy.intro.skip}
        >
          {/* Ambient layers */}
          <div className="intro-vignette pointer-events-none absolute inset-0" aria-hidden />
          <motion.div
            className="intro-grid pointer-events-none absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: isDark ? 0.4 : 0.3, scale: 1 }}
            transition={{ duration: 1.4, ease: easeOut }}
            aria-hidden
          />
          <div className="intro-glow pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" aria-hidden />
          <div className="intro-beam pointer-events-none absolute inset-x-0 top-0" aria-hidden />
          <div className="intro-orb intro-orb--1 pointer-events-none absolute" aria-hidden />
          <div className="intro-orb intro-orb--2 pointer-events-none absolute" aria-hidden />

          {/* Top marquee — TurboTech style */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="intro-top-bar relative z-20 shrink-0 border-b border-emerald-500/15 py-3"
          >
            <div className="mask-fade-x overflow-hidden">
              <div className="animate-marquee-intro flex w-max gap-3 px-4">
                {marqueeRow.map((label, i) => (
                  <span key={`${label}-${i}`} className="intro-marquee-pill shrink-0">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main content + skip — flex column so the button never overlaps */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-6 sm:px-6">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate={exiting ? 'exit' : 'visible'}
                className="flex w-full max-w-4xl flex-col items-center text-center"
              >
              <motion.div variants={fadeUp} className="intro-logo-mark mb-6">
                <Image
                  src="/images/GClogo.svg"
                  alt=""
                  width={52}
                  height={52}
                  className="intro-logo-img"
                  priority
                />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="font-label mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-accent sm:text-xs"
              >
                <span className="inline-flex items-center gap-2.5">
                  <span className="intro-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  {copy.intro.badge}
                </span>
              </motion.p>

              <motion.h1 className="font-display text-5xl font-semibold leading-none sm:text-6xl md:text-7xl">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={lineReveal}
                    className="font-label block text-4xl font-bold uppercase tracking-[0.22em] text-theme sm:text-5xl md:text-6xl"
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
                className="intro-divider mx-auto my-5 h-px w-28 sm:my-6 sm:w-32"
                aria-hidden
              />

              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-sm leading-relaxed text-theme-muted sm:text-base md:text-lg"
              >
                {copy.intro.tagline}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-label mt-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent"
              >
                {copy.intro.zones}
                <span className="mx-2 opacity-40">·</span>
                {copy.intro.regionsSummary}
              </motion.p>

              {/* Regions grid — interactive countries */}
              <motion.div
                variants={fadeUp}
                className="intro-regions mt-6 grid w-full max-w-2xl gap-4"
              >
                {ZONE_GROUPS.map((group) => (
                  <motion.div
                    key={group.key}
                    variants={regionVariants}
                    className="intro-region rounded-2xl p-4 sm:p-5"
                  >
                    <p className="font-label mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                      {copy.intro.regions[group.key]}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                      {group.ids.map((id) => (
                        <button
                          key={id}
                          type="button"
                          onMouseEnter={() => highlightCountry(id)}
                          onFocus={() => highlightCountry(id)}
                          onClick={() => highlightCountry(id)}
                          className={`intro-country turbo-pill text-xs ${
                            activeCountryId === id ? 'intro-country--active' : ''
                          }`}
                        >
                          {countryLabels[id]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-xs text-theme-muted sm:mt-6"
              >
                {copy.intro.zonesHint}
              </motion.p>
              </motion.div>
            </div>

            <div className="relative z-30 flex shrink-0 justify-center px-4 pb-5 pt-2 sm:pb-6">
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: exiting ? 0 : 1, y: exiting ? 16 : 0 }}
                transition={{ delay: exiting ? 0 : 1.2, duration: 0.6, ease: easeOut }}
                onClick={dismiss}
                className="intro-skip intro-skip--pulse"
              >
                {copy.intro.skip}
              </motion.button>
            </div>
          </div>

          {/* Corners */}
          <div className="intro-corner intro-corner--tl pointer-events-none absolute left-4 top-16 sm:left-6 sm:top-[4.5rem]" aria-hidden />
          <div className="intro-corner intro-corner--tr pointer-events-none absolute right-4 top-16 sm:right-6 sm:top-[4.5rem]" aria-hidden />
          <div className="intro-corner intro-corner--bl pointer-events-none absolute bottom-24 left-4 sm:left-6 sm:bottom-28" aria-hidden />
          <div className="intro-corner intro-corner--br pointer-events-none absolute bottom-24 right-4 sm:right-6 sm:bottom-28" aria-hidden />

          <div className="intro-progress absolute inset-x-0 bottom-0 z-30 h-[3px] bg-accent/15" aria-hidden>
            <div className="intro-progress-fill h-full bg-accent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
