// @ts-ignore
import NextAuth from 'next-auth'

interface Passport {
  passport?: string | null
}

declare module 'next-auth' {
  interface User extends Passport {}
}

declare module 'next-auth/jwt' {
  interface JWT extends Passport {
    avatar: string
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser extends Passport {}
}
