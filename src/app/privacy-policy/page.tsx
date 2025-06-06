'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaDatabase, FaUserLock, FaCookie } from 'react-icons/fa';
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

export default function PrivacyPolicy() {
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
            {t(locale, 'privacy.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t(locale, 'privacy.description')}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            {t(locale, 'privacy.lastUpdated')}: 2024-01-01
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'privacy.content.intro')}
              </h2>
            </div>
            <div className="pl-16 prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                {t(locale, 'privacy.content.intro')}
              </p>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaDatabase className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'privacy.content.collection')}
              </h2>
            </div>
            <div className="pl-16 prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                Nous collectons les informations suivantes :
              </p>
              <ul className="list-disc pl-6 text-zinc-600">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Informations de navigation sur le site</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaUserLock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'privacy.content.protection')}
              </h2>
            </div>
            <div className="pl-16 prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                Nous prenons la protection de vos données personnelles très au sérieux. Voici les mesures que nous mettons en place :
              </p>
              <ul className="list-disc pl-6 text-zinc-600">
                <li>Chiffrement SSL</li>
                <li>Stockage sécurisé des données</li>
                <li>Accès limité aux informations personnelles</li>
                <li>Mise à jour régulière de nos systèmes de sécurité</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <FaCookie className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'privacy.content.cookies')}
              </h2>
            </div>
            <div className="pl-16 prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                Pour plus d'informations sur notre utilisation des cookies, veuillez consulter notre{' '}
                <a href="/cookies" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                  politique des cookies
                </a>
                .
              </p>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <FaUserLock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'privacy.content.rights')}
              </h2>
            </div>
            <div className="pl-16 prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                Vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 text-zinc-600">
                <li>Droit d'accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t(locale, 'privacy.content.contact')}
              </h2>
            </div>
            <div className="pl-16 prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :
              </p>
              <ul className="list-none pl-6 text-zinc-600">
                <li>Email : privacy@gloriam-consulting.com</li>
                <li>Téléphone : +33 6 XX XX XX XX</li>
                <li>Adresse : Paris, France</li>
              </ul>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 