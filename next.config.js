const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: 'https://www.gloriam-consulting.com',
  async rewrites() {
    return [
      {
        source: '/logo.svg',
        destination: '/images/GClogo.svg'
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig); 