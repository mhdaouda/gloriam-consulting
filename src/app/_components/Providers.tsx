'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TurboAmbient } from '@/app/_components/TurboAmbient';
import { SiteIntro } from '@/app/_components/SiteIntro';

export function Providers({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider>
      <SiteIntro onComplete={() => setIntroComplete(true)} />
      <TurboAmbient introComplete={introComplete} />
      {children}
    </ThemeProvider>
  );
}
