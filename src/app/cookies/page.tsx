'use client';

import { motion } from 'framer-motion';
import { FaCookie, FaShieldAlt, FaCog } from 'react-icons/fa';
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

export default function Cookies() {
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
            {t(locale, 'cookies.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t(locale, 'cookies.description')}
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
                {t(locale, 'cookies.intro.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t(locale, 'cookies.intro.description')}
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'cookies.types.title')}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 pl-16">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t(locale, 'cookies.types.necessary.title')}
                </h3>
                <p className="text-zinc-600">
                  {t(locale, 'cookies.types.necessary.description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t(locale, 'cookies.types.analytics.title')}
                </h3>
                <p className="text-zinc-600">
                  {t(locale, 'cookies.types.analytics.description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t(locale, 'cookies.types.preferences.title')}
                </h3>
                <p className="text-zinc-600">
                  {t(locale, 'cookies.types.preferences.description')}
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
                {t(locale, 'cookies.control.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-16">
              <p className="text-zinc-600 leading-relaxed">
                {t(locale, 'cookies.control.description')}
              </p>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t(locale, 'cookies.control.browser.title')}
                </h3>
                <p className="text-zinc-600">
                  {t(locale, 'cookies.control.browser.description')}
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
                {t(locale, 'cookies.contact.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t(locale, 'cookies.contact.description')}
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 