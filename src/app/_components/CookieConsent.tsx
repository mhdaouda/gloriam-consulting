'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocalePath } from '../_hooks/useLocalePath';
import { useParams } from 'next/navigation';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations('cookies');
  const { getLocalePath } = useLocalePath();
  const { locale } = useParams();

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
              {t('description')}
            </p>
            <Link
              href={getLocalePath('cookies', locale as string)}
              className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors underline"
            >
              {t('title')}
            </Link>
          </div>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm whitespace-nowrap"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
} 