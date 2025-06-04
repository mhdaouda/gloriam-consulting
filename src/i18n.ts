import {getRequestConfig} from 'next-intl/server';
import { defaultLocale } from './config';

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`./messages/${locale || defaultLocale}.json`)).default,
  locale: locale || defaultLocale
})); 