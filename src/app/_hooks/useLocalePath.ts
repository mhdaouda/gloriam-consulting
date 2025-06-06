import { usePathname } from 'next/navigation';

export function useLocalePath() {
  const pathname = usePathname();

  const getLocalePath = (path: string, locale: string) => {
    // Supprimer le locale actuel du chemin si présent
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    
    // Construire le nouveau chemin avec le locale spécifié
    return `/${locale}/${path || pathWithoutLocale}`.replace(/\/+/g, '/');
  };

  const getOtherLocalePath = (currentLocale: string) => {
    const otherLocale = currentLocale === 'fr' ? 'en' : 'fr';
    return getLocalePath('', otherLocale);
  };

  return {
    getLocalePath,
    getOtherLocalePath
  };
} 