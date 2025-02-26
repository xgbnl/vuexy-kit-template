'use client'

// React Imports
import { ReactNode, useEffect, useState } from 'react'

// NextRouter Imports
import { useRouter, usePathname, useParams, } from 'next/navigation'

// Type Imports
import { ChildrenType } from '@core/types'
import { hasAccessToken } from '@utils/passport'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Locale } from '@configs/i18n'

export default function GuardMiddleware({ children }: ChildrenType): ReactNode {

  // States
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const router: AppRouterInstance = useRouter()

  const { lang } = useParams<{ lang: Locale }>()

  const pathname = usePathname()

  // Var
  const loggedPage = `/${lang}/login`

  useEffect(() => {

    if (hasAccessToken()) {
      setIsLoggedIn(true)
      if (pathname === loggedPage) {
        router.back()
      }
    } else {
      router.replace(loggedPage)
    }

  }, [router])

  return isLoggedIn ? (<>{children}</>) : null
}
