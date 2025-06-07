'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaLightbulb, 
  FaChartBar, 
  FaHandshake 
} from 'react-icons/fa';
import { images } from '../_lib/images';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';
import Link from 'next/link';

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

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  const { locale } = useLocaleContext();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Parallax effect */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-200 via-zinc-100 to-white px-4 text-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ y, opacity }}
          className="relative z-10 container mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
          >
            {t(locale, 'home.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 text-2xl font-light sm:text-3xl text-zinc-700"
          >
            {t(locale, 'home.subtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg text-zinc-600"
          >
            {t(locale, 'home.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10"
          >
            <a
              href="#features"
              className="rounded-full bg-zinc-700 px-8 py-3 text-white font-semibold transition-all hover:bg-zinc-600 hover:shadow-xl border border-zinc-600 hover:scale-105"
            >
              {t(locale, 'home.learnMore')}
            </a>
          </motion.div>
        </motion.div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${images.other.pattern.src})`,
              backgroundSize: '200px',
              backgroundRepeat: 'repeat',
              opacity: 0.3
            }}
          />
        </div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section with staggered animation */}
      <section id="features" className="py-24 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-zinc-800 mb-4">{t(locale, 'home.features.title')}</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              {t(locale, 'home.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 - Innovation */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group"
            >
              <FaLightbulb className="w-12 h-12 mb-6 text-blue-600" />
              <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t(locale, 'home.features.innovation.title')}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {t(locale, 'home.features.innovation.description')}
              </p>
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-400 to-indigo-600 group-hover:w-full transition-all duration-500"></div>
            </motion.div>

            {/* Feature 2 - Excellence */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group"
            >
              <FaChartBar className="w-12 h-12 mb-6 text-purple-600" />
              <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                {t(locale, 'home.features.excellence.title')}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                {t(locale, 'home.features.excellence.description')}
              </p>
              <Link 
                href="/en/about"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
              >
                Learn more
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-purple-400 to-fuchsia-600 group-hover:w-full transition-all duration-500"></div>
            </motion.div>

            {/* Feature 3 - Partnership */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 group"
            >
              <FaHandshake className="w-12 h-12 mb-6 text-emerald-600" />
              <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t(locale, 'home.features.partnership.title')}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                {t(locale, 'home.features.partnership.description')}
              </p>
              <Link 
                href="/en/trust"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
              >
                Discover our partners
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-emerald-400 to-teal-600 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 