'use client';

import { useEffect, useRef, useState } from 'react';
import { getTurnstileSiteKey, isTurnstileEnabled } from '@/app/_lib/formSpamGuard';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileFieldProps = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
};

export function TurnstileField({ onToken, onExpire, theme = 'auto' }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isTurnstileEnabled() || !containerRef.current) return;

    const siteKey = getTurnstileSiteKey();
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token) => {
          setFailed(false);
          onToken(token);
        },
        'expired-callback': () => {
          onExpire?.();
        },
        'error-callback': () => {
          setFailed(true);
          onExpire?.();
        },
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = renderWidget;
      script.onerror = () => setFailed(true);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [onToken, onExpire, theme]);

  if (!isTurnstileEnabled()) return null;

  return (
    <div className="space-y-2">
      <div ref={containerRef} className="min-h-[65px]" />
      {failed && (
        <p className="text-xs text-red-500">
          Vérification anti-spam indisponible. Réessayez dans un instant.
        </p>
      )}
    </div>
  );
}
