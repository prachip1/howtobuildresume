/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/how-to-build-resume',
        destination: '/how-to-write-resume',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
