// Third-party Imports
import NextAuth, { type NextAuthConfig } from 'next-auth'

// Lib Imports
import { authOptions } from '@/libs/auth'

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

const {
  handlers: { GET, POST }
} = NextAuth(authOptions as NextAuthConfig)

export { GET, POST }
