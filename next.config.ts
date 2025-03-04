import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/zh/dashboard',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|zh)',
        destination: '/:lang/dashboard',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|zh|front-pages|favicon.ico)\\b)):path',
        destination: '/zh/:path',
        permanent: true,
        locale: false
      }
    ]
  }
} as NextConfig

export default nextConfig
