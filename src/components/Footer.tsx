'use client';

import Link from 'next/link';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

export function Footer() {
  const { locale } = useLocaleContext();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-zinc-600 text-sm">
            © {year} Gloriam Consulting. {t(locale, 'footer.allRights')}
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={`/${locale}/privacy-policy`} className="text-zinc-600 hover:text-zinc-900 text-sm">
              {t(locale, 'footer.privacyPolicy')}
            </Link>
            <Link href={`/${locale}/cookies`} className="text-zinc-600 hover:text-zinc-900 text-sm">
              {t(locale, 'footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 