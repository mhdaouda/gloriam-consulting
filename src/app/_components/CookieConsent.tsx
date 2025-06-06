'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { locale } = useLocaleContext();

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà accepté les cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="text-sm text-zinc-600 text-center md:text-left">
              {t(locale, 'cookies.description')}
            </p>
            <Link
              href="/cookies"
              className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors underline"
            >
              {t(locale, 'cookies.title')}
            </Link>
          </div>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm whitespace-nowrap"
          >
            {t(locale, 'cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
} 