'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { HOME_COUNTRY_IDS } from '@/app/_lib/externalLinks';

export function CountryMarquee() {
  const tAbout = useTranslations('about');
  const labels = HOME_COUNTRY_IDS.map((id) =>
    tAbout(`coverage.countries.${id}`)
  );
  const row = [...labels, ...labels];

  return (
    <div className="relative mt-10 overflow-hidden mask-fade-x">
      <div className="animate-marquee flex w-max gap-3">
        {row.map((label, i) => (
          <motion.span
            key={`${label}-${i}`}
            whileHover={{ scale: 1.05, borderColor: 'rgba(16,185,129,0.5)' }}
            className="shrink-0 rounded-full border border-emerald-200/80 bg-white/90 px-4 py-1.5 text-sm font-medium text-emerald-800 backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-50 dark:turbo-pill"
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
