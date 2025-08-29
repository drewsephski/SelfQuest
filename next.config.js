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
  webpack: (config, { isServer }) => {
    // Only apply this for client-side bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // This will make 'fs' module resolve to an empty module on the client-side
      };
    }

    // Only externalize sharp on the server side
    if (isServer) {
      config.externals.push('sharp');
    }

    return config;
  },
}

module.exports = nextConfig
