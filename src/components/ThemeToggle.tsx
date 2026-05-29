'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from '@/app/_hooks/useTranslations';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const t = useTranslations('theme');

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10"
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
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-500/15"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        {isDark ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}
