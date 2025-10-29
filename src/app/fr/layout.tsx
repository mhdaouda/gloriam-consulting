'use client';

import { LocaleProvider } from '@/contexts/LocaleContext';
import { Metadata } from 'next';
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
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </div>
    </LocaleProvider>
  );
} 