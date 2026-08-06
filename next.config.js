/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React 19 Server Components
  reactStrictMode: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  
  // Output target for App Router
  output: 'standalone',
  
  // Experimental features for Next.js 15
  experimental: {
    // Enable appDir (App Router) - this is default in Next.js 15
    appDir: true,
  },
  
  // TypeScript configuration
  typescript: {
    // Don't fail on build for type errors (we'll run tsc separately)
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Don't fail on build for lint errors
    ignoreDuringBuilds: false,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;