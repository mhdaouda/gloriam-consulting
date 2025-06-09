'use client';

import { useLocaleContext } from '@/contexts/LocaleContext';
import enMessages from '../_translations/en.json';
import frMessages from '../_translations/fr.json';

type Messages = typeof enMessages;
type NestedKeyOf<T> = T extends object ? {
  [K in keyof T]: K extends string ? `${K}` | `${K}.${NestedKeyOf<T[K]>}` : never;
}[keyof T] : never;

type TranslationKey = NestedKeyOf<Messages>;

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function useTranslations(namespace?: string) {
  const { locale } = useLocaleContext();
  const messages = locale === 'en' ? enMessages : frMessages;

  const t = (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return getNestedValue(messages, fullKey) || key;
  };

  t.raw = (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return getNestedValue(messages, fullKey);
  };

  return t;
} 