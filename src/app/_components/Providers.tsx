'use client';

import { Suspense, useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TurboAmbient } from '@/app/_components/TurboAmbient';
import { SiteIntro } from '@/app/_components/SiteIntro';
import { GloriamAnalytics } from '@/app/_components/GloriamAnalytics';

export function Providers({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider>
      <SiteIntro onComplete={() => setIntroComplete(true)} />
      <TurboAmbient introComplete={introComplete} />
      <Suspense fallback={null}>
        <GloriamAnalytics />
      </Suspense>
      {children}
    </ThemeProvider>
  );
}
