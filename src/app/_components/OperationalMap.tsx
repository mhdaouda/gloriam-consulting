'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from '@/app/_hooks/useTranslations';

function MapLoadingFallback() {
  const t = useTranslations('about');
  return (
    <div className="flex h-[min(52vh,520px)] w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
      {t('coverage.loading')}
    </div>
  );
}

const OperationalMapLeaflet = dynamic(() => import('./OperationalMapLeaflet'), {
  ssr: false,
  loading: () => <MapLoadingFallback />,
});

export default function OperationalMap() {
  return <OperationalMapLeaflet />;
}
