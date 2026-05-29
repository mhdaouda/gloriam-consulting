import { Plus_Jakarta_Sans } from 'next/font/google';
import { Metadata } from 'next';
import GoogleAnalytics from '@/app/_components/GoogleAnalytics';
import { CookieConsent } from '@/app/_components/CookieConsent';
import { Providers } from '@/app/_components/Providers';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('gloriam-theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body className={`${plusJakarta.className} antialiased`}>
        <Providers>{children}</Providers>
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
