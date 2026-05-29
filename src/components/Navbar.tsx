'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { ThemeToggle } from '@/components/ThemeToggle';

const navKeys = [
  { href: '', key: 'home' as const },
  { href: '/services', key: 'services' as const },
  { href: '/about', key: 'about' as const },
  { href: '/projects', key: 'projects' as const },
  { href: '/trust', key: 'trust' as const },
] as const;

export function Navbar() {
  const { locale } = useLocaleContext();
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const base = `/${locale}`;

  const normalizePath = (p: string) => {
    const trimmed = p.replace(/\/$/, '');
    return trimmed || '/';
  };

  const isActive = (pathSuffix: string) => {
    const href = pathSuffix ? `${base}${pathSuffix}` : base;
    const pn = normalizePath(pathname);
    const h = normalizePath(href);
    if (!pathSuffix) return pn === h;
    return pn === h || pn.startsWith(`${h}/`);
  };

  const shellClass = scrolled
    ? 'border-slate-200/80 bg-white/95 shadow-md shadow-slate-200/40 dark:border-white/10 dark:bg-slate-950/95 dark:shadow-lg dark:shadow-black/30'
    : 'border-slate-200/60 bg-white/90 dark:border-white/10 dark:bg-slate-950/85';

  const linkActive =
    'bg-emerald-50 text-emerald-800 dark:bg-white/10 dark:text-white';
  const linkIdle =
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white';

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${shellClass}`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link
            href={base}
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-emerald-50 ring-1 ring-emerald-100 dark:bg-white/10 dark:ring-white/10">
              <Image
                src="/images/logoAgrandit.png"
                alt="Gloriam Consulting"
                width={36}
                height={36}
                className="h-7 w-auto object-contain"
              />
            </span>
            <div className="flex items-baseline gap-0">
              <span className="text-lg font-bold tracking-tight text-slate-900 md:text-xl dark:text-white">
                Gloriam
              </span>
              <span className="text-lg font-light tracking-tight text-emerald-600 md:text-xl dark:text-emerald-200/90">
                Consulting
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:gap-2">
            {navKeys.map(({ href, key }) => (
              <Link
                key={key}
                href={href ? `${base}${href}` : base}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive(href) ? linkActive : linkIdle
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link
              href={locale === 'fr' ? '/en' : '/fr'}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:scale-105 hover:from-emerald-400 hover:to-cyan-400"
            >
              {t('contact')}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 dark:text-white"
              aria-expanded={open}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-slate-200 py-4 dark:border-white/10 md:hidden">
            <div className="flex flex-col gap-1">
              {navKeys.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href ? `${base}${href}` : base}
                  className={`rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(href) ? linkActive : linkIdle
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                className="mt-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-center text-sm font-semibold text-slate-950"
                onClick={() => setOpen(false)}
              >
                {t('contact')}
              </Link>
              <Link
                href={locale === 'fr' ? '/en' : '/fr'}
                className="py-2 text-center text-sm font-semibold text-slate-500 dark:text-slate-400"
                onClick={() => setOpen(false)}
              >
                {locale === 'fr' ? 'English' : 'Français'}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
}
