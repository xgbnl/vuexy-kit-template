// Next Imports
import { NextRequest, NextResponse } from 'next/server'

// NextAuth Imports
import { auth } from '@/app/api/auth/[...nextauth]/route'
import { Session } from 'next-auth'
import { getLocale } from '@utils/getLocale'

// Hooks Imports

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
    const locale: string = getLocale(pathname) ?? 'zh'

    return NextResponse.redirect(new URL(`/${locale}/login`, url))
  }

  return NextResponse.next()
}

export const config: { matcher: string[] } = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|zh/images|en/images).*)']
}
