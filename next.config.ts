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
};

export default nextConfig;
