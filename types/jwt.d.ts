// JWT Imports
import type { JWT } from 'next-auth/jwt'

// Type Imports
import type {Passport} from './next-auth'

declare module 'next-auth/jwt' {

  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends Passport {
    avatar: string
  }
}
