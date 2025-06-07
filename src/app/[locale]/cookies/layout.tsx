export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 