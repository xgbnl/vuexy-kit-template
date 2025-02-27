import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** Token */
    passport: string

    /** Auth User name*/
    username: string

    /** Auth User avatar*/
    avatar: string
  }
}
