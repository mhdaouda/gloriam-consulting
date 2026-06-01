'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    ? 'theme-nav shadow-md shadow-slate-200/50 dark:shadow-lg dark:shadow-emerald-950/40'
    : 'theme-nav';

  const linkActive =
    'bg-[var(--surface-muted)] text-[var(--accent)] ring-1 ring-[var(--border)]';
  const linkIdle =
    'text-theme-muted hover:bg-[var(--surface-muted)] hover:text-theme';

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${shellClass}`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link
            href={base}
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[var(--surface-muted)] ring-1 ring-[var(--border)]">
              <Image
                src="/images/logoAgrandit.png"
                alt="Gloriam Consulting"
                width={36}
                height={36}
                className="h-7 w-auto object-contain"
              />
            </span>
            <div className="flex items-baseline gap-0">
              <span className="font-label text-lg font-bold uppercase tracking-[0.12em] text-theme md:text-xl">
                Gloriam
              </span>
              <span className="font-display text-lg font-semibold italic text-accent md:text-xl">
                Consulting
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex lg:gap-2">
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
              className="rounded-lg px-3 py-2 text-sm font-semibold text-theme-muted transition hover:text-theme"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:text-zinc-950"
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
    </header>
  );
}
