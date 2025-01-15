/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        // Your turbo rules here
      },
    },
  },
}

module.exports = nextConfig
