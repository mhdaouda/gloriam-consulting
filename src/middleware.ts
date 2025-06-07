import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['fr', 'en'],
  
  // Used when no locale matches
  defaultLocale: 'fr',

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*']
}; 