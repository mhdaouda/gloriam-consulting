'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
  FaLightbulb,
  FaChartLine,
  FaDigitalTachograph,
  FaUsers,
  FaChartBar,
  FaBullseye,
  FaHandshake,
  FaRocket,
} from 'react-icons/fa';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { PageHero } from '@/app/_components/PageHero';
import { fadeInUp, scaleIn, stagger } from '@/app/_lib/motionPresets';

const serviceIcons: { Icon: IconType; color: string }[] = [
  { Icon: FaLightbulb, color: 'from-amber-400 to-orange-500' },
  { Icon: FaChartLine, color: 'from-emerald-400 to-teal-500' },
  { Icon: FaDigitalTachograph, color: 'from-blue-400 to-indigo-500' },
  { Icon: FaUsers, color: 'from-violet-400 to-purple-500' },
  { Icon: FaChartBar, color: 'from-rose-400 to-pink-500' },
  { Icon: FaBullseye, color: 'from-teal-400 to-cyan-500' },
  { Icon: FaHandshake, color: 'from-amber-400 to-orange-500' },
  { Icon: FaRocket, color: 'from-sky-400 to-blue-500' },
];

export default function ServicesContent() {
  const t = useTranslations('services');
  const services = t.raw('list') as { title: string; description: string }[];

  return (
    <div className="theme-page dark-surface min-h-screen">
      <PageHero title={t('title')} description={t('description')} eyebrow={t('eyebrow')} />

      <section className="theme-section theme-section-features py-16 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="container mx-auto grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service, index) => {
            const { Icon, color } = serviceIcons[index] ?? serviceIcons[0];
            return (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className="theme-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-glow"
              >
                <div
                  className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${color} p-3 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-theme">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-theme-muted">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
