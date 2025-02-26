'use client'

// React Imports
import { ReactNode, useEffect } from 'react'

// NextRouter Imports
import { useRouter, usePathname, useParams } from 'next/navigation'

// Type Imports
import { ChildrenType } from '@core/types'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { Locale } from '@configs/i18n'

// Utils Imports
import { hasAccessToken } from '@utils/passport'

export default function GuardMiddleware({ children }: ChildrenType): ReactNode {

  // States

  const router: AppRouterInstance = useRouter()

  const { lang } = useParams<{ lang: Locale }>()

  const pathname = usePathname()

  // Var
  const loggedPage = `/${lang}/login`

  useEffect(() => {

    if (hasAccessToken() && pathname === loggedPage) {
      router.back()
    } else {
      router.replace(loggedPage)
    }

  }, [router])

  return children
}
