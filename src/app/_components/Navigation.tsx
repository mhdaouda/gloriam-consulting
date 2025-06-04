'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  const currentPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fonction pour obtenir le chemin dans l'autre langue
  const getOtherLocaleHref = () => {
    const otherLocale = locale === 'fr' ? 'en' : 'fr';
    const segments = currentPath.split('/');
    segments[1] = otherLocale;
    return segments.join('/');
  };

  const navigationLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/trust`, label: t('trust') },
    { href: `/${locale}/contact`, label: t('contact') },
    { href: getOtherLocaleHref(), label: locale === 'fr' ? 'EN' : 'FR' }
  ];

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <motion.div variants={logoVariants}>
            <Link href={`/${locale}`} className="flex items-center group">
              <Image
                src="/gloriam-consulting/images/GClogo.png"
                alt="Gloriam Consulting Logo"
                width={160}
                height={160}
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className="ml-4 text-2xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-600">
                Gloriam Consulting
              </span>
            </Link>
          </motion.div>

          <div className="hidden space-x-4 md:flex">
            {navigationLinks.map((item, index) => (
              <motion.div
                key={item.href}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative rounded-md px-3 py-2 text-zinc-700 transition-colors duration-300 hover:text-zinc-900 group"
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-zinc-800 transition-all duration-300 group-hover:w-full"
                    layoutId="underline"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Menu mobile */}
          <motion.div 
            className="md:hidden"
            variants={navItemVariants}
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-zinc-700 hover:text-zinc-900 transition-colors duration-300"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Menu mobile déroulant */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-1 pb-3 pt-2">
                {navigationLinks.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={navItemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 