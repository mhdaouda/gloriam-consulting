'use client';

import { LocaleProvider } from '@/contexts/LocaleContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Chatbot from '@/app/_components/Chatbot';

export default function FrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale="fr">
      <div className="relative z-[1] flex min-h-screen flex-col bg-slate-50 dark:bg-transparent">
        <div
          className="pointer-events-none fixed inset-0 z-0 hidden bg-grid-dark opacity-[0.35] dark:block"
          aria-hidden
        />
        <Navbar />
        <main className="relative z-[1] flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </div>
    </LocaleProvider>
  );
} 