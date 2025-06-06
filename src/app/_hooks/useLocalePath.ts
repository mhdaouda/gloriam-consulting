import { usePathname } from 'next/navigation';

export function useLocalePath() {
  const pathname = usePathname();

  const getLocalePath = (path: string, locale: string) => {
    // Si un chemin spécifique est fourni (même vide), l'utiliser directement avec le locale
    if (path !== undefined) {
      return `/${locale}/${path}`.replace(/\/+/g, '/');
    }

    // Sinon, extraire le chemin actuel sans le locale
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.length > 1 ? segments.slice(1).join('/') : '';
    
    // Construire le nouveau chemin avec le locale spécifié
    return `/${locale}/${pathWithoutLocale}`.replace(/\/+/g, '/');
  };

  const getOtherLocalePath = (currentLocale: string) => {
    const otherLocale = currentLocale === 'fr' ? 'en' : 'fr';
    const segments = pathname.split('/').filter(Boolean);
    const currentPath = segments.length > 1 ? segments.slice(1).join('/') : '';
    return `/${otherLocale}/${currentPath}`.replace(/\/+/g, '/');
  };

  return {
    getLocalePath,
    getOtherLocalePath
  };
} 