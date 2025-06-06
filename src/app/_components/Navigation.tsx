'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

export default function Navigation() {
  const { locale } = useLocaleContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-zinc-800">Gloriam</span>
            <span className="text-2xl font-light text-zinc-600">Consulting</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}/services`}
              className={`text-zinc-600 hover:text-zinc-900 ${
                pathname === `/${locale}/services` ? 'font-semibold' : ''
              }`}
            >
              {t(locale, 'nav.services')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`text-zinc-600 hover:text-zinc-900 ${
                pathname === `/${locale}/about` ? 'font-semibold' : ''
              }`}
            >
              {t(locale, 'nav.about')}
            </Link>
            <Link
              href={`/${locale}/trust`}
              className={`text-zinc-600 hover:text-zinc-900 ${
                pathname === `/${locale}/trust` ? 'font-semibold' : ''
              }`}
            >
              {t(locale, 'nav.trust')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`text-zinc-600 hover:text-zinc-900 ${
                pathname === `/${locale}/contact` ? 'font-semibold' : ''
              }`}
            >
              {t(locale, 'nav.contact')}
            </Link>
            <Link
              href={locale === 'fr' ? '/en' : '/fr'}
              className="text-zinc-600 hover:text-zinc-900 font-medium"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-zinc-600 hover:text-zinc-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${locale}/services`}
                className={`text-zinc-600 hover:text-zinc-900 ${
                  pathname === `/${locale}/services` ? 'font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                {t(locale, 'nav.services')}
              </Link>
              <Link
                href={`/${locale}/about`}
                className={`text-zinc-600 hover:text-zinc-900 ${
                  pathname === `/${locale}/about` ? 'font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                {t(locale, 'nav.about')}
              </Link>
              <Link
                href={`/${locale}/trust`}
                className={`text-zinc-600 hover:text-zinc-900 ${
                  pathname === `/${locale}/trust` ? 'font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                {t(locale, 'nav.trust')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className={`text-zinc-600 hover:text-zinc-900 ${
                  pathname === `/${locale}/contact` ? 'font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                {t(locale, 'nav.contact')}
              </Link>
              <Link
                href={locale === 'fr' ? '/en' : '/fr'}
                className="text-zinc-600 hover:text-zinc-900 font-medium"
                onClick={toggleMenu}
              >
                {locale === 'fr' ? 'EN' : 'FR'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 