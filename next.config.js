/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Nécessaire pour la génération statique
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Utilise le basePath seulement en production
  trailingSlash: true, // Ajoute un slash à la fin des URLs
};

module.exports = nextConfig; 