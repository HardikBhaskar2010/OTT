import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow images from your own CDN server
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sunadbroadcast.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL || '',
  },
};

export default withNextIntl(nextConfig);
