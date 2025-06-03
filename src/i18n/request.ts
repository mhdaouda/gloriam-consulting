import {getRequestConfig} from 'next-intl/server';
import {locales} from '@/config';

export default getRequestConfig(async ({requestLocale}) => {
  // Ensure we have a valid locale from the ones we support
  const locale = typeof requestLocale === 'string' && locales.includes(requestLocale as any) 
    ? requestLocale 
    : 'fr';

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale
  };
}); 