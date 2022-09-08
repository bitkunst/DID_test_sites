/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
