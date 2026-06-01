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
        className="inline-flex h-9 w-16 items-center rounded-full border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-900"
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
      className={`relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border p-1 transition-all duration-300 ${
        isDark
          ? 'border-emerald-500/35 bg-slate-950 shadow-[inset_0_0_24px_rgba(16,185,129,0.15)]'
          : 'border-amber-200/90 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 shadow-sm'
      }`}
    >
      <FaSun
        className={`absolute left-2.5 h-3.5 w-3.5 transition-opacity ${
          isDark ? 'text-amber-500/40' : 'text-amber-500'
        }`}
        aria-hidden
      />
      <FaMoon
        className={`absolute right-2.5 h-3.5 w-3.5 transition-opacity ${
          isDark ? 'text-emerald-300' : 'text-slate-400/50'
        }`}
        aria-hidden
      />
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 520, damping: 32 }}
        className={`relative z-[1] flex h-7 w-7 items-center justify-center rounded-full shadow-md ${
          isDark
            ? 'ml-auto bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40'
            : 'bg-white text-amber-500 ring-1 ring-amber-200/80'
        }`}
      >
        {isDark ? <FaMoon className="h-3.5 w-3.5" /> : <FaSun className="h-3.5 w-3.5" />}
      </motion.span>
    </button>
  );
}
