/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.thirdwebcdn.com',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}

module.exports = nextConfig
