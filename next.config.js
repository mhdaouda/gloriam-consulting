/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Nécessaire pour la génération statique
  images: {
    unoptimized: true,
  },
  basePath: '/gloriam-consulting', // Le nom de votre dépôt
  assetPrefix: '/gloriam-consulting', // Le nom de votre dépôt sans slash à la fin
  trailingSlash: true, // Ajoute un slash à la fin des URLs
};

module.exports = nextConfig; 