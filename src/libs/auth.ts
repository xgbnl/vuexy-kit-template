// Third-party Imports
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Auth Imports.
import type { NextAuthConfig, User } from 'next-auth'
import { CredentialsSignin } from 'next-auth'
import NextAuth from 'next-auth'

// Utils Imports
import { getAppUrl } from '@/utils/getAppUrl'

// Libs Imports
import type { JsonResponse } from '@/libs/fetch'
import { HttpStatus } from '@/libs/fetch'

interface Model {
  name: string
  avatar: string
  passport: string
}

const nextConfig: NextAuthConfig = {
  debug: false,

  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    Credentials({
      credentials: {
        email: { label: '邮箱', type: 'text' },
        password: { label: '密码', type: 'password' }
      },
      authorize: async (
        credentials: Partial<Record<'email' | 'password' | 'redirect' | 'callbackUrl' | 'csrfToken', unknown>>
      ): Promise<User | null | never> => {
        const { email, password } = credentials

        let promise: Response

        try {
          promise = await fetch(getAppUrl(String(process.env.NEXT_PUBLIC_API_AUTH)), {
            body: JSON.stringify({ email, password }),
            mode: 'cors',
            cache: 'no-cache',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
        } catch (e) {
          const error = e instanceof TypeError ? e.message : (e as string)

          failed(`[${error}] Please check whether the server is running normally`)
        }

        if (promise.status !== 200 && !promise.ok) {
          failed('Unable to connect to server')
        }

        const response: JsonResponse<Model> = await promise.json()

        if (HttpStatus.includes(response.code)) {
          failed(response.msg, response.code)
        }

        return {
          name: response.data.name,
          image: response.data.avatar,
          passport: response.data.passport
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
    signIn: '/:lang/login'
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
        token.name = user.name
        token.avatar = user.image as string
        token.passport = user.passport
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.name = token.name
        session.user.image = token.avatar as string
        session.user.passport = token.passport as string
      }

      return session
    }
  }
}

class InvalidLoginError extends CredentialsSignin {
  code: string
  constructor(message: string) {
    super()
    this.code = message
  }
}

function failed(msg: string, code: number = 500): never {
  throw new InvalidLoginError(JSON.stringify({ code, msg }))
}

export const { auth, handlers } = NextAuth(nextConfig)
