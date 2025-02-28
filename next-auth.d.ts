interface Passport {
  passport: string | null
}

declare module 'next-auth' {
  interface User extends Passport {}
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends Passport {
    avatar: string
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser extends Passport {}
}
