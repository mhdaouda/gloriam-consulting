import { Inter } from 'next/font/google';
import { CookieConsent } from '@/app/_components/CookieConsent';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { Metadata } from 'next';
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
        </LocaleProvider>
      </body>
    </html>
  );
}
