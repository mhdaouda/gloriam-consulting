'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaCookie, FaShieldAlt, FaChartBar, FaCog, FaGlobe, FaEnvelope } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
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

export default function CookiePolicy() {
  const t = useTranslations('cookies');

  const sections = [
    {
      icon: FaCookie,
      title: t('intro.title'),
      description: t('intro.description'),
      color: 'from-amber-400 to-orange-500'
    },
    {
      icon: FaShieldAlt,
      title: t('types.necessary.title'),
      description: t('types.necessary.description'),
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: FaChartBar,
      title: t('types.analytics.title'),
      description: t('types.analytics.description'),
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: FaCog,
      title: t('types.preferences.title'),
      description: t('types.preferences.description'),
      color: 'from-purple-400 to-violet-500'
    },
    {
      icon: FaGlobe,
      title: t('control.browser.title'),
      description: t('control.browser.description'),
      color: 'from-red-400 to-rose-500'
    },
    {
      icon: FaEnvelope,
      title: t('contact.title'),
      description: t('contact.description'),
      color: 'from-teal-400 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={fadeIn}
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
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${section.color} text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                    {section.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-6 h-0.5 w-0 bg-gradient-to-r group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-16 rounded-2xl bg-gradient-to-br from-zinc-100 to-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-3xl font-bold text-zinc-800">
            {t('control.title')}
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            {t('control.description')}
          </p>
        </motion.div>
      </div>
    </div>
  );
} 