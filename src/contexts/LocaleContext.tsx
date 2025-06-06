'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocale } from '../hooks/useLocale';
import { Locale } from '../i18n';

interface LocaleContextType {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  availableLocales: Locale[];
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const localeState = useLocale();

  return (
    <LocaleContext.Provider value={localeState}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
} 