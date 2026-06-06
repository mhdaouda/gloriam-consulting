'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackGloriamPageView } from '@/app/_lib/gloriamApi';

export function GloriamAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackGloriamPageView();
  }, [pathname, searchParams]);

  return null;
}
