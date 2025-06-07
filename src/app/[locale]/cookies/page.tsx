import { useTranslations } from 'next-intl';
import { FaCookie, FaShieldAlt, FaCog } from 'react-icons/fa';

export const metadata = {
  title: 'Cookies Policy - Gloriam Consulting',
  description: 'Our cookies policy explains how we use cookies and similar technologies on our website.'
};

export default function Cookies() {
  const t = useTranslations('cookies');

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24 relative cookies-page">
      <div className="container mx-auto px-4 relative">
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl text-zinc-800">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="space-y-16">
          <section className="space-y-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <FaCookie className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('intro.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t('intro.description')}
            </p>
          </section>

          <section className="space-y-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('types.title')}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 pl-16">
              <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('types.necessary.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.necessary.description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('types.analytics.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.analytics.description')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('types.preferences.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('types.preferences.description')}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaCog className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('control.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-16">
              <p className="text-zinc-600 leading-relaxed">
                {t('control.description')}
              </p>
              <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100">
                <h3 className="mb-4 text-lg font-semibold text-zinc-800">
                  {t('control.browser.title')}
                </h3>
                <p className="text-zinc-600">
                  {t('control.browser.description')}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800">
                {t('contact.title')}
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed pl-16">
              {t('contact.description')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 