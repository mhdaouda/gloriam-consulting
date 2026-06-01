'use client';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from '@/app/_hooks/useTranslations';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const t = useTranslations('theme');

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        aria-hidden
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('toggle')}
      title={isDark ? t('light') : t('dark')}
      className="theme-toggle"
    >
      {isDark ? <FaSun className="h-4 w-4" aria-hidden /> : <FaMoon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
