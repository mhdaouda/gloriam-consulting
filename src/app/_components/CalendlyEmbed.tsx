'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { EXTERNAL_LINKS } from '@/app/_lib/externalLinks';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

function buildCalendlyUrl(isDark: boolean) {
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: '10b981',
    background_color: isDark ? '050508' : 'f8fafc',
    text_color: isDark ? 'e2e8f0' : '0f172a',
  });
  return `${EXTERNAL_LINKS.calendly}?${params.toString()}`;
}

function loadCalendlyScript() {
  if (window.Calendly) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://assets.calendly.com/assets/external/widget.js"]'
  );
  if (existing) {
    return new Promise<void>((resolve) => {
      if (window.Calendly) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
    });
  }

  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export function CalendlyEmbed() {
  const { theme, mounted } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let cancelled = false;

    loadCalendlyScript().then(() => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: buildCalendlyUrl(isDark),
        parentElement: containerRef.current,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [mounted, isDark]);

  return (
    <div
      ref={containerRef}
      className="calendly-embed min-h-[680px] w-full overflow-hidden rounded-xl"
    />
  );
}
