import { useParams } from 'next/navigation';

export function useLocalePath() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';

  return (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };
} 