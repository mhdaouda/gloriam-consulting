'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { locale } = useLocaleContext();
  const t = useTranslations('cookies');

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà accepté les cookies
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-4 shadow-lg z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="text-sm text-zinc-600 text-center md:text-left">
              {t('banner.description')}
            </p>
            <Link
              href={`/${locale}/cookies`}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {t('banner.learnMore')}
            </Link>
          </div>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors"
          >
            {t('banner.accept')}
          </button>
        </div>
      </div>
    </div>
  );
} 