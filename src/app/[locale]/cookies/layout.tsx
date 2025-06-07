import { ReactNode } from 'react';

interface CookiesLayoutProps {
  children: ReactNode;
}

export default function CookiesLayout({ children }: CookiesLayoutProps) {
  return children;
}