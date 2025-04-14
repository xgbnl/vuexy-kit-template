// Next Imports
import { type NextRequest, NextResponse } from 'next/server'

// NextAuth Imports
import type { Session } from 'next-auth'

// Libs Imports
import { auth } from '@/libs/auth'

// Configs Imports
import { type Locale, i18n } from '@configs/i18n'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const {
    nextUrl: { pathname },
    url
  } = request

  const session: Session | null = await auth()
  const guest: boolean = !session?.user?.passport
  const isAuthPage: boolean = pathname.endsWith('/login')

  if (isAuthPage && !guest) {
    return NextResponse.redirect(new URL(`/`, url))
  }

  if (guest && !isAuthPage) {
    const locales = pathname.match(/^\/([a-z]{2})(\/|$)/)

    const locale = (locales?.at(1) ?? i18n.defaultLocale) as Locale

    return NextResponse.redirect(new URL(`/${locale}/login`, url))
  }

  return NextResponse.next()
}

export const config: { matcher: string[] } = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|zh/images|en/images).*)']
}
