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
    <footer className="theme-footer relative z-[1] border-t">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1">
            <p className="text-lg font-semibold tracking-tight text-theme">
              Gloriam{' '}
              <span className="font-light text-accent">Consulting</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href={`${base}/services`}
                  className="transition hover:text-accent"
                >
                  {t('navigation.services')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/about`}
                  className="transition hover:text-accent"
                >
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/projects`}
                  className="transition hover:text-accent"
                >
                  {t('navigation.projects')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/contact`}
                  className="transition hover:text-accent"
                >
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t('footer.legal')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href={`${base}/privacy-policy`}
                  className="transition hover:text-accent"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/cookies`}
                  className="transition hover:text-accent"
                >
                  {t('footer.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t('footer.ecosystem')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ecosystemLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t('footer.contactBlock')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:contact@gloriam-consulting.com"
                  className="transition hover:text-accent"
                >
                  contact@gloriam-consulting.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:daoudayinde@gmail.com"
                  className="transition hover:text-accent"
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
