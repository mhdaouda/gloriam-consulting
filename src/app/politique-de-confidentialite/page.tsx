'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocaleContext } from '@/contexts/LocaleContext';

export default function PolitiqueDeConfidentialite() {
  const router = useRouter();
  const { changeLocale } = useLocaleContext();

  useEffect(() => {
    changeLocale('fr');
    router.push('/privacy-policy');
  }, [router, changeLocale]);

  return null;
} 