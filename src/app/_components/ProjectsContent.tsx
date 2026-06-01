'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaBuilding,
  FaGasPump,
  FaShieldAlt,
  FaChartLine,
  FaCreditCard,
  FaCheckCircle,
  FaPills,
  FaArrowRight,
} from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { PageHero } from '@/app/_components/PageHero';
import { fadeInUp, scaleIn, stagger } from '@/app/_lib/motionPresets';

const projectIcons = [
  FaPills,
  FaBuilding,
  FaGasPump,
  FaShieldAlt,
  FaChartLine,
  FaCreditCard,
];

const gradientColors = [
  'from-violet-500 via-indigo-500 to-blue-500',
  'from-orange-500 via-amber-500 to-yellow-500',
  'from-rose-500 via-pink-500 to-red-500',
  'from-blue-500 via-indigo-500 to-violet-500',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-green-500 via-emerald-500 to-teal-500',
];

export default function ProjectsContent() {
  const { locale } = useLocaleContext();
  const t = useTranslations('projects');
  const projects = t.raw('projects') as Array<{
    title: string;
    client: string;
    description: string;
    details: string;
    technologies: string;
    image?: string;
  }>;

  return (
    <div className="theme-page dark-surface min-h-screen">
      <PageHero title={t('title')} description={t('description')} eyebrow={t('eyebrow')} />

      <section className="py-16 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="container mx-auto grid gap-8 px-4 lg:grid-cols-2"
        >
          {projects.map((project, index) => {
            const Icon = projectIcons[index] ?? FaBuilding;
            const gradient = gradientColors[index] ?? gradientColors[0];

            return (
              <motion.article
                key={index}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="theme-card group overflow-hidden rounded-3xl transition-shadow hover:shadow-glow"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 dark:opacity-40`}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="text-8xl text-white/60" />
                      </div>
                    </>
                  )}
                </div>

                <div className="p-8">
                  <div
                    className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-sm font-semibold text-white shadow-md`}
                  >
                    <Icon className="text-sm" />
                    {project.client}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {project.title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {project.details}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(' • ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-emerald-100 hover:text-emerald-800 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-200"
                      >
                        <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto mt-16 px-4"
        >
          <div className="dark-surface theme-section-cta mx-auto max-w-2xl rounded-2xl p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold text-white dark:text-theme">{t('cta.title')}</h3>
            <p className="mb-6 text-emerald-50 dark:text-theme-muted">{t('cta.description')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-[var(--accent)] transition hover:opacity-90 dark:bg-[var(--accent)] dark:text-zinc-950"
            >
              {t('cta.button')}
              <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
