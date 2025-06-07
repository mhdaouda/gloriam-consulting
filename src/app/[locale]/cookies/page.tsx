import { useTranslations } from 'next-intl';

export default function CookiesPage() {
  const t = useTranslations('cookies');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <p className="text-lg mb-8">{t('description')}</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('intro.title')}</h2>
        <p className="text-gray-700">{t('intro.description')}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{t('types.title')}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">{t('types.necessary.title')}</h3>
            <p className="text-gray-700">{t('types.necessary.description')}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">{t('types.analytics.title')}</h3>
            <p className="text-gray-700">{t('types.analytics.description')}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">{t('types.preferences.title')}</h3>
            <p className="text-gray-700">{t('types.preferences.description')}</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('control.title')}</h2>
        <p className="text-gray-700 mb-6">{t('control.description')}</p>
        <div>
          <h3 className="text-xl font-medium mb-2">{t('control.browser.title')}</h3>
          <p className="text-gray-700">{t('control.browser.description')}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
        <p className="text-gray-700">{t('contact.description')}</p>
      </section>
    </div>
  );
} 