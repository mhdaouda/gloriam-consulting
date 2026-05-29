'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight,
  FaChartBar,
  FaExternalLinkAlt,
  FaGlobe,
  FaGraduationCap,
  FaHandshake,
  FaLightbulb,
  FaRocket,
  FaUserTie,
} from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { CountryMarquee } from '@/app/_components/CountryMarquee';
import { EXTERNAL_LINKS } from '@/app/_lib/externalLinks';
import {
  fadeInUp,
  heroItem,
  heroStagger,
  scaleIn,
  slideInLeft,
  slideInRight,
  stagger,
} from '@/app/_lib/motionPresets';

const featureCard =
  'theme-card group relative overflow-hidden rounded-2xl p-8 duration-500 hover:-translate-y-2';

const iconWrap =
  'mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 text-emerald-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:from-emerald-500/25 dark:to-cyan-500/15 dark:text-emerald-400';

function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="theme-card rounded-2xl p-6 text-center"
    >
      <p className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

export default function HomeLanding() {
  const { locale } = useLocaleContext();
  const t = useTranslations('home');
  const tAbout = useTranslations('about');
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0.3]);

  const base = `/${locale}`;

  const ecosystem = [
    {
      key: 'turbotech',
      href: EXTERNAL_LINKS.turbotech,
      icon: FaRocket,
      gradient: 'from-violet-500/20 to-fuchsia-500/10',
      accent: 'text-violet-400',
    },
    {
      key: 'flashcoder',
      href: EXTERNAL_LINKS.flashcoder,
      icon: FaGraduationCap,
      gradient: 'from-amber-500/20 to-orange-500/10',
      accent: 'text-amber-400',
    },
    {
      key: 'portfolio',
      href: EXTERNAL_LINKS.portfolio,
      icon: FaUserTie,
      gradient: 'from-cyan-500/20 to-emerald-500/10',
      accent: 'text-cyan-400',
    },
  ] as const;

  const zoneGroups = [
    { key: 'africa', ids: ['benin', 'togo', 'gabon', 'nigeria'] as const },
    { key: 'europe', ids: ['france', 'belgium', 'switzerland'] as const },
    { key: 'america', ids: ['canada'] as const },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden dark:bg-transparent">
      {/* Hero */}
      <section className="dark-surface relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-gradient-to-br from-emerald-50/90 via-white to-cyan-50/70 px-4 pb-16 pt-8 text-slate-900 dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-60 dark:bg-hero-radial-dark dark:opacity-100" />
        <div className="animate-float-slow pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-emerald-400/25 blur-[120px] dark:bg-emerald-500/30" />
        <div className="animate-float-delayed pointer-events-none absolute -right-32 bottom-10 h-[400px] w-[400px] rounded-full bg-cyan-400/20 blur-[100px] dark:bg-cyan-500/25" />
        <div className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-400/15 blur-[80px] dark:bg-teal-400/20" />
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40 dark:bg-grid-dark dark:opacity-60" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-10 mx-auto max-w-5xl"
        >
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroItem} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.14)] dark:bg-emerald-400" />
                {t('badge')}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{t('zonesHint')}</span>
            </motion.div>

            <motion.div variants={heroItem} className="space-y-2">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block text-slate-900 dark:turbo-gradient-text">
                  {t('titleLine1')}
                </span>
                <span className="mt-2 block text-emerald-700 dark:turbo-gradient-text-accent">
                  {t('titleLine2')}
                </span>
              </h1>
            </motion.div>

            <motion.p variants={heroItem} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                Gloriam Consulting
              </strong>{' '}
              {t('description')}
            </motion.p>

            <motion.div variants={heroItem} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`${base}/contact`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-glow transition hover:scale-[1.02] hover:from-emerald-400 hover:to-cyan-400 dark:shadow-[0_0_40px_-8px_rgba(16,185,129,0.6)]"
              >
                {t('ctaStart')}
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`${base}/services`}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-8 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition hover:border-emerald-400/50 hover:bg-emerald-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:backdrop-blur-md dark:hover:border-emerald-400/50 dark:hover:bg-emerald-500/10"
              >
                {t('ctaServices')}
              </Link>
            </motion.div>

            <motion.p
              variants={heroItem}
              className="mt-8 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/90"
            >
              {t('zonesLabel')}
            </motion.p>
            <motion.div variants={heroItem}>
              <CountryMarquee />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-white/80 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent" />
      </section>

      {/* Stats */}
      <section className="relative border-y border-slate-200 bg-slate-100 py-14 dark:turbo-section-divider dark:bg-transparent">
        <div className="pointer-events-none absolute inset-0 hidden bg-grid-dark opacity-30 dark:block" />
        <div className="container relative z-[1] mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-6">
          <StatCard value="2023" label={t('stats.founded')} delay={0} />
          <StatCard value="8" label={t('stats.countries')} delay={0.08} />
          <StatCard value="100%" label={t('stats.projects')} delay={0.16} />
          <StatCard value="3" label={t('stats.ecosystem')} delay={0.24} />
        </div>
      </section>

      {/* Features */}
      <section className="relative border-t border-slate-200 bg-slate-50 py-24 dark:turbo-section-divider dark:bg-transparent md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60 dark:bg-grid-dark dark:opacity-40" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="container relative z-[1] mx-auto px-4"
        >
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              {t('features.eyebrow')}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              {t('features.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: FaLightbulb,
                title: t('features.innovation.title'),
                desc: t('features.innovation.description'),
                href: `${base}/services`,
                link: t('features.seeInnovations'),
              },
              {
                icon: FaChartBar,
                title: t('features.excellence.title'),
                desc: t('features.excellence.description'),
                href: `${base}/about`,
                link: t('features.learnMore'),
              },
              {
                icon: FaHandshake,
                title: t('features.partnership.title'),
                desc: t('features.partnership.description'),
                href: `${base}/trust`,
                link: t('features.discoverPartners'),
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className={featureCard}
              >
                <div className={iconWrap}>
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">{card.desc}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {card.link}
                  <FaArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Zones */}
      <section className="dark-surface relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white to-slate-100 py-24 text-slate-900 dark:turbo-section-divider dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-30 dark:bg-grid-dark dark:opacity-45" />
        <div className="pointer-events-none absolute -left-32 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px] dark:block" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="container relative z-[1] mx-auto px-4"
        >
          <motion.div variants={fadeInUp} className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              {t('zones.eyebrow')}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">{t('zones.title')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">{t('zones.subtitle')}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {zoneGroups.map((group, gi) => (
              <motion.div
                key={group.key}
                variants={gi === 1 ? slideInLeft : gi === 2 ? slideInRight : fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="theme-card rounded-2xl p-6 transition hover:-translate-y-0.5"
              >
                <div className="mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <FaGlobe className="h-5 w-5" />
                  <h3 className="font-semibold">{t(`zones.${group.key}`)}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.ids.map((id) => (
                    <li
                      key={id}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                    >
                      {tAbout(`coverage.countries.${id}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-10 text-center">
            <Link
              href={`${base}/about`}
              className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-500/15 dark:border-emerald-400/40 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
            >
              {t('zones.cta')}
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Écosystème */}
      <section className="relative border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-24 dark:turbo-section-divider dark:bg-transparent md:py-28">
        <div className="pointer-events-none absolute inset-0 hidden bg-grid-dark opacity-35 dark:block" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="container mx-auto px-4"
        >
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              {t('ecosystem.eyebrow')}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              {t('ecosystem.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {t('ecosystem.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {ecosystem.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="theme-card group relative flex flex-col overflow-hidden rounded-2xl p-8 transition-shadow hover:shadow-glow"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}
                >
                  <item.icon className={`h-7 w-7 ${item.accent}`} />
                </div>
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  {t(`ecosystem.${item.key}.label`)}
                </span>
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {t(`ecosystem.${item.key}.title`)}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t(`ecosystem.${item.key}.description`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:gap-3 dark:text-emerald-400">
                  {t('ecosystem.visitSite')}
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </span>
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="dark-surface relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 py-20 text-white dark:turbo-section-divider">
        <div className="pointer-events-none absolute inset-0 hidden bg-grid-dark opacity-40 dark:block" />
        <div className="pointer-events-none absolute inset-0 hidden dark:block dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(16,185,129,0.18),transparent_70%)]" />
        <div className="animate-float-slow pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-[90px] dark:bg-emerald-500/25" />
        <div className="pointer-events-none absolute -left-20 bottom-0 hidden h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px] dark:block" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="container relative z-[1] mx-auto px-4 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl dark:bg-gradient-to-r dark:from-white dark:via-emerald-100 dark:to-cyan-200 dark:bg-clip-text dark:text-transparent">
            {t('ctaBanner.title')}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-emerald-50 dark:text-slate-400">
            {t('ctaBanner.subtitle')}
          </p>
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-glow transition hover:scale-[1.03]"
          >
            {t('ctaBanner.button')}
            <FaArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
