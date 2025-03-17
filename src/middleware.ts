// Next Imports
import { type NextRequest, NextResponse } from 'next/server'

// NextAuth Imports
import type { Session } from 'next-auth'

// Libs Imports
import { auth } from '@/libs/auth'

// Hooks Imports
import { getLocale } from '@utils/getLocale'
import type { Locale } from '@configs/i18n'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Hooks
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
    const locale: Locale = getLocale(pathname) ?? 'zh'

    return NextResponse.redirect(new URL(`/${locale}/login`, url))
  }

  return NextResponse.next()
}

export const config: { matcher: string[] } = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|zh/images|en/images).*)']
}
