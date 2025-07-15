// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // ✅ enable App Router
  },
  images: {
    domains: [], // add domains if you load remote images
  },
  // Optional: If you want to allow absolute imports like @/components
  webpack(config) {
    config.resolve.alias['@'] = require('path').resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
