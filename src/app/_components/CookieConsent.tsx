'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { locale } = useLocaleContext();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)] p-4 shadow-lg backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <p className="text-center text-sm text-theme-muted md:text-left">
              {t(locale, 'cookies.banner.description')}
            </p>
            <Link
              href={`/${locale}/cookies`}
              className="text-sm text-accent underline hover:opacity-80"
            >
              {t(locale, 'cookies.banner.learnMore')}
            </Link>
          </div>
          <button
            onClick={acceptCookies}
            className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:text-zinc-950"
          >
            {t(locale, 'cookies.banner.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
