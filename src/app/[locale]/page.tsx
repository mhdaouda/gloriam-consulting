'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mb-8 text-xl sm:text-2xl">
            {t('subtitle')}
          </p>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            {t('description')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-3xl text-blue-600">💡</div>
              <h3 className="mb-3 text-xl font-semibold">Expertise</h3>
              <p className="text-gray-600">
                Des années d'expérience dans le conseil aux entreprises
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-3xl text-blue-600">🎯</div>
              <h3 className="mb-3 text-xl font-semibold">Solutions sur mesure</h3>
              <p className="text-gray-600">
                Des solutions adaptées à vos besoins spécifiques
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-3xl text-blue-600">🤝</div>
              <h3 className="mb-3 text-xl font-semibold">Accompagnement</h3>
              <p className="text-gray-600">
                Un suivi personnalisé tout au long de votre projet
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 