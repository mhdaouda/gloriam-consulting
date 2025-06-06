/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Nécessaire pour la génération statique
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Ajoute un slash à la fin des URLs
};

module.exports = nextConfig; 