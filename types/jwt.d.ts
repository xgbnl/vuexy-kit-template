// JWT Imports
// Type Imports
import type { Passport } from './types'

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends Passport {
    avatar: string
  }
}
