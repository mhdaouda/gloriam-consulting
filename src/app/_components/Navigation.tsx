'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/GClogo.png"
              alt="Gloriam Consulting Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="ml-2 text-xl font-semibold">Gloriam Consulting</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              {locale === 'fr' ? 'À propos' : 'About'}
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Contact
            </Link>
            <Link
              href="/"
              locale={locale === 'fr' ? 'en' : 'fr'}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 