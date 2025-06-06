import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import GoogleAnalytics from "./_components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "Gloriam Consulting | Cabinet de conseil en stratégie digitale",
    template: "%s | Gloriam Consulting"
  },
  description: "Cabinet de conseil spécialisé en stratégie et transformation digitale. Expertise en innovation, développement digital et accompagnement des entreprises.",
  keywords: ["conseil", "stratégie digitale", "transformation numérique", "innovation", "consulting", "digital", "entreprise", "technologie"],
  authors: [{ name: "Gloriam Consulting" }],
  creator: "Gloriam Consulting",
  publisher: "Gloriam Consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://gloriam-consulting.com'),
  openGraph: {
    title: 'Gloriam Consulting | Cabinet de conseil en stratégie digitale',
    description: 'Cabinet de conseil spécialisé en stratégie et transformation digitale. Expertise en innovation, développement digital et accompagnement des entreprises.',
    url: 'https://gloriam-consulting.com',
    siteName: 'Gloriam Consulting',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gloriam Consulting | Cabinet de conseil en stratégie digitale',
    description: 'Cabinet de conseil spécialisé en stratégie et transformation digitale',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'à_remplacer_par_votre_code_de_verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
