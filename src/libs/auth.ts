// Third-party Imports
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Type Imports.
import { type NextAuthConfig } from 'next-auth'

export const nextConfig: NextAuthConfig = {
  debug: true,

  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    Credentials({
      credentials: {
        username: { label: '用户名', type: 'text' },
        password: { label: '密码', type: 'password' }
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as { username: string | null; password: string | null }

        // try {
        //   const response = await fetch('http://api.dto.test/api/oa/auth', {
        //     mode: 'cors',
        //     body: JSON.stringify({ email, password }),
        //     method: 'POST',
        //     cache: 'no-cache'
        //   })
        // }catch (error) {
        //   throw new Error('Unable to connect to PHP Server.')
        // }

        // if (!response.ok) {
        //   throw new Error('Server Error')
        // }
        //
        // const json = await response.json()
        // console.log(json)
        return {
          name: 'jack',
          avatar: 'https://avatar.jpg',
          passport: 'xxx'
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: ':lang/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.username = user.username
        token.avatar = user.avatar
        token.passport = user.passport
      }

      return token
    },
    async session({ session, token }) {
      console.log('token', token,session.user)
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.name = token.name
      }

      return session
    }
  }
}
