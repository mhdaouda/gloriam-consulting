'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function PrivacyPolicy() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="prose prose-zinc mx-auto max-w-4xl"
        >
          <h1 className="mb-8 text-4xl font-bold">{t('title')}</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('intro.title')}</h2>
            <p>{t('intro.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('whatAreCookies.title')}</h2>
            <p>{t('whatAreCookies.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('howWeUse.title')}</h2>
            <p>{t('howWeUse.content')}</p>
            <ul className="list-disc pl-6">
              <li>{t('howWeUse.purposes.preferences')}</li>
              <li>{t('howWeUse.purposes.security')}</li>
              <li>{t('howWeUse.purposes.analytics')}</li>
              <li>{t('howWeUse.purposes.experience')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('types.title')}</h2>
            <h3 className="text-xl font-medium mt-4">{t('types.essential.title')}</h3>
            <p>{t('types.essential.content')}</p>

            <h3 className="text-xl font-medium mt-4">{t('types.analytics.title')}</h3>
            <p>{t('types.analytics.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('management.title')}</h2>
            <p>{t('management.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('contact.title')}</h2>
            <p>
              {t('contact.content')}{' '}
              <a href="mailto:contact@gloriam-consulting.com" className="text-blue-600 hover:text-blue-800">
                contact@gloriam-consulting.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">{t('updates.title')}</h2>
            <p>{t('updates.content')}</p>
            <p className="mt-4">
              {t('updates.lastUpdate')} {new Date().toLocaleDateString()}
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
} 