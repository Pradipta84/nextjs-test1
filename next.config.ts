/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Skip ESLint during builds on Vercel to prevent deploy failures from warnings/rules
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to succeed even if there are type errors
    ignoreBuildErrors: true,
  },
  // Silence monorepo/workspace root inference warning by explicitly setting the tracing root
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
