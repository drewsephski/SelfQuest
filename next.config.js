/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'react-icons'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable modern bundling optimizations
  transpilePackages: [],
}

module.exports = nextConfig
