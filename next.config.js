/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  assetPrefix: './',
  images: {
    domains: [
      "api.autokueng.ch",
    ],
  },
}
