import { Inter } from 'next/font/google';
import Navigation from '@/app/_components/Navigation';
import CookieConsent from '@/app/_components/CookieConsent';
import { LocaleProvider } from '@/contexts/LocaleContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gloriam Consulting',
  description: 'Cabinet de conseil en stratégie et management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LocaleProvider>
          <Navigation />
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
        </LocaleProvider>
      </body>
    </html>
  );
}
