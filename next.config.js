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
      {
        source: '/build-resume',
        destination: '/',
        permanent: true,
      },
      {
        source: '/build-a-resume',
        destination: '/',
        permanent: true,
      },
      {
        source: '/resume/edit',
        destination: '/editmyresume',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
