// eslint-disable-next-line import/named
// NextAuth Imports
import NextAuth, { type DefaultSession } from 'next-auth'

export interface Passport {
  passport: string
}

declare module 'next-auth' {

  interface Session {
    user: Passport & DefaultSession['user']
  }

  interface User extends Passport {}
}
