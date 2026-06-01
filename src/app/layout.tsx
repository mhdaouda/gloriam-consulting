import { Cormorant_Garamond, Plus_Jakarta_Sans, Rajdhani } from 'next/font/google';
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

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-label',
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
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html{background-color:#f8fafc;color:#1e293b}html.dark{background-color:#09090b;color:#f1f5f9}',
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var u=localStorage.getItem('gloriam-theme-user-set');var t=localStorage.getItem('gloriam-theme');var d=u==='true'&&t==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.setAttribute('data-theme',d?'dark':'light')}catch(e){document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light')}})();`,
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${cormorant.variable} ${rajdhani.variable} ${plusJakarta.className} antialiased`}
      >
        <Providers>{children}</Providers>
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
