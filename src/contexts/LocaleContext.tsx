'use client';

import { createContext, useContext } from 'react';
import { Locale } from '@/i18n';

type LocaleContextType = {
  locale: Locale;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'fr',
});

export function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
} 