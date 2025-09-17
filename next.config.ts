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
  transpilePackages: ['geist']
  
  // Uncomment below for standalone deployment (Docker only)
  // Note: This is NOT compatible with OpenNext Cloudflare
  // output: 'standalone'
};

export default nextConfig;

if (process.env.NODE_ENV === 'development') {
  try {
    const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
    initOpenNextCloudflareForDev();
  } catch (error) {
    console.log('OpenNext Cloudflare dev initialization skipped:', error instanceof Error ? error.message : 'Unknown error');
  }
}
