import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/zh/crm',
        permanent: false
      },
      {
        source: '/:lang(en|zh)',
        destination: '/:lang/crm',
        permanent: false
      },
      {
        source: '/((?!(?:en|zh)\\b)):path',
        destination: '/en/:path',
        permanent: false
      }
    ]
  }
} as NextConfig

export default nextConfig
