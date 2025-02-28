// NextAuth Imports
import { Passport } from './types'

declare module '@auth/core/adapters' {
  interface AdapterUser extends Passport {}
}
