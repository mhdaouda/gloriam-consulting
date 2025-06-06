const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Configuration pour l'export statique
  images: {
    unoptimized: true,
  },
  basePath: '/gloriam-consulting', // Le nom de votre dépôt
  assetPrefix: '/gloriam-consulting/', // Le nom de votre dépôt avec un slash à la fin
  trailingSlash: true, // Ajoute un slash à la fin des URLs
};

module.exports = withNextIntl(nextConfig); 