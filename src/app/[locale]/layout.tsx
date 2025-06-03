import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navigation from '@/app/_components/Navigation';
import { Inter } from 'next/font/google';
import { locales } from '@/config';
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
  params: Promise<{ locale: string }>;
}) {
  // Await the params
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 