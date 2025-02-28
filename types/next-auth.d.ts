// NextAuth Imports
import { Passport } from './types'

declare module 'next-auth' {
  interface User extends Passport {}
}
