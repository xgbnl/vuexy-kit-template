// Next Imports
import { type NextRequest, NextResponse } from 'next/server'

// NextAuth Imports
import type { Session } from 'next-auth'

// Libs Imports
import { auth } from '@/libs/auth'

// Utils Imports
import { getLang } from './utils/getLang'

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
    return NextResponse.redirect(new URL(`/${getLang(pathname)}/login`, url))
  }

  return NextResponse.next()
}

export const config: { matcher: string[] } = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|zh/images|en/images).*)']
}
