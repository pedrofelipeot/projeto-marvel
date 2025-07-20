/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    USE_MOCK: process.env.USE_MOCK,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.marvel.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
