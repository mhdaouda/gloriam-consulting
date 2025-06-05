const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/gloriam-consulting',
  assetPrefix: 'https://www.gloriam-consulting.com'
};

module.exports = withNextIntl(nextConfig); 