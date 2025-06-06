'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaCheck, FaHeart } from 'react-icons/fa';
import { images } from '../../_lib/images';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl text-zinc-800">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="flex items-center justify-center group">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-200 to-purple-200 transform rotate-6 scale-105 opacity-20 group-hover:rotate-4 transition-transform duration-300"></div>
              <Image
                src={images.other.gcLogo}
                alt="Gloriam Consulting Logo"
                width={300}
                height={300}
                className="mx-auto h-auto w-64 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="group">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors duration-300">
                Notre Mission
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Créer en 2023 Gloriam Consulting a pour but d&apos;accompagner les entreprises dans leur transformation et leur croissance en leur fournissant des solutions innovantes et sur mesure.
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-400 to-purple-600 group-hover:w-full transition-all duration-500"></div>
            </div>

            <div className="group">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors duration-300">
                Notre Vision
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Devenir le partenaire de référence en conseil d&apos;entreprise, reconnu pour notre expertise et notre approche personnalisée.
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-purple-400 to-indigo-600 group-hover:w-full transition-all duration-500"></div>
            </div>

            <div className="group">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors duration-300">
                Nos Valeurs
              </h2>
              <ul className="grid grid-cols-2 gap-4 text-zinc-600">
                {[
                  'Excellence et professionnalisme',
                  'Innovation et adaptabilité',
                  'Intégrité et transparence',
                  'Engagement et proximité client'
                ].map((value, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 group"
                  >
                    <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors duration-300">•</span>
                    <span className="leading-relaxed">{value}</span>
                  </li>
                ))}
              </ul>
              <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-400 to-purple-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </div>

        <div className="mt-24 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-white p-12 shadow-lg">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-800">
            Notre Expertise
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FaStar,
                title: "+1 ans d'expérience",
                description: "Une année riche en expertise au service de nos clients"
              },
              {
                icon: FaCheck,
                title: "100% des projets réussis",
                description: "Des solutions concrètes pour des résultats tangibles"
              },
              {
                icon: FaHeart,
                title: "Satisfaction client prioritaire",
                description: "Une relation de confiance durable avec nos clients"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200"
              >
                <div className="mb-6 text-4xl text-indigo-500 transition-colors duration-300 group-hover:text-purple-600">
                  <stat.icon className="w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                  {stat.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 