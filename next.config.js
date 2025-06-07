const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Nécessaire pour la génération statique
  images: {
    unoptimized: true,
  },
  basePath: '', // Pas de basePath car nous utilisons un domaine personnalisé
  assetPrefix: '', // Pas de prefix car nous utilisons un domaine personnalisé
  trailingSlash: true, // Ajoute un slash à la fin des URLs
};

module.exports = withNextIntl(nextConfig); 