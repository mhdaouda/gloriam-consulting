'use client';

import { LocaleProvider } from '@/contexts/LocaleContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale="en">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
} 