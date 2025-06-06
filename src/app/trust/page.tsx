'use client';

import { motion } from 'framer-motion';
import { FaStar, FaCheck, FaHeart } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Trust() {
  const { locale } = useLocaleContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl text-zinc-800">
            {t(locale, 'trust.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t(locale, 'trust.description')}
          </p>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-zinc-800">
              {t(locale, 'trust.partners.title')}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Placeholder pour les logos des partenaires */}
              <div className="aspect-video rounded-lg bg-white p-4 shadow-lg flex items-center justify-center">
                <div className="text-zinc-300 text-lg">Logo Partenaire</div>
              </div>
              <div className="aspect-video rounded-lg bg-white p-4 shadow-lg flex items-center justify-center">
                <div className="text-zinc-300 text-lg">Logo Partenaire</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-zinc-800">
              {t(locale, 'trust.clients.title')}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Placeholder pour les logos des clients */}
              <div className="aspect-video rounded-lg bg-white p-4 shadow-lg flex items-center justify-center">
                <div className="text-zinc-300 text-lg">Logo Client</div>
              </div>
              <div className="aspect-video rounded-lg bg-white p-4 shadow-lg flex items-center justify-center">
                <div className="text-zinc-300 text-lg">Logo Client</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            variants={fadeInUp}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200"
          >
            <div className="mb-6 text-4xl text-indigo-500 transition-colors duration-300 group-hover:text-purple-600">
              <FaStar className="w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
              {t(locale, 'trust.stats.experience')}
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              {t(locale, 'trust.stats.experienceDesc')}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200"
          >
            <div className="mb-6 text-4xl text-indigo-500 transition-colors duration-300 group-hover:text-purple-600">
              <FaCheck className="w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
              {t(locale, 'trust.stats.projects')}
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              {t(locale, 'trust.stats.projectsDesc')}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200"
          >
            <div className="mb-6 text-4xl text-indigo-500 transition-colors duration-300 group-hover:text-purple-600">
              <FaHeart className="w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
              {t(locale, 'trust.stats.satisfaction')}
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              {t(locale, 'trust.stats.satisfactionDesc')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 