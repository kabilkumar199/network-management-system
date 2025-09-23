/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enforce ESLint during builds to catch issues early
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enforce TypeScript type checking during builds
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
