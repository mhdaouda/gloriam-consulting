'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCookie, FaClipboardList, FaCogs, FaShieldAlt, FaUserCog, FaChartPie, FaChartBar } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function CookiesPage() {
  const { locale } = useLocaleContext();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <motion.div 
        className="container mx-auto px-4 py-24"
        style={{ opacity, scale }}
      >
        <motion.div 
          className="mb-20 text-center"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800">
            {t(locale, 'cookies.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t(locale, 'cookies.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* What are cookies section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-6 text-4xl">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <FaCookie size={32} />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                {t(locale, 'cookies.sections.what.title')}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {t(locale, 'cookies.sections.what.description')}
              </p>
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>

          {/* Usage section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-6 text-4xl">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <FaClipboardList size={32} />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                {t(locale, 'cookies.sections.usage.title')}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                {t(locale, 'cookies.sections.usage.description')}
              </p>
              <ul className="list-none space-y-2">
                {['cookies.sections.usage.purposes.0', 'cookies.sections.usage.purposes.1', 'cookies.sections.usage.purposes.2'].map((purposeKey) => (
                  <li key={purposeKey} className="text-zinc-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {t(locale, purposeKey)}
                  </li>
                ))}
              </ul>
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>

          {/* Types of cookies */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-6 text-4xl">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <FaChartPie size={32} />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                {t(locale, 'cookies.sections.types.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaShieldAlt className="text-green-500 mr-2" />
                  <div>
                    <h4 className="font-medium text-zinc-800">{t(locale, 'cookies.sections.types.essential.title')}</h4>
                    <p className="text-sm text-zinc-600">{t(locale, 'cookies.sections.types.essential.description')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCogs className="text-blue-500 mr-2" />
                  <div>
                    <h4 className="font-medium text-zinc-800">{t(locale, 'cookies.sections.types.preferences.title')}</h4>
                    <p className="text-sm text-zinc-600">{t(locale, 'cookies.sections.types.preferences.description')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaChartBar className="text-purple-500 mr-2" />
                  <div>
                    <h4 className="font-medium text-zinc-800">{t(locale, 'cookies.sections.types.analytics.title')}</h4>
                    <p className="text-sm text-zinc-600">{t(locale, 'cookies.sections.types.analytics.description')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>

          {/* Control section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
            className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-6 text-4xl">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-purple-400 to-violet-500 text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <FaUserCog size={32} />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                {t(locale, 'cookies.sections.control.title')}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-6">
                {t(locale, 'cookies.sections.control.description')}
              </p>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-violet-500 text-white rounded-lg font-medium hover:from-purple-500 hover:to-violet-600 transition-all duration-300 transform hover:scale-105">
                  {t(locale, 'cookies.sections.control.settings')}
                </button>
                <button className="w-full px-4 py-2 border border-zinc-200 text-zinc-700 rounded-lg font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300 transform hover:scale-105">
                  {t(locale, 'cookies.sections.control.browser')}
                </button>
              </div>
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-purple-400 to-violet-500 group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 