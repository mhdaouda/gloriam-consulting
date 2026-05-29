import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px -12px rgba(16, 185, 129, 0.45)',
        'glow-teal': '0 0 50px -10px rgba(20, 184, 166, 0.4)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(16, 185, 129, 0.22), transparent)',
        'hero-radial-dark':
          'radial-gradient(ellipse 90% 70% at 50% -15%, rgba(16, 185, 129, 0.28), transparent 55%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(34, 211, 238, 0.12), transparent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 