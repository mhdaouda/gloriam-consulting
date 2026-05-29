'use client';

import Link from 'next/link';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { EXTERNAL_LINKS } from '@/app/_lib/externalLinks';

export function Footer() {
  const { locale } = useLocaleContext();
  const t = useTranslations();
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  const ecosystemLinks = [
    { href: EXTERNAL_LINKS.turbotech, label: t('footer.ecosystemLinks.turbotech') },
    { href: EXTERNAL_LINKS.flashcoder, label: t('footer.ecosystemLinks.flashcoder') },
    { href: EXTERNAL_LINKS.portfolio, label: t('footer.ecosystemLinks.portfolio') },
  ];

  return (
    <footer className="relative z-[1] border-t border-slate-200 bg-slate-100 text-slate-600 dark:border-white/[0.06] dark:bg-black dark:text-slate-400">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1">
            <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Gloriam{' '}
              <span className="font-light text-emerald-600 dark:text-emerald-300/90">
                Consulting
              </span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href={`${base}/services`}
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  {t('navigation.services')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/about`}
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/projects`}
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  {t('navigation.projects')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/contact`}
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
              {t('footer.legal')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href={`${base}/privacy-policy`}
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/cookies`}
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  {t('footer.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
              {t('footer.ecosystem')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ecosystemLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-emerald-700 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
              {t('footer.contactBlock')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:contact@gloriam-consulting.com"
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  contact@gloriam-consulting.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:daoudayinde@gmail.com"
                  className="transition hover:text-emerald-700 dark:hover:text-white"
                >
                  daoudayinde@gmail.com
                </a>
              </li>
              <li className="pt-1 text-slate-500 dark:text-slate-500">
                {t('footer.address')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs dark:border-white/10 sm:flex-row sm:text-sm">
          <p>
            © {year} Gloriam Consulting. {t('footer.allRights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
