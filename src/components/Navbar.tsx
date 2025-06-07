'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

export function Navbar() {
  const { locale } = useLocaleContext();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Image
              src="/images/logoAgrandit.png"
              alt="Gloriam Consulting"
              width={40}
              height={40}
              className="w-auto h-8"
            />
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-zinc-800">Gloriam</span>
              <span className="text-2xl font-light text-zinc-600">Consulting</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}/services`} className="text-zinc-600 hover:text-zinc-900">
              {t(locale, 'navigation.services')}
            </Link>
            <Link href={`/${locale}/about`} className="text-zinc-600 hover:text-zinc-900">
              {t(locale, 'navigation.about')}
            </Link>
            <Link href={`/${locale}/trust`} className="text-zinc-600 hover:text-zinc-900">
              {t(locale, 'navigation.trust')}
            </Link>
            <Link href={`/${locale}/contact`} className="text-zinc-600 hover:text-zinc-900">
              {t(locale, 'navigation.contact')}
            </Link>
            <Link 
              href={locale === 'fr' ? '/en' : '/fr'} 
              className="text-zinc-600 hover:text-zinc-900 font-medium"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 