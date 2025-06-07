'use client';

import { motion } from 'framer-motion';
import { FaCookie, FaShieldAlt, FaCog } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

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

export default function Cookies() {
  const t = useTranslations('cookies');

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
          className="space-y-16"
        >
          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <FaCookie className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('intro.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t('intro.description')}
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('types.title')}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 pl-16">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('types.necessary.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.necessary.description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('types.analytics.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.analytics.description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('types.preferences.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.preferences.description')}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaCog className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('control.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-16">
              <p className="text-zinc-600 leading-relaxed">
                {t('control.description')}
              </p>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('control.browser.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('control.browser.description')}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('contact.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t('contact.description')}
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 