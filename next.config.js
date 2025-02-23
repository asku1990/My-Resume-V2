/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // When true: Allows production builds to complete even if there are ESLint errors
    // When false: Build will fail if there are ESLint errors
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'app', 'lib', 'utils']
  }
};

module.exports = nextConfig;
