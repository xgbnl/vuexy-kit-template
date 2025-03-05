// AUTH Imports
import NextAuth, { type User } from 'next-auth'
import type { jWT } from 'next-auth/jwt'
import type { AdapterUser } from '@auth/core/adapters'

interface Passport {
  passport?: string | null
}

declare module 'next-auth' {
  interface User extends Passport { }
}

declare module 'next-auth/jwt' {
  interface JWT extends Passport {
    avatar: string
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser extends Passport { }
}