'use client';

import { useTranslations } from '../../_hooks/useTranslations';
import { motion } from 'framer-motion';
import { FaCookie, FaShieldAlt, FaCog, FaQuestionCircle } from 'react-icons/fa';

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
  hidden: { y: 20, opacity: 0 },
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

export default function CookiesPage() {
  const t = useTranslations('cookies');

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800">
            {t('title')}
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <FaQuestionCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('intro.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t('intro.description')}
            </p>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaCookie className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('types.title')}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3 pl-16">
              <div className="rounded-lg bg-gradient-to-br from-zinc-50 to-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-3">
                  {t('types.necessary.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.necessary.description')}
                </p>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-zinc-50 to-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-3">
                  {t('types.analytics.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.analytics.description')}
                </p>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-zinc-50 to-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-3">
                  {t('types.preferences.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.preferences.description')}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaCog className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('control.title')}
              </h2>
            </div>
            <div className="space-y-6 pl-16">
              <p className="text-zinc-600 leading-relaxed">
                {t('control.description')}
              </p>
              <div className="rounded-lg bg-gradient-to-br from-zinc-50 to-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-3">
                  {t('control.browser.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('control.browser.description')}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-6">
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