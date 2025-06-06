import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navigation from '@/app/_components/Navigation';
import CookieConsent from '@/app/_components/CookieConsent';
import { Inter } from 'next/font/google';
import { locales, Locale } from '@/config';
import { setRequestLocale } from 'next-intl/server';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className={inter.className}>
        <Navigation locale={locale} />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="bg-gray-800 py-8 text-white">
          <div className="container mx-auto px-4">
            <p className="text-center">
              © {new Date().getFullYear()} Gloriam Consulting. All rights reserved.
            </p>
          </div>
        </footer>
        <CookieConsent />
      </div>
    </NextIntlClientProvider>
  );
} 