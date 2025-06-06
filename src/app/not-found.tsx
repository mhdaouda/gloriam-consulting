'use client';

import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-4">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <p className="text-sm text-gray-500">
          Chemin demandé : {pathname}
        </p>
      </div>
    </div>
  );
} 