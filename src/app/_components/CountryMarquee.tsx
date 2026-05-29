'use client';

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
          <span
            key={`${label}-${i}`}
            className="shrink-0 rounded-full border border-emerald-200/80 bg-white/90 px-4 py-1.5 text-sm font-medium text-emerald-800 backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-50 dark:border-white/15 dark:bg-white/5 dark:text-emerald-100/90 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-500/10"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
