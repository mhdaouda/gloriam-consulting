import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Navbar } from '../_components/Navbar';
import { Footer } from '../_components/Footer';

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

async function getMessages(locale: string) {
  try {
    return (await import(`../_translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
} 