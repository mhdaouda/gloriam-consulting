'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function TurboAmbient() {
  const { theme, mounted } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 30 });

  useEffect(() => {
    document.body.classList.add('is-loading');
    const t = window.setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      setLoaded(true);
    }, 80);
    return () => {
      window.clearTimeout(t);
      document.body.classList.remove('is-loading', 'is-loaded');
    };
  }, []);

  useEffect(() => {
    if (!mounted || theme !== 'dark') return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpot({ x, y });
      document.documentElement.style.setProperty('--spot-x', `${x}%`);
      document.documentElement.style.setProperty('--spot-y', `${y}%`);
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
      {theme === 'dark' && (
        <div
          className="turbo-spotlight"
          style={
            {
              '--spot-x': `${spot.x}%`,
              '--spot-y': `${spot.y}%`,
            } as React.CSSProperties
          }
          aria-hidden
        />
      )}
      {!loaded && <span className="sr-only" aria-live="polite" />}
    </>
  );
}
