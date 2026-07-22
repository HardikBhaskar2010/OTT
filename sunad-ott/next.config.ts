import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sunadbroadcast.com',
      },
      {
        protocol: 'https',
        hostname: '**.sunadtv.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL || '',
  },
};

export default nextConfig;
