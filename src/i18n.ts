import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';
import type {LocalePrefix} from 'next-intl/dist/types/src/shared/types';
import {notFound} from 'next/navigation';

// Importation statique des messages
import fr from './messages/fr.json';
import en from './messages/en.json';

export const messages = {
  fr,
  en
};

export type Locale = keyof typeof messages;

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}

// Fonction utilitaire pour obtenir une traduction
export function t(locale: Locale, key: string, params: Record<string, string> = {}) {
  const messages = getMessages(locale);
  let translation = key.split('.').reduce((obj, k) => obj?.[k], messages as any);
  
  if (translation === undefined) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }

  if (Array.isArray(translation)) {
    return translation;
  }

  if (typeof translation === 'object') {
    return translation;
  }

  // Remplace les paramètres dans la traduction
  Object.entries(params).forEach(([key, value]) => {
    translation = translation.replace(new RegExp(`{${key}}`, 'g'), value);
  });

  return translation;
}

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale: locale as string // Type assertion to ensure locale is string
  };
}); 