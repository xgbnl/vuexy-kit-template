// Third-party Imports
import NextAuth from 'next-auth'

// Lib Imports
import { nextConfig } from '@/libs/auth'

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

export const {
  auth,
  handlers: { GET, POST }
} = NextAuth(nextConfig)
