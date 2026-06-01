import { ReactNode } from 'react';

type PageShellProps = {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};

/** Wrapper thème uniforme — fond transparent en dark, pas de dégradés blancs */
export function PageShell({ children, className = '', noPadding = false }: PageShellProps) {
  return (
    <div className={`theme-page dark-surface min-h-screen ${noPadding ? '' : 'py-24'} ${className}`}>
      <div className="container relative z-[1] mx-auto px-4">{children}</div>
    </div>
  );
}
