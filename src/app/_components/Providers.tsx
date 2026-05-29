'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { TurboAmbient } from '@/app/_components/TurboAmbient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TurboAmbient />
      {children}
    </ThemeProvider>
  );
}
