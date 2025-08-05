import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  transpilePackages: ['geist'],
  output: 'standalone'
};

export default nextConfig;
