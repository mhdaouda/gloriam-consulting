import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/config';

// Middleware pour gérer les redirections et l'internationalisation
export async function middleware(request: NextRequest) {
  // Créer le middleware next-intl
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
  });

  // Obtenir le chemin de la requête
  const pathname = request.nextUrl.pathname;

  // Si le chemin contient "gloriam-consulting", le retirer
  if (pathname.includes('gloriam-consulting')) {
    const newPathname = pathname.replace('/gloriam-consulting', '');
    const newUrl = new URL(newPathname, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Gérer les routes internationalisées
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
}; 