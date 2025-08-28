/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Deprecated in Next.js 12.2, replaced by built-in SWC minification
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
