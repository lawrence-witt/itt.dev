/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "admin.itt.dev"],
  },
};

module.exports = nextConfig;
