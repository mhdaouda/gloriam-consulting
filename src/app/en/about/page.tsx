'use client';

import { useTranslations } from '../../_hooks/useTranslations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaCheck, FaHeart } from 'react-icons/fa';
import { images } from '../../_lib/images';
import OperationalMap from '../../_components/OperationalMap';
import { OPERATIONAL_LOCATIONS } from '../../_lib/operationalLocations';
import { Reveal } from '../../_components/Reveal';
import { stagger, fadeInUp } from '../../_lib/motionPresets';

interface Stat {
  title: string;
  description: string;
}

export default function About() {
  const t = useTranslations('about');

  const values = t.raw('values.list') as string[];
  const stats = t.raw('expertise.stats') as Stat[];

  return (
    <div className="theme-page dark-surface relative min-h-screen py-24">
      <div className="container relative z-10 mx-auto px-4">
        <Reveal className="mb-20 text-center">
          <p className="font-label mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Gloriam Consulting
          </p>
          <h1 className="font-display mb-6 text-5xl font-semibold text-theme sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-theme-muted">
            {t('description')}
          </p>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-2">
          <Reveal variant="slideLeft" className="flex items-center justify-center">
            <div className="group relative">
              <div className="absolute inset-0 rotate-6 scale-105 rounded-2xl bg-emerald-500/10 opacity-60 transition-transform duration-300 group-hover:rotate-4" />
              <Image
                src={images.other.gcLogo}
                alt="Gloriam Consulting Logo"
                width={300}
                height={300}
                className="relative mx-auto h-auto w-64 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col justify-center space-y-8"
          >
            {[
              { title: t('mission.title'), desc: t('mission.description') },
              { title: t('vision.title'), desc: t('vision.description') },
            ].map((block) => (
              <motion.div key={block.title} variants={fadeInUp} className="group theme-card rounded-2xl p-6">
                <h2 className="font-display mb-4 text-2xl font-semibold text-theme">{block.title}</h2>
                <p className="leading-relaxed text-theme-muted">{block.desc}</p>
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} className="group theme-card rounded-2xl p-6">
              <h2 className="font-display mb-4 text-2xl font-semibold text-theme">{t('values.title')}</h2>
              <ul className="grid grid-cols-2 gap-4 text-theme-muted">
                {values.map((value: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <Reveal className="theme-card mt-24 rounded-2xl p-8 md:p-12" delay={0.1}>
          <h2
            id="about-coverage-heading"
            className="font-display mb-3 text-center text-3xl font-semibold text-theme"
          >
            {t('coverage.title')}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-theme-muted">
            {t('coverage.description')}
          </p>
          <OperationalMap />
          <p className="font-label mb-3 mt-8 text-center text-sm font-semibold uppercase tracking-widest text-accent">
            {t('coverage.listTitle')}
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {OPERATIONAL_LOCATIONS.map((loc) => (
              <li key={loc.id} className="turbo-pill text-sm">
                {t(`coverage.countries.${loc.id}`)}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-24" delay={0.15}>
          <h2 className="font-display mb-12 text-center text-3xl font-semibold text-theme">
            {t('expertise.title')}
          </h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {stats.map((stat: Stat, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="theme-card group rounded-2xl p-8"
              >
                <div className="mb-6 text-4xl text-accent transition-transform duration-300 group-hover:scale-110">
                  {index === 0 && <FaStar className="h-12 w-12" />}
                  {index === 1 && <FaCheck className="h-12 w-12" />}
                  {index === 2 && <FaHeart className="h-12 w-12" />}
                </div>
                <h3 className="font-display mb-4 text-xl font-semibold text-theme">{stat.title}</h3>
                <p className="leading-relaxed text-theme-muted">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </div>
  );
}
