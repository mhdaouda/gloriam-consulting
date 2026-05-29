'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function TurboAmbient() {
  const { theme, mounted } = useTheme();
  const readyRef = useRef(false);

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;

    document.body.classList.add('is-loading');
    const t = window.setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    }, 100);

    return () => {
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme !== 'dark') {
      document.documentElement.classList.remove('has-spotlight');
      return;
    }

    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--spot-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--spot-y', `${(e.clientY / window.innerHeight) * 100}%`);
    };

    document.documentElement.classList.add('has-spotlight');
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.documentElement.classList.remove('has-spotlight');
      window.removeEventListener('mousemove', onMove);
    };
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="turbo-grain" aria-hidden />
      {theme === 'dark' && <div className="turbo-spotlight" aria-hidden />}
    </>
  );
}
