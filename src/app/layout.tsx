import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import GoogleAnalytics from '@/app/_components/GoogleAnalytics';
import { CookieConsent } from '@/app/_components/CookieConsent';
import Chatbot from '@/app/_components/Chatbot';
import { LocaleProvider } from '@/contexts/LocaleContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gloriam Consulting',
  description: 'Votre partenaire en excellence commerciale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LocaleProvider locale="fr">
          {children}
          <CookieConsent />
          <GoogleAnalytics />
          <Chatbot locale="fr" />
        </LocaleProvider>
      </body>
    </html>
  );
}
