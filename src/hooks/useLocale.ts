import { useState, useEffect } from 'react';
import { Locale, messages } from '../i18n';
import { defaultLocale } from '../config';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Récupère la langue depuis localStorage ou utilise la langue par défaut
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && messages[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    if (messages[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  };

  return {
    locale,
    changeLocale,
    availableLocales: Object.keys(messages) as Locale[],
  };
} 