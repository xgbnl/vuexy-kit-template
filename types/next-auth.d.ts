import NextAuth, { type DefaultSession, Session, User } from 'next-auth'
import { AdapterUser } from '@auth/core/adapters'

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }

  interface User {
    avatar: string
    name: string
    passport: string
  }

  interface AdapterUser  extends User{

  }
}
