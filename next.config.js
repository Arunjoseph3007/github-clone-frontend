/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.externals = config.externals || {};
    config.externals.child_process = "child_process";
    return config;
  },
};

module.exports = nextConfig;
